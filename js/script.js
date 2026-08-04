// =====================================================
// DATOS COMPARTIDOS: LOS 6 PROYECTOS
// Unica fuente de verdad. Cambiar aqui y se actualiza en todo el sitio.
//
// Rutas de archivo:
//   videos:  videos/<slug>-1.mp4 ... <slug>-4.mp4
//   renders: img/renders/<slug>-1.jpg ... <slug>-4.jpg
//
// POR AHORA: como los videos reales todavia no estan, usamos imagenes fijas
// como placeholder (el campo "videoPoster"). Cuando Andrea mande los .mp4,
// solo hay que subirlos con esos nombres y descomentar el uso de "videos"
// en crearTarjetasInicial() mas abajo.
// =====================================================
const proyectos = [
    {
        slug: 'waiting-room',
        titulo: 'The Waiting Room',
        descripcion: 'The Waiting Room is a haven designed to pause time. Between warm lighting, velvet textures, and an arching, immersive architecture, we created an intimate and cozy space where every detail invites you to stay. A corner with its own character and a cinematic aesthetic, crafted simply to enjoy an impeccable coffee and great conversation.'
    },
    {
        slug: 'studio70',
        titulo: 'Studio 70',
        descripcion: 'Studio 70 is a retreat defined by material contrast. Between polished metal accents, reflective mirrors, and warm lighting, we created a cozy atmosphere where you can play pool or unwind with a film. A space with iconic character and a refined, retro-futurist aesthetic, designed simply to enjoy great entertainment and easy conversation.'
    },
    {
        slug: 'capsule',
        titulo: 'Capsule',
        descripcion: 'Capsule is a futuristic hub defined by organic geometry. Between sleek polished metal, rich dark leather, and warm wood accents, we created a focused atmosphere that channels an orbital design. A space with iconic character and a minimalist, sci-fi aesthetic, crafted simply to foster creativity and bold collaboration.'
    },
    {
        slug: 'muse',
        titulo: 'Muse',
        descripcion: 'Muse is a creative studio defined by playful composition. Between modular geometric sections, pleated shades, and rich color options, we created a kit where you can build your lamp. A design with an iconic character and a Tetris-inspired aesthetic, crafted with eco-PLA 3D printing simply to foster ingenuity and bold self-expression.'
    },
    {
        slug: 'proyecto-5',
        titulo: 'Proyecto 5',
        descripcion: 'Placeholder para el proyecto 5. Reemplazar cuando Andrea mande el contenido real.'
    },
    {
        slug: 'proyecto-6',
        titulo: 'Proyecto 6',
        descripcion: 'Placeholder para el proyecto 6. Reemplazar cuando Andrea mande el contenido real.'
    }
];

// Cada proyecto tiene 4 videos y 4 renders. Los nombres estan listos:
// videos/waiting-room-1.mp4, videos/waiting-room-2.mp4, etc.
// img/renders/waiting-room-1.jpg, img/renders/waiting-room-2.jpg, etc.
function rutasVideos(slug) {
    return [1, 2, 3, 4].map(n => `../videos/${slug}-${n}.mp4`);
}
function rutasRenders(slug) {
    return [1, 2, 3, 4].map(n => `../img/renders/${slug}-${n}.jpg`);
}

// PLACEHOLDER visual: mientras no haya videos reales, usamos una imagen fija
// para cada proyecto (una por proyecto, se ve el layout funcionando).
// Cuando enchufemos los videos, esto se ignora.
const posterPlaceholder = {
    'waiting-room': 'https://picsum.photos/seed/waiting-room/1200/740',
    'studio70':     'https://picsum.photos/seed/studio70/1200/740',
    'capsule':      'https://picsum.photos/seed/capsule/1200/740',
    'muse':         'https://picsum.photos/seed/muse/1200/740',
    'proyecto-5':   'https://picsum.photos/seed/proyecto-5/1200/740',
    'proyecto-6':   'https://picsum.photos/seed/proyecto-6/1200/740'
};

// Lee ?proyecto=N de la URL y lo convierte a indice 0..5 (por defecto el 1)
function obtenerIndiceProyecto() {
    const params = new URLSearchParams(window.location.search);
    let n = parseInt(params.get('proyecto'), 10);
    if (isNaN(n)) n = 1;
    n = Math.min(Math.max(n, 1), proyectos.length);
    return n - 1;
}


