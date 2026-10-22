/* =========================================================
   CheapScape — tabla de destinos y precios (parte PÚBLICA)
   =========================================================
   Los 15 destinos del MVP con los precios buscados a mano para el finde
   del 13 al 15 de noviembre de 2026 (2 noches, 1 adulto), en euros y
   por persona. Fuente: Google Flights, Booking.com y webs oficiales de
   transporte, consultadas el 22/10/2026.

   Aquí solo está lo necesario para calcular el Top 3 (precios, notas,
   si el vuelo es directo...), que cualquiera puede ver. Lo que se
   desbloquea al registrarse (nombre del alojamiento, horarios,
   aerolínea, cómo ir del aeropuerto...) está en Supabase, en la tabla
   protegida "detalles_destino" (ver supabase/detalles_destino.sql).
   Si cambias un destino aquí, cambia también su fila allí.

   Cada destino tiene:
   - categoria: grupo en Top Chollos ("baratos", "calidad", "exoticos").
   - exotico: true si cuenta para la tarjeta "El más exótico".
   - vuelos.Madrid / vuelos.Barcelona: el ida y vuelta más barato.
       precio      ida y vuelta, en € (tarifa básica, sin maleta)
       directo     true solo si ida Y vuelta son directos
       aeropuerto  dónde aterriza (puede no ser la propia ciudad)
   - alojamiento.privado / alojamiento.compartido:
       precio2Noches  total de las 2 noches, en €
       nota           nota de los clientes en Booking, sobre 10
   - traslados: uno por aeropuerto, del aeropuerto al centro y vuelta.
       precioIdaVuelta en €

   Precio total de un viaje =
     vuelo + traslado de su aeropuerto + alojamiento (2 noches).

   null = no hay dato; ese destino no puede entrar en el Top 3 desde
   ese origen. */

const FECHA_REVISION_PRECIOS = "2026-10-22";

