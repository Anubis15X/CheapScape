/* Genera un PDF de una página con el itinerario completo, con la
   estética actual de CheapScape: fondo claro, terracota y teal (los
   mismos colores que los tokens de :root en css/styles.css), el logo
   real y títulos con serifa (como Fraunces en la web). Usa jsPDF
   (cargado por CDN en viaje.html); todo se genera en el navegador. */

(function () {
  const boton = document.getElementById("btn-descargar-pdf");
  if (!boton) return;

  // Copia en RGB de los tokens de :root (jsPDF no lee CSS).
  const TINTA = [43, 32, 25]; // --cs-ink
  const TINTA_SUAVE = [91, 74, 61]; // --cs-ink-soft
  const TINTA_TENUE = [138, 122, 106]; // --cs-ink-faint
  const TERRACOTA = [200, 83, 42]; // --cs-terracotta-700
  const TERRACOTA_CLARO = [240, 194, 166]; // --cs-terracotta-300
  const CREMA = [251, 242, 231]; // --cs-bg
  const CREMA_OSCURA = [243, 228, 207]; // --cs-bg-alt
  const TEAL = [29, 107, 104]; // --cs-teal
  const BLANCO = [255, 255, 255];

  const LOGO_URL = "imagenes/logo_cs.png";
  const LOGO_PROPORCION = 751 / 267; // ancho / alto del PNG

  const MARGEN = 16;

  function formatearFecha(iso) {
    if (!iso) return "";
    const partes = iso.split("-");
    if (partes.length !== 3) return iso;
    const fecha = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
    return fecha.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  }

  function euros(n) {
    return (Math.round(n * 100) / 100).toLocaleString("es-ES") + " €";
  }

  // Las fuentes básicas de jsPDF solo tienen los caracteres de Europa
  // occidental: letras como "ł", "č" o "ů" (Varsovia, Bratislava,
  // Praga...) saldrían como basura. Se cambian por su letra sin tilde.
  function limpiar(texto) {
    return String(texto)
      .replace(/→/g, "-")
      .replace(/ł/g, "l")
      .replace(/Ł/g, "L")
      .split("")
      .map(function (c) {
        if (c.charCodeAt(0) <= 255 || "€–—·‘’“”".indexOf(c) !== -1) return c;
        return c.normalize("NFD").replace(/[̀-ͯ]/g, "");
      })
      .join("");
  }

  // Carga el logo y lo pasa a JPEG sobre el fondo crema de la cabecera:
  // el PNG con transparencia hacía que el PDF pesara ~800 KB.
  function cargarLogo() {
    return new Promise(function (resolve) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(" + CREMA.join(",") + ")";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      };
      img.onerror = function () { resolve(null); };
      img.src = LOGO_URL;
    });
  }

  async function generarPdf() {
    const detalle = window.cheapscapeDetalleActual;
    if (!detalle || !window.jspdf) return;

    const logo = await cargarLogo();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const ancho = doc.internal.pageSize.getWidth();
    const alto = doc.internal.pageSize.getHeight();
    const anchoUtil = ancho - MARGEN * 2;

    function color(rgb, tipo) {
      if (tipo === "relleno") doc.setFillColor(rgb[0], rgb[1], rgb[2]);
      else if (tipo === "linea") doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
      else doc.setTextColor(rgb[0], rgb[1], rgb[2]);
    }

    function texto(t, x, y, opciones) {
      doc.text(limpiar(t), x, y, opciones);
    }

    function fuente(familia, estilo, tamano) {
      doc.setFont(familia, estilo);
      doc.setFontSize(tamano);
    }

    // ---------- Cabecera ----------
    color(CREMA, "relleno");
    doc.rect(0, 0, ancho, 38, "F");
    color(TERRACOTA, "relleno");
    doc.rect(0, 38, ancho, 1.6, "F");
    color(TEAL, "relleno");
    doc.rect(0, 39.6, ancho, 0.6, "F");

    if (logo) {
      const altoLogo = 17;
      doc.addImage(logo, "JPEG", MARGEN, 10.5, altoLogo * LOGO_PROPORCION, altoLogo);
    } else {
      fuente("times", "bold", 24);
      color(TINTA);
      texto("CheapScape", MARGEN, 23);
    }

    const hoy = new Date();
    const referencia =
      "CS-" + detalle.id.slice(0, 3).toUpperCase() + "-" +
      String(detalle.fechaSalida || "").replace(/-/g, "").slice(2) + "-" +
      (detalle.origen === "Barcelona" ? "BCN" : "MAD");

    fuente("helvetica", "bold", 8);
    color(TERRACOTA);
    texto("ITINERARIO DE ESCAPADA", ancho - MARGEN, 16, { align: "right", charSpace: 0.6 });
    fuente("helvetica", "normal", 8.5);
    color(TINTA_SUAVE);
    texto("Ref. " + referencia, ancho - MARGEN, 22, { align: "right" });
    texto("Emitido el " + hoy.toLocaleDateString("es-ES"), ancho - MARGEN, 27, { align: "right" });

    // ---------- Destino + precio total ----------
    let y = 56;
    fuente("helvetica", "bold", 8);
    color(TEAL);
    texto(
      (detalle.tipoTarjeta === "barato" ? "EL MÁS BARATO" : detalle.tipoTarjeta === "exotico" ? "EL MÁS EXÓTICO" : "EL MEJOR VALORADO") +
        "  ·  " + detalle.pais.toUpperCase(),
      MARGEN, y, { charSpace: 0.5 }
    );

    y += 11;
    fuente("times", "bold", 30);
    color(TINTA);
    texto(detalle.destino, MARGEN, y);

    y += 8;
    fuente("helvetica", "normal", 10);
    color(TINTA_SUAVE);
    texto(
      "Desde " + detalle.origen + "  ·  " + formatearFecha(detalle.fechaSalida) + " – " + formatearFecha(detalle.fechaLlegada),
      MARGEN, y
    );

    // Tarjeta del precio total, a la derecha.
    const tarjetaAncho = 58;
    const tarjetaX = ancho - MARGEN - tarjetaAncho;
    color(TERRACOTA, "relleno");
    doc.roundedRect(tarjetaX, 48, tarjetaAncho, 30, 3, 3, "F");
    fuente("helvetica", "bold", 7.5);
    color(TERRACOTA_CLARO);
    texto("TOTAL ESTIMADO", tarjetaX + tarjetaAncho / 2, 56, { align: "center", charSpace: 0.5 });
    fuente("times", "bold", 24);
    color(BLANCO);
    texto(euros(detalle.precioTotal), tarjetaX + tarjetaAncho / 2, 67, { align: "center" });
    fuente("helvetica", "normal", 7.5);
    color(TERRACOTA_CLARO);
    texto("por persona · " + detalle.noches + " noches", tarjetaX + tarjetaAncho / 2, 73, { align: "center" });

    // ---------- Itinerario (línea de tiempo) ----------
    y = 92;
    function tituloSeccion(titulo, x, anchoLinea) {
      fuente("times", "bold", 14);
      color(TINTA);
      texto(titulo, x, y);
      color(TERRACOTA, "relleno");
      doc.rect(x, y + 2, 12, 0.8, "F");
      color(CREMA_OSCURA, "linea");
      doc.setLineWidth(0.2);
      doc.line(x + 12, y + 2.4, x + anchoLinea, y + 2.4);
      y += 10;
    }

    tituloSeccion("Itinerario", MARGEN, anchoUtil);

    const t = detalle.transporte;
    const tr = detalle.traslado;
    const pasos = [
      {
        titulo: "Vuelo de ida  ·  " + formatearFecha(detalle.fechaSalida),
        lineas: [t.idaSalida + " - " + t.idaLlegada + "  ·  " + t.operador + "  ·  llega a " + t.aeropuerto],
      },
      {
        titulo: "Del aeropuerto a la ciudad",
        lineas: [
          tr.medio + " (" + tr.operador + ") hasta " + tr.llegaA +
            (tr.duracion ? "  ·  " + tr.duracion : "") +
            "  ·  " + (tr.precioIdaVuelta === 0 ? "gratis" : euros(tr.precioIdaVuelta) + " ida y vuelta"),
        ].concat(tr.web ? ["Billetes: " + tr.web.replace("https://", "")] : []),
      },
      {
        titulo: "Estancia  ·  " + detalle.hotel.nochesIncluidas + " noches",
        lineas: [detalle.hotel.nombre + " (" + detalle.hotel.direccion + ")"],
      },
      {
        titulo: "Vuelo de vuelta  ·  " + formatearFecha(detalle.fechaLlegada),
        lineas: [t.vueltaSalida + " - " + t.vueltaLlegada + "  ·  " + t.operador],
      },
    ];

    const xPunto = MARGEN + 3;
    const xTexto = MARGEN + 11;
    const yPuntos = [];
    pasos.forEach(function (paso) {
      yPuntos.push(y - 1.2);
      fuente("helvetica", "bold", 10);
      color(TINTA);
      texto(paso.titulo, xTexto, y);
      y += 5;
      fuente("helvetica", "normal", 9.5);
      color(TINTA_SUAVE);
      paso.lineas.forEach(function (l) {
        const partes = doc.splitTextToSize(limpiar(l), anchoUtil - 11);
        doc.text(partes, xTexto, y);
        y += partes.length * 4.6;
      });
      y += 4;
    });
    // Línea vertical que une los puntos y, encima, los puntos: terracota
    // en los vuelos (salida y llegada a casa) y teal en el resto.
    color(TERRACOTA_CLARO, "linea");
    doc.setLineWidth(0.6);
    doc.line(xPunto, yPuntos[0], xPunto, yPuntos[yPuntos.length - 1]);
    yPuntos.forEach(function (yp, i) {
      color(i === 0 || i === yPuntos.length - 1 ? TERRACOTA : TEAL, "relleno");
      doc.circle(xPunto, yp, 1.8, "F");
    });

    // Aviso del vuelo, si lo hay.
    if (t.aviso) {
      const lineasAviso = doc.splitTextToSize(limpiar("Atención: " + t.aviso), anchoUtil - 10);
      const altoAviso = lineasAviso.length * 4.6 + 6;
      color(CREMA, "relleno");
      doc.rect(MARGEN, y - 2, anchoUtil, altoAviso, "F");
      color(TERRACOTA, "relleno");
      doc.rect(MARGEN, y - 2, 1.2, altoAviso, "F");
      fuente("helvetica", "normal", 9.5);
      color(TINTA);
      doc.text(lineasAviso, MARGEN + 6, y + 3);
      y += altoAviso + 4;
    }

    // ---------- Dos tarjetas: alojamiento y desglose ----------
    y += 4;
    const anchoCol = (anchoUtil - 8) / 2;
    const xCol2 = MARGEN + anchoCol + 8;
    const yTarjetas = y;
    const altoTarjeta = 50;

    color(CREMA, "relleno");
    doc.roundedRect(MARGEN, yTarjetas, anchoCol, altoTarjeta, 3, 3, "F");
    doc.roundedRect(xCol2, yTarjetas, anchoCol, altoTarjeta, 3, 3, "F");

    // Alojamiento
    let yA = yTarjetas + 9;
    fuente("times", "bold", 13);
    color(TINTA);
    texto("Alojamiento", MARGEN + 6, yA);
    yA += 8;
    fuente("helvetica", "bold", 10.5);
    const nombre = doc.splitTextToSize(limpiar(detalle.hotel.nombre), anchoCol - 12);
    doc.text(nombre, MARGEN + 6, yA);
    yA += nombre.length * 5 + 1;
    fuente("helvetica", "normal", 9);
    color(TINTA_SUAVE);
    const tipoTxt =
      detalle.tipoAlojamiento === "compartido"
        ? "Cama en " + detalle.hotel.tipo + (detalle.hotel.personas ? " de " + detalle.hotel.personas + " personas" : " compartido")
        : detalle.hotel.tipo.charAt(0).toUpperCase() + detalle.hotel.tipo.slice(1);
    texto(tipoTxt, MARGEN + 6, yA);
    yA += 5;
    texto(detalle.hotel.direccion + ", " + detalle.destino, MARGEN + 6, yA);
    yA += 8;
    color(TEAL, "relleno");
    doc.roundedRect(MARGEN + 6, yA - 4.5, 30, 7, 3.5, 3.5, "F");
    fuente("helvetica", "bold", 8.5);
    color(BLANCO);
    texto("Nota " + detalle.nota.toFixed(1).replace(".", ",") + " / 10", MARGEN + 21, yA, { align: "center" });

    // Desglose del precio
    let yP = yTarjetas + 9;
    fuente("times", "bold", 13);
    color(TINTA);
    texto("Desglose por persona", xCol2 + 6, yP);
    yP += 9;
    const filas = [
      ["Vuelo ida y vuelta", detalle.precioTransporte],
      ["Traslado aeropuerto (i/v)", detalle.precioTraslado],
      ["Alojamiento (" + detalle.noches + " noches)", detalle.precioHotel],
    ];
    fuente("helvetica", "normal", 9.5);
    filas.forEach(function (f) {
      color(TINTA_SUAVE);
      texto(f[0], xCol2 + 6, yP);
      color(TINTA);
      texto(euros(f[1]), xCol2 + anchoCol - 6, yP, { align: "right" });
      yP += 6.5;
    });
    color(TERRACOTA_CLARO, "linea");
    doc.setLineWidth(0.4);
    doc.line(xCol2 + 6, yP - 2.5, xCol2 + anchoCol - 6, yP - 2.5);
    yP += 3.5;
    fuente("helvetica", "bold", 11);
    color(TINTA);
    texto("Total estimado", xCol2 + 6, yP);
    color(TERRACOTA);
    texto(euros(detalle.precioTotal), xCol2 + anchoCol - 6, yP, { align: "right" });

    y = yTarjetas + altoTarjeta + 12;

    // ---------- Dónde reservar (enlaces clicables) ----------
    tituloSeccion("Dónde reservar", MARGEN, anchoUtil);
    fuente("helvetica", "normal", 10);
    [
      ["Vuelo", "Buscar en Google Flights", detalle.enlaceAfiliadoTransporte],
      ["Alojamiento", "Buscar " + detalle.hotel.nombre + " en Booking", detalle.enlaceAfiliadoHotel],
    ].forEach(function (r) {
      color(TINTA_SUAVE);
      texto(r[0], MARGEN, y);
      color(TERRACOTA);
      doc.textWithLink(limpiar(r[1] + "  >"), MARGEN + 30, y, { url: r[2] });
      y += 6.5;
    });

    // ---------- Pie ----------
    fuente("helvetica", "normal", 7.5);
    color(TINTA_TENUE);
    const avisoLegal = doc.splitTextToSize(
      limpiar(
        "Estimación orientativa con precios de referencia revisados el " + fechaRevisionLegible() +
          ". No es una oferta ni una reserva: el precio final y la disponibilidad los pone cada proveedor. " +
          "Los enlaces de reserva pueden ser comerciales."
      ),
      anchoUtil
    );
    doc.text(avisoLegal, MARGEN, alto - 26);

    color(TINTA, "relleno");
    doc.rect(0, alto - 15, ancho, 15, "F");
    color(TERRACOTA, "relleno");
    doc.rect(0, alto - 15, ancho, 0.8, "F");
    fuente("times", "bold", 11);
    color(CREMA);
    texto("CheapScape", MARGEN, alto - 6.5);
    fuente("helvetica", "normal", 8);
    color(TERRACOTA_CLARO);
    texto("Escapa este finde sin arruinarte", MARGEN + 25, alto - 6.5);
    color(CREMA);
    texto("hola@cheapscape.com", ancho - MARGEN, alto - 6.5, { align: "right" });

    doc.save("cheapscape-" + limpiar(detalle.destino).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-") + ".pdf");
  }

  boton.addEventListener("click", generarPdf);
})();
