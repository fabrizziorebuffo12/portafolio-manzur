// =====================================================
// DATOS DE LOS 6 PROYECTOS
// El flag "real" marca cuales tienen contenido real subido
// (waiting-room, studio70, capsule, muse) vs cuales siguen
// con placeholder (proyecto-5, proyecto-6).
// =====================================================
const proyectos = [
    {
        slug: 'waiting-room',
        real: true,
        titulo: 'The Waiting Room',
        descripcion: 'The Waiting Room is a haven designed to pause time. Between warm lighting, velvet textures, and an arching, immersive architecture, we created an intimate and cozy space where every detail invites you to stay. A corner with its own character and a cinematic aesthetic, crafted simply to enjoy an impeccable coffee and great conversation.'
    },
    {
        slug: 'studio70',
        real: true,
        titulo: 'Studio 70',
        descripcion: 'Studio 70 is a retreat defined by material contrast. Between polished metal accents, reflective mirrors, and warm lighting, we created a cozy atmosphere where you can play pool or unwind with a film. A space with iconic character and a refined, retro-futurist aesthetic, designed simply to enjoy great entertainment and easy conversation.'
    },
    {
        slug: 'capsule',
        real: true,
        titulo: 'Capsule',
        descripcion: 'Capsule is a futuristic hub defined by organic geometry. Between sleek polished metal, rich dark leather, and warm wood accents, we created a focused atmosphere that channels an orbital design. A space with iconic character and a minimalist, sci-fi aesthetic, crafted simply to foster creativity and bold collaboration.'
    },
    {
        slug: 'muse',
        real: true,
        titulo: 'Muse',
        descripcion: 'Muse is a creative studio defined by playful composition. Between modular geometric sections, pleated shades, and rich color options, we created a kit where you can build your lamp. A design with an iconic character and a Tetris-inspired aesthetic, crafted with eco-PLA 3D printing simply to foster ingenuity and bold self-expression.'
    },
    {
        slug: 'proyecto-5',
        real: false,
        titulo: 'Proyecto 5',
        descripcion: 'Placeholder para el proyecto 5. Reemplazar cuando Andrea mande el contenido real.'
    },
    {
        slug: 'proyecto-6',
        real: false,
        titulo: 'Proyecto 6',
        descripcion: 'Placeholder para el proyecto 6. Reemplazar cuando Andrea mande el contenido real.'
    }
];

function rutasVideos(slug) {
    return [1, 2, 3, 4].map(n => `../videos/${slug}-${n}.mp4`);
}
function rutasRenders(slug) {
    return [1, 2, 3, 4].map(n => `../img/renders/${slug}-${n}.jpg`);
}

const posterPlaceholder = {
    'proyecto-5': 'https://picsum.photos/seed/proyecto-5/1200/740',
    'proyecto-6': 'https://picsum.photos/seed/proyecto-6/1200/740'
};

function obtenerIndiceProyecto() {
    const params = new URLSearchParams(window.location.search);
    let n = parseInt(params.get('proyecto'), 10);
    if (isNaN(n)) n = 1;
    n = Math.min(Math.max(n, 1), proyectos.length);
    return n - 1;
}


// =====================================================
// CARRUSEL DE VIDEOS (proyecto-video.html)
// =====================================================
const tarjetasTrack = document.getElementById('tarjetasTrack');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

const indiceProyectoActual = obtenerIndiceProyecto();
let indiceVideoActivo = 0;
let elementosTarjetas = [];
const CANT_VIDEOS = 4;

function calcularOffset(indice) {
    let d = indice - indiceVideoActivo;
    if (d > CANT_VIDEOS / 2) d -= CANT_VIDEOS;
    if (d < -CANT_VIDEOS / 2) d += CANT_VIDEOS;
    return d;
}

function crearTarjetasInicial() {
    if (!tarjetasTrack) return;
    tarjetasTrack.innerHTML = '';
    elementosTarjetas = [];

    const proyecto = proyectos[indiceProyectoActual];

    if (proyecto.real) {
        // Videos reales (autoplay + loop + muted, sin controles)
        const videos = rutasVideos(proyecto.slug);
        videos.forEach((src) => {
            const div = document.createElement('div');
            div.classList.add('tarjeta');
            const video = document.createElement('video');
            video.src = src;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            div.appendChild(video);
            tarjetasTrack.appendChild(div);
            elementosTarjetas.push(div);
        });
    } else {
        // Placeholder: la misma imagen para las 4 tarjetas
        const poster = posterPlaceholder[proyecto.slug];
        for (let i = 0; i < CANT_VIDEOS; i++) {
            const div = document.createElement('div');
            div.classList.add('tarjeta');
            div.style.backgroundImage = `url('${poster}')`;
            tarjetasTrack.appendChild(div);
            elementosTarjetas.push(div);
        }
    }
}