const DESTINOS = [  // ---------- Baratos ----------
  {
    id: "budapest", destino: "Budapest", pais: "Hungría", categoria: "baratos", exotico: false,
    vuelos: {
      Madrid: { precio: 134, directo: false, aeropuerto: "BUD" },
      Barcelona: { precio: 121, directo: false, aeropuerto: "BUD" },
    },
    alojamiento: { privado: { precio2Noches: 74, nota: 7.5 }, compartido: { precio2Noches: 28, nota: 7 } },
    traslados: { BUD: { precioIdaVuelta: 4.64 } },
  },
  {
    id: "praga", destino: "Praga", pais: "Chequia", categoria: "baratos", exotico: false,
    vuelos: {
      Madrid: { precio: 189, directo: false, aeropuerto: "PRG" },
      Barcelona: { precio: 154, directo: true, aeropuerto: "PRG" },
    },
    alojamiento: { privado: { precio2Noches: 67, nota: 7.4 }, compartido: { precio2Noches: 24, nota: 8 } },
    traslados: { PRG: { precioIdaVuelta: 3.79 } },
  },
  {
    id: "varsovia", destino: "Varsovia", pais: "Polonia", categoria: "baratos", exotico: false,
    vuelos: {
      Madrid: { precio: 187, directo: false, aeropuerto: "WAW" },
      Barcelona: { precio: 163, directo: false, aeropuerto: "WAW" },
    },
    alojamiento: { privado: { precio2Noches: 21, nota: 7 }, compartido: { precio2Noches: 21, nota: 7.5 } },
    traslados: { WAW: { precioIdaVuelta: 2.01 } },
  },
  {
    id: "atenas", destino: "Atenas", pais: "Grecia", categoria: "baratos", exotico: false,
    vuelos: {
      Madrid: { precio: 109, directo: false, aeropuerto: "ATH" },
      Barcelona: { precio: 157, directo: true, aeropuerto: "ATH" },
    },
    alojamiento: { privado: { precio2Noches: 49, nota: 7 }, compartido: { precio2Noches: 28, nota: 7.1 } },
    traslados: { ATH: { precioIdaVuelta: 11 } },
  },
  {
    id: "bratislava", destino: "Bratislava", pais: "Eslovaquia", categoria: "baratos", exotico: false,
    vuelos: {
      Madrid: { precio: 122, directo: false, aeropuerto: "VIE" },
      Barcelona: { precio: 50, directo: true, aeropuerto: "BTS" },
    },
    alojamiento: { privado: { precio2Noches: 70, nota: 7.7 }, compartido: { precio2Noches: 38, nota: 7.3 } },
    traslados: { BTS: { precioIdaVuelta: 2.18 }, VIE: { precioIdaVuelta: 14.98 } },
  },

  // ---------- Calidad (clásicos) ----------
  {
    id: "roma", destino: "Roma", pais: "Italia", categoria: "calidad", exotico: false,
    vuelos: {
      Madrid: { precio: 96, directo: false, aeropuerto: "FCO" },
      Barcelona: { precio: 83, directo: true, aeropuerto: "FCO" },
    },
    alojamiento: { privado: { precio2Noches: 90, nota: 7.3 }, compartido: { precio2Noches: 54, nota: 7.6 } },
    traslados: { FCO: { precioIdaVuelta: 8 } },
  },
  {
    id: "paris", destino: "París", pais: "Francia", categoria: "calidad", exotico: false,
    vuelos: {
      Madrid: { precio: 121, directo: true, aeropuerto: "ORY" },
      Barcelona: { precio: 105, directo: true, aeropuerto: "ORY" },
    },
    alojamiento: { privado: { precio2Noches: 138, nota: 7.3 }, compartido: { precio2Noches: 72, nota: 7.3 } },
    traslados: { ORY: { precioIdaVuelta: 28 } },
  },
  {
    id: "amsterdam", destino: "Ámsterdam", pais: "Países Bajos", categoria: "calidad", exotico: false,
    vuelos: {
      Madrid: { precio: 193, directo: true, aeropuerto: "AMS" },
      Barcelona: { precio: 160, directo: true, aeropuerto: "AMS" },
    },
    alojamiento: { privado: { precio2Noches: 130, nota: 8.3 }, compartido: { precio2Noches: 80, nota: 8 } },
    traslados: { AMS: { precioIdaVuelta: 11 } },
  },
  {
    id: "berlin", destino: "Berlín", pais: "Alemania", categoria: "calidad", exotico: false,
    vuelos: {
      Madrid: { precio: 150, directo: false, aeropuerto: "BER" },
      Barcelona: { precio: 170, directo: true, aeropuerto: "BER" },
    },
    alojamiento: { privado: { precio2Noches: 79, nota: 7.9 }, compartido: { precio2Noches: 36, nota: 8.4 } },
    traslados: { BER: { precioIdaVuelta: 10 } },
  },
  {
    id: "viena", destino: "Viena", pais: "Austria", categoria: "calidad", exotico: false,
    vuelos: {
      Madrid: { precio: 122, directo: false, aeropuerto: "VIE" },
      Barcelona: { precio: 140, directo: false, aeropuerto: "VIE" },
    },
    alojamiento: { privado: { precio2Noches: 74, nota: 7 }, compartido: { precio2Noches: 36, nota: 8 } },
    traslados: { VIE: { precioIdaVuelta: 11 } },
  },

  // ---------- Exóticos ----------
  {
    id: "skopie", destino: "Skopie", pais: "Macedonia del Norte", categoria: "exoticos", exotico: true,
    vuelos: {
      Madrid: { precio: 213, directo: false, aeropuerto: "SKP" },
      Barcelona: { precio: 152, directo: false, aeropuerto: "SKP" },
    },
    alojamiento: { privado: { precio2Noches: 31, nota: 9.5 }, compartido: { precio2Noches: 14, nota: 7.8 } },
    traslados: { SKP: { precioIdaVuelta: 6.46 } },
  },
  {
    id: "belgrado", destino: "Belgrado", pais: "Serbia", categoria: "exoticos", exotico: true,
    vuelos: {
      Madrid: { precio: 186, directo: false, aeropuerto: "BEG" },
      Barcelona: { precio: 106, directo: false, aeropuerto: "BEG" },
    },
    alojamiento: { privado: { precio2Noches: 47, nota: 9.3 }, compartido: { precio2Noches: 24, nota: 7.1 } },
    traslados: { BEG: { precioIdaVuelta: 0 } },
  },
  {
    id: "reikiavik", destino: "Reikiavik", pais: "Islandia", categoria: "exoticos", exotico: true,
    vuelos: {
      Madrid: { precio: 313, directo: false, aeropuerto: "KEF" },
      Barcelona: { precio: 342, directo: false, aeropuerto: "KEF" },
    },
    alojamiento: { privado: { precio2Noches: 153, nota: 7.5 }, compartido: { precio2Noches: 64, nota: 8.1 } },
    traslados: { KEF: { precioIdaVuelta: 35.24 } },
  },
  {
    id: "oslo", destino: "Oslo", pais: "Noruega", categoria: "exoticos", exotico: true,
    vuelos: {
      Madrid: { precio: 125, directo: false, aeropuerto: "TRF" },
      Barcelona: { precio: 132, directo: false, aeropuerto: "TRF" },
    },
    alojamiento: { privado: { precio2Noches: 139, nota: 8.5 }, compartido: { precio2Noches: 133, nota: 8.6 } },
    traslados: { TRF: { precioIdaVuelta: 27.48 } },
  },
  {
    id: "zurich", destino: "Zúrich", pais: "Suiza", categoria: "exoticos", exotico: true,
    vuelos: {
      Madrid: { precio: 150, directo: true, aeropuerto: "ZRH" },
      Barcelona: { precio: 100, directo: true, aeropuerto: "ZRH" },
    },
    alojamiento: { privado: { precio2Noches: 209, nota: 7.5 }, compartido: { precio2Noches: 106, nota: 8.2 } },
    traslados: { ZRH: { precioIdaVuelta: 15.64 } },
  },
];
