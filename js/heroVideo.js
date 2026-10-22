/* Fondo del hero de la portada: vídeos de dron de varias ciudades
   que se van alternando en orden aleatorio. En móvil, con "ahorro de
   datos" o si el usuario pidió menos animaciones, se pone solo una
   foto fija (el primer fotograma de un vídeo al azar).
   Vídeos de Pexels (licencia libre); los autores salen en el rótulo. */

const VIDEOS_HERO = [
  { id: "bratislava", ciudad: "Bratislava", autor: "Austria by Öffis" },
  { id: "praga", ciudad: "Praga", autor: "Airam Dato-on" },
  { id: "budapest", ciudad: "Budapest", autor: "K" },
  { id: "roma", ciudad: "Roma", autor: "Alberto Escalona" },
  { id: "paris", ciudad: "París", autor: "Florian Delée" },
];

(function () {
  const video = document.getElementById("hero-video");
  const credito = document.getElementById("hero-credito");
  if (!video) return;

  // Orden aleatorio (Fisher-Yates) para que cada visita empiece por
  // una ciudad distinta.
  const orden = VIDEOS_HERO.slice();
  for (let i = orden.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [orden[i], orden[j]] = [orden[j], orden[i]];
  }

  const conexion = navigator.connection || {};
  const soloFoto =
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    conexion.saveData === true;

  let actual = 0;

  function poner(indice) {
    const v = orden[indice];
    video.poster = "videos/" + v.id + ".jpg";
    credito.textContent = t(v.ciudad) + " · " + t("Vídeo") + ": " + v.autor + " / Pexels";
    if (soloFoto) return;
    video.src = "videos/" + v.id + ".mp4";
    video.play().catch(function () {
      // Si el navegador no deja reproducir, se queda la foto fija.
    });
  }

  // Al acabar un vídeo (10 s) pasa a la siguiente ciudad.
  video.addEventListener("ended", function () {
    actual = (actual + 1) % orden.length;
    poner(actual);
  });

  poner(actual);
})();