function actualizarPosiciones() {
    elementosTarjetas.forEach((div, i) => {
        const offset = calcularOffset(i);
        let transform = '', opacity = '1', zIndex = '5', esActiva = false;
        if (offset === 0) {
            transform = 'translate(-50%, -50%) scale(1)';
            zIndex = '5'; esActiva = true;
        } else if (offset === -1) {
            transform = 'translate(-128%, -50%) scale(0.78)';
            opacity = '0.6'; zIndex = '4';
        } else if (offset === 1) {
            transform = 'translate(28%, -50%) scale(0.78)';
            opacity = '0.6'; zIndex = '4';
        } else if (offset === -2) {
            transform = 'translate(-185%, -50%) scale(0.58)';
            opacity = '0.25'; zIndex = '3';
        } else if (offset === 2) {
            transform = 'translate(85%, -50%) scale(0.58)';
            opacity = '0.25'; zIndex = '3';
        } else {
            transform = 'translate(-50%, -50%) scale(0.4)';
            opacity = '0'; zIndex = '1';
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

    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => {
            if (indiceVideoActivo > 0) {
                indiceVideoActivo -= 1;
                actualizarPosiciones();
            }
        });
    }
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
// Crossfade real entre dos capas de <img> superpuestas:
// la que entra y la que sale animan al mismo tiempo, sin
// hueco en el medio. Las 4 fotos del proyecto se precargan
// apenas carga la pagina, asi el cambio es instantaneo
// (no depende de la velocidad de red en el momento del click).
// =====================================================
const tituloDescripcion = document.getElementById('tituloDescripcion');
const descripcionTexto = document.getElementById('descripcionTexto');
const renderCapaA = document.getElementById('renderCapaA');
const renderCapaB = document.getElementById('renderCapaB');
const renderClickable = document.getElementById('renderClickable');
const descripcionIndicadores = document.getElementById('descripcionIndicadores');
const btnVideoDesc = document.getElementById('btnVideoDesc');

if (tituloDescripcion && descripcionTexto) {
    const idx = obtenerIndiceProyecto();
    const proyecto = proyectos[idx];

    // Renders reales para los 4 proyectos con contenido, placeholder para 5 y 6
    const renders = proyecto.real
        ? rutasRenders(proyecto.slug)
        : [1, 2, 3, 4].map(n => `https://picsum.photos/seed/${proyecto.slug}-${n}/1200/740`);
    let indiceRender = 0;

    // Precarga las 4 fotos en memoria del navegador ni bien entra a la pagina.
    // Cuando el usuario haga click, la foto siguiente ya esta lista.
    renders.forEach((src) => {
        const img = new Image();
        img.src = src;
    });

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

    // capas[0] = renderCapaA, capas[1] = renderCapaB. indiceCapaActiva dice cual
    // de las dos esta arriba (opacity 1) en este momento.
    const capas = [renderCapaA, renderCapaB];
    let indiceCapaActiva = 0;

    if (renderCapaA && renderCapaB) {
        capas[indiceCapaActiva].src = renders[0];
        pintarIndicadoresDescripcion();

        if (renderClickable) {
            renderClickable.addEventListener('click', () => {
                // Ultima foto -> saltar al siguiente proyecto (loop 6 -> 1)
                if (indiceRender === renders.length - 1) {
                    const siguiente = (idx + 1) % proyectos.length + 1;
                    window.location.href = `proyecto-video.html?proyecto=${siguiente}`;
                    return;
                }

                indiceRender += 1;

                const capaSaliente = capas[indiceCapaActiva];
                const indiceCapaEntrante = 1 - indiceCapaActiva;
                const capaEntrante = capas[indiceCapaEntrante];

                // La foto ya esta precargada, asi que el src se pinta al instante.
                capaEntrante.src = renders[indiceRender];
                capaEntrante.classList.add('render-capa-activa');
                capaSaliente.classList.remove('render-capa-activa');

                indiceCapaActiva = indiceCapaEntrante;
                pintarIndicadoresDescripcion();
            });
        }
    }

    if (btnVideoDesc) {
        btnVideoDesc.href = `proyecto-video.html?proyecto=${idx + 1}`;
    }
}


// =====================================================
// PAGINA HOME (home.html) - toggle de contacto
// =====================================================
const btnContact = document.getElementById('btnContact');
const contactoInfo = document.getElementById('contactoInfo');

if (btnContact && contactoInfo) {
    btnContact.addEventListener('click', () => {
        contactoInfo.classList.toggle('activo');
    });
}
