# CheapScape

> Este README es a la vez la hoja de ruta del proyecto y el **contexto
> completo para Claude Code**. Si eres Claude Code leyendo esto: lee el
> documento entero antes de tocar nada.

---

## 1. Qué es CheapScape

Web de **viajes** que responde a una pregunta: **"¿a qué ciudad puedo
viajar con el dinero que tengo?"**

**No es solo para fines de semana** (aclarado por Jose el 22-oct-2026):
el usuario elige las fechas y puede viajar un finde, una semana o lo
que quiera. El precio se calcula con las noches que haya entre sus
fechas.

El usuario (joven viajero con presupuesto ajustado; la idea nació de la
experiencia Erasmus de Jose) indica **origen, fechas y presupuesto
máximo**, y la web le propone un **Top 3** de viajes (transporte +
alojamiento) con el **precio total estimado**:

1. **El más barato**
2. **El mejor valorado** (más estrellas dentro del presupuesto)
3. **El más exótico** (destino menos típico)

Para ver el **hotel exacto, los horarios y el enlace de reserva** hay
que **crear una cuenta gratuita** (el "regwall": es la captación de
usuarios). Se monetiza **solo por afiliación** (enlaces de reserva a
proveedores), y eso queda para el final.

**Público:** 18-28 años, estudiantes o primer empleo, salen de Madrid
o Barcelona, viajes de unos días a una semana, presupuesto ajustado
por persona.

**Flujo principal:**
buscador (origen, fechas, presupuesto) → Top 3 → "Ver detalles" →
regwall (registro) → detalle (horarios, hotel, desglose) → clic de
salida al proveedor.

**Honestidad obligatoria:** los precios son estimaciones orientativas,
no ofertas. Debe verse siempre un rótulo tipo *"estimación orientativa,
precios revisados el dd/mm, no es una oferta"* y un aviso de enlaces
comerciales. Nada de precios aleatorios que parezcan reales.

---

## 2. Contexto y decisión de rehacer

- Jose es estudiante de ASIR (perfil de sistemas/Linux); esto es su
  proyecto de bootcamp de "vibe coding" con IA. Se espera que **entienda
  y sepa explicar** lo que se construye (el profesor preguntó
  expresamente si sabría explicar el algoritmo del Top 3).
- Se construyó una primera versión completa (frontend + backend
  Node/Express + Postgres en Docker en una VM). El profesor evaluó una
  versión anterior (maquetas) y su feedback, junto con la conclusión de
  que el proyecto era **demasiado ambicioso**, llevó a la decisión:
  **empezar de nuevo conservando solo el frontend**, y avanzar poco a
  poco.
- Lo anterior (backend, base de datos, Docker, nginx, VM, scripts) **no
  se borra**: está en *stand by* en el repositorio de GitHub (ahora
  privado) por si hace falta consultarlo. **No se reutiliza por
  defecto.**

---

## 3. Qué hay en esta carpeta: el frontend

HTML + CSS + JS plano, **sin build, sin framework, sin dependencias**.
Se abre con cualquier servidor estático.

```
cheapscape/
├── index.html            Landing + buscador
├── resultados.html       Top 3 + modal de registro (regwall)
├── viaje.html            Detalle del viaje (requiere sesión)
├── login.html            Inicio de sesión / registro
├── usuario.html          Perfil básico
├── admin.html            Panel admin (usuarios, métricas)
├── top-chollos.html      Escaparate de chollos
├── como-funciona.html, quien-somos.html
├── aviso-legal.html, privacidad.html, cookies.html, terminos.html
├── css/styles.css        Todo el estilo (tokens en :root)
├── css/fonts.css         Tipografías (archivos en fonts/)
├── js/                   Un archivo por página + utilidades
├── imagenes/             Logo, favicons, iconos SVG
├── imagenes/destinos/    Una foto por destino (<id>.jpg, 900 px)
└── videos/               Vídeos de dron del hero (10 s, sin sonido) + foto fija
```

**Fotos y vídeos:** todas de Unsplash/Pexels, con licencia libre
que permite uso comercial sin pedir permiso. Créditos:

