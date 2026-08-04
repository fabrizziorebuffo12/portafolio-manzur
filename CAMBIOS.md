# Cambios de esta ronda

## Cómo aplicarlo al repo
1. Reemplazar TODA la carpeta del proyecto con esta.
   O reemplazar archivo por archivo: `index.html`, `css/style.css`, `js/script.js`
   y los 4 archivos de `html/`. Agregar las carpetas nuevas `img/renders/` y `videos/`.
2. Borrar del repo (si sigue ahí) el archivo `html/proyecto-renders.html` — ya no se usa.
3. Commit y push. Al probar en el navegador: **Ctrl + F5** para forzar recarga sin caché.

## Qué hace el sitio ahora

- **Portada (`index.html`)**: solo "MANZUR" centrado → lleva al grid.
- **Grid (`html/proyectos.html`)**: 6 slots (4 nombres reales + 2 placeholders).
  Click en cualquiera → sus videos. A.M abajo → vuelve a MANZUR.
- **Videos (`html/proyecto-video.html`)**: 4 videos del proyecto elegido, sin nombre
  encima. Flechas ← → cambian entre los 4 videos del mismo proyecto. Al llegar al
  último y darle → salta a la descripción de ese proyecto. A.M vuelve al grid.
- **Descripción (`html/proyecto-descripcion.html`)**: título + descripción real +
  4 renders. Click en la imagen avanza al siguiente render. Click en la última
  imagen → salta a los videos del siguiente proyecto (después del 6 vuelve al 1,
  loop para no quedar atrapado). Flecha → siempre lleva a ANDREA MANZUR. A.M vuelve
  al video de ese mismo proyecto.
- **ANDREA MANZUR (`html/home.html`)**: sin cambios en esta ronda, la vemos al final.

## Estado del contenido

Por ahora todo funciona con **placeholders** (imágenes de picsum.photos por proyecto).

Cuando estén los archivos reales de Andrea:

- Subir los **videos** a `videos/` con los nombres del `videos/README.txt`.
- Subir los **renders** a `img/renders/` con los nombres del `img/renders/README.txt`.
- Avisarme y activo en `js/script.js` el uso de los archivos reales (hay dos
  bloques comentados dentro del JS que indican exactamente qué línea cambiar).
