/* Puntero personalizado: un punto terracota sólido que sigue el ratón al
   instante + un anillo que le sigue con un poco de inercia (efecto
   "estela"). El anillo crece y brilla sobre elementos interactivos.
   Solo se activa con ratón/trackpad de precisión (pointer: fine) —
   en móvil/tablet se queda el comportamiento normal, sin tocar nada. */

(function () {
  const soportaPuntero = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!soportaPuntero) return;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let visible = false;

  window.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.transform = "translate(" + mouseX + "px," + mouseY + "px) translate(-50%, -50%)";
    if (!visible) {
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    }
  });

  document.addEventListener("mouseleave", function () {
    visible = false;
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });

  // El anillo persigue al punto con un poco de retraso (lerp), lo que
  // da la sensación de "estela" al mover el ratón rápido. Con 0.18 se
  // notaba "clavado"/atrasado tras un movimiento rápido; con 0.3
  // sigue habiendo estela pero el anillo llega antes.
  function animar() {
    ringX += (mouseX - ringX) * 0.3;
    ringY += (mouseY - ringY) * 0.3;
    ring.style.transform = "translate(" + ringX + "px," + ringY + "px) translate(-50%, -50%)";
    requestAnimationFrame(animar);
  }
  requestAnimationFrame(animar);

  // Seguro adicional: si en algún momento se detecta un toque real
  // (tablet/híbrido donde el navegador diga erróneamente que hay
  // puntero fino), se apaga el puntero personalizado por completo y
  // se devuelve el cursor normal.
  window.addEventListener(
    "touchstart",
    function () {
      dot.remove();
      ring.remove();
      document.body.classList.remove("cursor-hover", "cursor-click");
      document.body.classList.add("cursor-touch-override");
    },
    { once: true, passive: true }
  );

  // Elementos sobre los que el anillo crece y brilla más.
  const selectorInteractivo =
    "a, button, select, input, .trip-card, .step-card, .benefit-card, .filter-btn";

  document.addEventListener("mouseover", function (event) {
    if (event.target.closest(selectorInteractivo)) {
      document.body.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", function (event) {
    if (event.target.closest(selectorInteractivo)) {
      document.body.classList.remove("cursor-hover");
    }
  });

  // Al hacer clic, un pequeño "pulso" de feedback.
  document.addEventListener("mousedown", function () {
    document.body.classList.add("cursor-click");
  });
  document.addEventListener("mouseup", function () {
    document.body.classList.remove("cursor-click");
  });
})();