| Foto | Autor | Fuente |
|---|---|---|
| Ámsterdam (canal) | Adrien Olichon | [Unsplash](https://unsplash.com/photos/boats-on-canal-in-amsterdam-QRtym77B6xk) |
| Atenas (Acrópolis) | Constantinos Kollias | [Unsplash](https://unsplash.com/photos/yqBvJJ8jGBQ) |
| Belgrado (Kalemegdan) | Dimitrije Milenkovic | [Unsplash](https://unsplash.com/photos/an-aerial-view-of-a-city-with-a-castle-XP1ozWBIPb8) |
| Berlín (Puerta de Brandeburgo) | Håkon Sataøen | [Unsplash](https://unsplash.com/photos/brandenburg-gate-germany-Oog0wehKxYs) |
| Bratislava (castillo) | Alexandre | [Unsplash](https://unsplash.com/photos/white-and-brown-concrete-building-4Ss7iUixbCY) |
| Budapest (Parlamento) | Ervin Lukacs | [Unsplash](https://unsplash.com/photos/hungarian-parliament-building-in-budapest-sMyQb3i9bNA) |
| Oslo (Ópera) | Vidar Nordli-Mathisen | [Unsplash](https://unsplash.com/photos/q-fr4QsIyic) |
| París (Torre Eiffel) | Chris Karidis | [Unsplash](https://unsplash.com/photos/eiffel-tower-paris-france-nnzkZNYWHaU) |
| Praga (Puente de Carlos) | William Zhang | [Unsplash](https://unsplash.com/photos/charles-bridge-and-prague-castle-6En4WYsNYXM) |
| Reikiavik (Hallgrímskirkja) | Einar H. Reynis | [Unsplash](https://unsplash.com/photos/an-aerial-view-of-a-city-with-mountains-in-the-background-KbF5K6yDfH4) |
| Roma (Coliseo) | Matteo del Piano | [Unsplash](https://unsplash.com/photos/colosseum-in-rome-at-golden-hour-7Y015gklIDg) |
| Skopie (río Vardar) | Ondrej Bocek | [Unsplash](https://unsplash.com/photos/monument-and-museum-buildings-by-the-river-YGWh4U0fppA) |
| Varsovia (Plaza del Castillo) | Lāsma Artmane | [Unsplash](https://unsplash.com/photos/p6gxHYb43v0) |
| Viena (Karlskirche) | Leonhard Niederwimmer | [Unsplash](https://unsplash.com/photos/wIOTq3jCJEQ) |
| Zúrich (río Limmat) | Ruth Georgiev | [Unsplash](https://unsplash.com/photos/body-of-water-between-buildings-under-blue-sky-during-daytime-6yqd3PYJ4oI) |

| Vídeo del hero | Autor | Fuente |
|---|---|---|
| Bratislava | Austria by Öffis | [Pexels](https://www.pexels.com/video/aerial-view-of-bratislava-cityscape-and-river-33398503/) |
| Praga | Airam Dato-on | [Pexels](https://www.pexels.com/video/aerial-view-of-prague-cityscape-with-river-34918718/) |
| Budapest | K | [Pexels](https://www.pexels.com/video/aerial-view-of-budapest-parliament-on-danube-river-34431115/) |
| Roma | Alberto Escalona | [Pexels](https://www.pexels.com/video/aerial-view-of-ancient-rome-s-tiber-river-35480582/) |
| París | Florian Delée | [Pexels](https://www.pexels.com/video/aerial-view-of-paris-with-eiffel-tower-and-seine-36492322/) |

El hero de la portada pone los vídeos en orden aleatorio
(`js/heroVideo.js`). En móvil, con ahorro de datos o con "reducir
animaciones" solo se ve la foto fija, para no gastar datos.

**Diseño:** tema claro cálido. Tokens CSS en `:root` de
`css/styles.css`: terracota `#C8532A` (acento principal), teal
`#1D6B68`, crema `#FBF2E7` (fondo), tinta `#2B2019` (texto). Tipografías
Fraunces (títulos) e Inter (cuerpo), servidas desde la carpeta
`fonts/` (`css/fonts.css`), no desde Google Fonts. Componentes:
`.glass` (tarjeta clara), `.glass-dark` (chip oscuro sobre fotos).
Logo y favicon definitivos ya integrados en las 13 páginas. Responsive
(móvil y escritorio).

### 3.1 Estado: el Top 3 ya funciona sin backend (22-oct-2026)

El buscador, el Top 3 y el detalle ya funcionan **en el navegador**, sin
servidor:

- Precios de los 15 destinos (vuelo, traslado aeropuerto-ciudad,
  alojamiento privado y compartido): están en la tabla `destinos` de
  Supabase y se editan desde el panel admin. `js/destinos.js` tiene la
  misma tabla como respaldo: si Supabase no responde, se usa esa.
- `js/motor.js`: calcula el Top 3 y el detalle con esa tabla
  (`cargarDestinos()` la pide a Supabase una vez por página).
- `js/viajes.js`: mantiene las funciones `buscarTop3()` y
  `obtenerDetalleViaje()` que usan las páginas; ahora llaman al motor
  en vez de hacer `fetch`. El día que haya backend, solo cambia este
  archivo.

### 3.2 Backend: Supabase (decidido el 22-oct-2026)

Proyecto Supabase "cheapscape" (región West EU, Irlanda), plan gratis.

- **Cuentas:** Supabase Auth con email + contraseña (`js/auth.js`). Si
  el email no existe, se crea la cuenta. Hay que marcar la casilla de
  privacidad. "Confirm email" está **desactivado** mientras se prueba
  (el correo gratis de Supabase solo manda unos pocos emails por hora);
  antes de lanzar hay que configurar un SMTP propio y reactivarlo.
- **Login con Google** (22-oct-2026): proyecto de Google Cloud
  `cheapscape-512410` (cuenta personal de Jose), app OAuth en modo
  *Prueba* (solo entran los usuarios de prueba). El ID y el secreto
  están solo en Supabase. Google vuelve a Supabase, y Supabase a
  `login.html`, que lleva al detalle del viaje o a "Mi cuenta". Antes
  de lanzar: añadir el dominio real en Google y en Supabase y publicar
  la app en Google.
- **Regwall comprobado en el servidor:** lo que se desbloquea con
  cuenta (alojamiento exacto, horarios, aerolínea, traslado, avisos)
  está en la tabla `detalles_destino` de Supabase, con RLS: solo el rol
  `authenticated` puede leerla y al anónimo se le quita el permiso.
  Comprobado: sin sesión, Supabase responde 401 "permission denied".
  `js/destinos.js` solo tiene la parte pública (precios y notas).
- **Datos:** `supabase/detalles_destino.sql` crea la tabla y la
  rellena; se puede volver a ejecutar en el SQL Editor para actualizar.
  Los precios se cambian desde el panel admin; si añades o quitas un
  destino, hazlo en la tabla `destinos`, en `detalles_destino` y en
  `js/destinos.js` (respaldo).
- **Claves:** `js/config.js` lleva la URL y la clave *publishable*,
  que son públicas por diseño. La clave secreta (`sb_secret_…`) no va
  en ningún archivo.
- **Al desplegar:** no publicar la carpeta `supabase/`, porque tiene
  los datos protegidos en claro.
- **Panel admin (22-oct-2026):** `admin.html`, enlazado desde "Mi
  cuenta" solo para administradores. Muestra estadísticas, la lista de
  usuarios (solo lectura) y un editor de precios y notas de cada
  destino. `supabase/admin.sql` lo monta todo: marca la cuenta de Jose
  como admin (`role: admin` en el `app_metadata`, que el usuario no
  puede cambiar desde la web), crea la tabla `destinos` (la lee
  cualquiera, solo un admin la edita), deja a un admin editar
  `detalles_destino` y crea `admin_usuarios()`, que da error si no eres
  admin. Para hacer admin a otra persona: el mismo `update` del SQL con
  su email, o el botón "Hacer admin" del panel. Comprobado: un visitante
  anónimo recibe "permission denied" al editar y al pedir la lista de
  usuarios.
- **Gestión de usuarios (22-oct-2026):** `supabase/admin_usuarios.sql`
  (se ejecuta después de `admin.sql`) añade `admin_cambiar_rol()`,
  `admin_banear()` (1, 7 o 30 días o para siempre; cierra sus sesiones)
  y `admin_eliminar()`. Todas comprueban en el servidor que eres admin y
  no dejan que un admin se toque a sí mismo. `es_admin()` mira ahora el
  rol en `auth.users` y no en el token, así que quitar el admin vale al
  momento. Un baneado no puede entrar ni renovar la sesión; si tenía la
  web abierta, le dura como mucho 1 hora (lo que dura su token). Las
  confirmaciones son un modal de la página, no `window.confirm`, que el
  navegador integrado de la app no muestra.
- **Cuenta de Google del proyecto:** `cheapscape.notificaciones@gmail.com`
  (creada el 21-oct-2026) fue **suspendida por Google** el 22-oct-2026.
  Pendiente de recurso o de sustituirla. Las contraseñas las guarda Jose
  en su gestor de contraseñas, nunca aquí.

**Precio total** = vuelo i/v + traslado aeropuerto-ciudad i/v +
alojamiento × noches del viaje (precio por noche = `precio2Noches / 2`;
compartido si el usuario marca la casilla y el destino lo tiene; si no,
privado). Las noches salen de las fechas que elige el usuario. Los
precios de vuelo son de referencia (13-15 nov 2026) aunque elija otras
fechas; el rótulo de "estimación orientativa" lo dice. Conseguir
precios para cualquier fecha a meses vista está pendiente (decisión 5).

**Algoritmo del Top 3** (debe poder explicarlo Jose): se calcula el
precio total de los 15 destinos desde el origen y se quedan los que
caben en el presupuesto; *barato* = menor precio total; *mejor
valorado* = mejor nota de alojamiento (sobre 10) y, a igualdad, el más
barato; *exótico* = el más barato de los marcados como exóticos. Nunca
se repite destino. `ahorroPct` = ahorro respecto a la media de los
que caben. Si no cabe ninguno, se dice cuánto cuesta el más barato.

---

## 4. Hoja de ruta (rehaciendo desde cero, solo frontend)

Basada en el informe del profesor (21-oct-2026), cuya recomendación
central es: **no abandonar la idea; recortarla y validarla con datos
curados a mano antes de pelearse con APIs reales.**

### Alcance del MVP (todo lo demás es Fase 2)
- 2 orígenes: **Madrid y Barcelona**.
- ~15 destinos europeos, viajes de las noches que elija el usuario,
  presupuesto por persona, en euros.
- 4 pantallas núcleo: landing con buscador, Top 3, regwall (registro),
  detalle desbloqueado. Las páginas legales y de contenido ya existen.
- Datos: **tabla propia de destinos y precios orientativos cargados a
  mano**, con fecha de revisión visible. Nunca aleatorios.
- Auth: email + contraseña (Google OAuth opcional, después).
- Sin pagos, sin integraciones en vivo. El botón de salida lleva a un
  enlace de búsqueda del proveedor (Skyscanner, Booking, Hostelworld,
  Flixbus…); afiliación solo si ya está aprobada.

### Definición de "lanzable"
1. Una persona completa búsqueda → Top 3 → registro → detalle → clic de
   salida, sin ayuda.
2. Funciona en móvil y escritorio.
3. 2 orígenes y ≥15 destinos con precios cargados y fecha de revisión
   visible.
4. Importes en euros y por persona. **El detalle no se ve sin cuenta,
   comprobado en el servidor** (no basta con ocultarlo en el frontend).
5. Estado claro cuando no hay resultados.
6. Registro con casilla de privacidad y texto legal básico.
7. Aviso visible de estimaciones y de enlaces comerciales.
8. Publicado en una URL con analítica activa (Plausible o Umami: sin
   cookies, gratis).

### Plan por fases
| # | Fase | Entregable | Cómo comprobarlo |
|---|---|---|---|
| 1 | Definición | Alcance cerrado (este README) | Jose lo explica en 1 minuto |
| 2 | Datos | Tabla ~15 destinos × 2 orígenes con precios verificados a mano | Comparar 3 destinos con precios reales de hoy |
| 3 | Diseño | Frontend actual (ya hecho) — **no rehacer** | Revisión en móvil y escritorio |
| 4 | Backend base | Decidir stack nuevo (ver 5), auth, tablas, protección del detalle | Registro/login funcionan; un usuario no lee datos de otro |
| 5 | Conectar frontend | Sustituir los `fetch` de 3.1 manteniendo el contrato | Casos: presupuesto muy bajo, muy alto, sin resultados |
| 6 | Pruebas | Lista de casos límite | Todo pasa; el detalle da 401 sin sesión |
| 7 | Despliegue | URL pública + analítica; claves fuera de Git | Abrirla desde otro móvil |
| 8 | Lanzamiento | Enlace + encuesta de 3 preguntas a 15-25 personas (Erasmus, universidad, grupos de viajes) | ≥10 respuestas |

Encuesta: ¿te interesó alguno de los 3 viajes? ¿te fiaste del
precio? ¿te registrarías y harías clic para reservar?

### Fase 2 (solo con tracción real, ej. >100 búsquedas/semana)
APIs en vivo de vuelos/buses/hoteles (ver decisión 5: Amadeus
Self-Service cerró el 17-jul-2026; Booking, Skyscanner, Airbnb y
Trainline exigen contrato o mucho tráfico), cualquier
ciudad de origen con autocompletado, fechas libres, rate limiting,
Google OAuth si el registro por email frena, dashboard y favoritos,
alertas y emails, KPIs de búsquedas y clics en el panel admin, referidos/WhatsApp/push,
afiliación con atribución, dominio y marca definitivos.

**Blog para SEO (idea del 22-oct-2026).** Guías por país y ciudad de los
15 destinos: planes, comida, monumentos, cómo llegar del aeropuerto, etc.
Cada guía enlaza al buscador. Criterios acordados:
- Empezar solo cuando el buscador funcione, con 2-3 guías de ciudades
  que Jose conozca (ej. Viena y Bratislava) y medir si traen visitas
  antes de escribir más.
- Contenido con experiencia propia (precios reales, trucos, fotos
  propias); nada de artículos en masa generados con IA sin revisar,
  que Google posiciona mal.

### Riesgos a vigilar
- Precios desactualizados o simulados que parecen reales → fecha visible
  y rótulo de estimación.
- Fuga de datos del regwall → filtrar **en servidor**.
- Auth mal configurada → probar con dos cuentas.
- Alcance que crece → el cierre de la fase 1 es el contrato; lo nuevo va
  a Fase 2.
- RGPD: casilla de privacidad, textos legales, cookies solo si la
  analítica las usa.
- Dependencia de la IA: Jose debe poder explicar con sus palabras el
  algoritmo y el flujo de registro.

---

## 5. Decisiones abiertas (a decidir con Jose, una a una)

1. ~~**Stack del backend nuevo.**~~ Decidido: Supabase (ver 3.2). El informe del profesor propuso
   Next.js + Supabase (Postgres, Auth, RLS) + Vercel; la versión
   anterior usó Node/Express + Postgres en Docker. Jose viene de
   infraestructura/Linux. Decidir tras explicar pros y contras; mientras
   tanto el frontend puede probarse con datos de ejemplo fijos.
2. Dónde alojar el frontend (Netlify estaba en uso).
3. ~~Qué 15 destinos~~ Decidido (22-oct-2026), están en `js/destinos.js`:
   Budapest, Praga, Varsovia, Atenas, Bratislava (baratos); Roma, París,
   Ámsterdam, Berlín, Viena (calidad); Skopie, Belgrado, Reikiavik, Oslo,
   Zúrich (exóticos; sustituye a Berna, que no tiene aeropuerto con
   vuelos). Precios cargados a mano el 22-oct-2026 para el finde del
   13-15 nov 2026: vuelo + traslado aeropuerto-ciudad + alojamiento
   privado o compartido.
4. Analítica: Plausible vs Umami.
5. **Fuente de precios para cualquier fecha** (pendiente, 22-oct-2026).
   Con una foto de precios a mano no se cubren fechas a meses vista ni
   la subida de precios al acercarse la fecha (720 precios/semana para
   3 meses). Opciones vistas: Travelpayouts (calendario de precios de
   vuelos, registro gratis de afiliado), LiteAPI (hoteles, registro
   gratis), Hostelworld y Omio (afiliados, hay que solicitarlo). Se
   descartó limitar la web a "los próximos findes": CheapScape es para
   viajes de cualquier duración.

---

## 6. Cómo trabajar con Jose (para Claude Code)

- **Idioma y tono:** español, informal, directo, sin florituras ni
  halagos. Respuestas cortas, lo importante primero.
- **Ir poco a poco.** Jose pidió expresamente avanzar paso a paso; no
  proponer ni construir cosas de Fase 2 sin que lo pida.
- **Explicar antes de construir** cada fase: tiene que entenderlo.
- **No subir nada a GitHub** hasta que Jose lo diga. Esta carpeta se
  sube al repo **privado** `Anubis15X/CheapScape-2.0` (desde el
  22-oct-2026). `supabase/` no se sube nunca (está en `.gitignore`).
- **No almacenar ni pedir credenciales** (contraseñas, claves, secretos
  de OAuth) en archivos del proyecto; van en variables de entorno que
  Jose gestiona.
- Antes de cambiar estilos, recordar que los colores son tokens en
  `:root`; no hardcodear colores nuevos.
- Los iconos SVG de `imagenes/` llevan colores propios: si se cambia el
  tema hay que recolorearlos aparte.

---

## 7. Material en stand by (no tocar salvo petición)

En el repositorio de GitHub (privado), fuera de esta carpeta:
`backend/` (Node/Express, rutas de auth/búsquedas/viajes/admin, motor
determinista `motorViajes.js`, esquema `init.sql` con `usuarios` y
`busquedas`), `nginx/`, `docker-compose.yml`, `scripts/instalar.sh`,
`maquina-virtual/` y la documentación previa (`hoja-de-ruta-backend.md`,
`hoja-de-ruta-mvp.md` y los tres PDF de requisitos/marketing/backend
generados con Gemini).