// =====================================================
// CARRUSEL 3D DE VIDEOS (proyecto-video.html)
// Muestra los 4 videos del proyecto actual. Sin nombre encima.
// Flechas: navegan entre los 4 videos del MISMO proyecto.
// Al llegar al ultimo video y darle ->, salta a la descripcion del proyecto.
// =====================================================
const tarjetasTrack = document.getElementById('tarjetasTrack');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

const indiceProyectoActual = obtenerIndiceProyecto();
let indiceVideoActivo = 0;
let elementosTarjetas = [];
const CANT_VIDEOS = 4;

function calcularOffset(indice) {
    let diferencia = indice - indiceVideoActivo;
    if (diferencia > CANT_VIDEOS / 2) diferencia -= CANT_VIDEOS;
    if (diferencia < -CANT_VIDEOS / 2) diferencia += CANT_VIDEOS;
    return diferencia;
}

function crearTarjetasInicial() {
    if (!tarjetasTrack) return;
    tarjetasTrack.innerHTML = '';
    elementosTarjetas = [];

    const proyecto = proyectos[indiceProyectoActual];
    const poster = posterPlaceholder[proyecto.slug] || posterPlaceholder['waiting-room'];

    // POR AHORA: 4 tarjetas con la misma imagen placeholder por proyecto.
    //
    // CUANDO TENGAMOS LOS VIDEOS reales, reemplazar el bloque de abajo por:
    //
    //   const videos = rutasVideos(proyecto.slug);
    //   videos.forEach((src) => {
    //       const div = document.createElement('div');
    //       div.classList.add('tarjeta');
    //       const video = document.createElement('video');
    //       video.src = src;
    //       video.autoplay = true;
    //       video.loop = true;
    //       video.muted = true;
    //       video.playsInline = true;
    //       div.appendChild(video);
    //       tarjetasTrack.appendChild(div);
    //       elementosTarjetas.push(div);
    //   });
    //
    for (let i = 0; i < CANT_VIDEOS; i++) {
        const div = document.createElement('div');
        div.classList.add('tarjeta');
        div.style.backgroundImage = `url('${poster}')`;
        tarjetasTrack.appendChild(div);
        elementosTarjetas.push(div);
    }
}

function actualizarPosiciones() {
    elementosTarjetas.forEach((div, i) => {
        const offset = calcularOffset(i);
        let transform = '';
        let opacity = '1';
        let zIndex = '5';
        let esActiva = false;

        if (offset === 0) {
            transform = 'translate(-50%, -50%) scale(1)';
            zIndex = '5';
            esActiva = true;
        } else if (offset === -1) {
            transform = 'translate(-128%, -50%) scale(0.78)';
            opacity = '0.6';
            zIndex = '4';
        } else if (offset === 1) {
            transform = 'translate(28%, -50%) scale(0.78)';
            opacity = '0.6';
            zIndex = '4';
        } else if (offset === -2) {
            transform = 'translate(-185%, -50%) scale(0.58)';
            opacity = '0.25';
            zIndex = '3';
        } else if (offset === 2) {
            transform = 'translate(85%, -50%) scale(0.58)';
            opacity = '0.25';
            zIndex = '3';
        } else {
            transform = 'translate(-50%, -50%) scale(0.4)';
            opacity = '0';
            zIndex = '1';
        }

        div.style.transform = transform;
        div.style.opacity = opacity;
        div.style.zIndex = zIndex;
        div.classList.toggle('no-activa', !esActiva);
    });
}

if (tarjetasTrack) {
    crearTarjetasInicial();
    actualizarPosiciones();

    // Flecha izquierda: video anterior. Si esta en el primero, no hace nada
    // (evitamos que "se caiga" del proyecto por atras sin querer).
    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => {
            if (indiceVideoActivo > 0) {
                indiceVideoActivo -= 1;
                actualizarPosiciones();
            }
        });
    }

    // Flecha derecha: video siguiente.
    // Cuando estas en el ULTIMO video del proyecto y le das ->, salta a la
    // descripcion de ese mismo proyecto.
    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', () => {
            if (indiceVideoActivo < CANT_VIDEOS - 1) {
                indiceVideoActivo += 1;
                actualizarPosiciones();
            } else {
                window.location.href = `proyecto-descripcion.html?proyecto=${indiceProyectoActual + 1}`;
            }
        });
    }
}


// =====================================================
// PAGINA DESCRIPCION (proyecto-descripcion.html)
// Muestra titulo + descripcion + 4 renders del proyecto actual.
// Click en la imagen -> avanza al siguiente render.
// Click en la ULTIMA imagen -> pasa al SIGUIENTE proyecto (sus videos).
// Despues del proyecto 6 vuelve al proyecto 1 (loop, para no dejar callejones sin salida).
// Flecha -> siempre lleva a home.html (ANDREA MANZUR).
// A.M -> vuelve al video de ESTE proyecto.
// =====================================================
const tituloDescripcion = document.getElementById('tituloDescripcion');
const descripcionTexto = document.getElementById('descripcionTexto');
const renderDescripcion = document.getElementById('renderDescripcion');
const renderClickable = document.getElementById('renderClickable');
const descripcionIndicadores = document.getElementById('descripcionIndicadores');
const btnVideoDesc = document.getElementById('btnVideoDesc');

if (tituloDescripcion && descripcionTexto) {
    const idx = obtenerIndiceProyecto();
    const proyecto = proyectos[idx];

    // Renders reales: img/renders/<slug>-1.jpg ... 4.jpg
    // Placeholder mientras no esten: 4 variantes de la misma imagen del proyecto.
    const rendersReales = rutasRenders(proyecto.slug);
    const rendersPlaceholder = [1, 2, 3, 4].map(
        n => `https://picsum.photos/seed/${proyecto.slug}-${n}/1200/740`
    );
    // POR AHORA usamos los placeholders. Cuando subas los renders reales al repo,
    // cambia esta linea por: const renders = rendersReales;
    const renders = rendersPlaceholder;

    let indiceRender = 0;

    // Titulo y descripcion del proyecto actual
    tituloDescripcion.textContent = proyecto.titulo;
    descripcionTexto.textContent = proyecto.descripcion;

    function pintarIndicadoresDescripcion() {
        if (!descripcionIndicadores) return;
        descripcionIndicadores.innerHTML = '';
        renders.forEach((_, i) => {
            const punto = document.createElement('div');
            punto.classList.add('punto');
            if (i === indiceRender) punto.classList.add('activo');
            descripcionIndicadores.appendChild(punto);
        });
    }

    if (renderDescripcion) {
        renderDescripcion.src = renders[0];
        pintarIndicadoresDescripcion();

        if (renderClickable) {
            renderClickable.addEventListener('click', () => {
                // Si estamos en la ULTIMA foto, saltar al siguiente proyecto
                // (a los videos del proyecto siguiente). Loop 6 -> 1.
                if (indiceRender === renders.length - 1) {
                    const siguienteProyecto = (idx + 1) % proyectos.length + 1;
                    window.location.href = `proyecto-video.html?proyecto=${siguienteProyecto}`;
                    return;
                }
                // Si no, avanzar a la siguiente foto del mismo proyecto
                indiceRender += 1;
                renderDescripcion.style.opacity = 0;
                setTimeout(() => {
                    renderDescripcion.src = renders[indiceRender];
                    renderDescripcion.style.opacity = 1;
                    pintarIndicadoresDescripcion();
                }, 300);
            });
        }
    }

    // A.M -> vuelve al video de este mismo proyecto
    if (btnVideoDesc) {
        btnVideoDesc.href = `proyecto-video.html?proyecto=${idx + 1}`;
    }
}


// =====================================================
// PAGINA HOME (home.html) - Volver y toggle de contacto
// =====================================================
const btnVolver = document.getElementById('btnVolver');
const btnContact = document.getElementById('btnContact');
const contactoInfo = document.getElementById('contactoInfo');

if (btnVolver) {
    btnVolver.addEventListener('click', () => {
        window.history.back();
    });
}

if (btnContact && contactoInfo) {
    btnContact.addEventListener('click', () => {
        contactoInfo.classList.toggle('activo');
    });
}
