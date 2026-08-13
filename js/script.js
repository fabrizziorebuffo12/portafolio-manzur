// =====================================================
// DATOS DE LOS 5 PROYECTOS
// - "real": tiene renders subidos (carrusel pagina 3)
// - "planosReales": tiene planos subidos (descripcion)
// =====================================================
const proyectos = [
    {
        slug: 'waiting-room',
        real: true,
        planosReales: false,
        titulo: 'The Waiting Room',
        descripcion: 'This design proposal transforms the coffee experience into a cinematic, theatrical atmosphere. By contrasting red velvet curtains and a black-and-white checkered floor with sleek, polished stainless steel volumes, the space balances dramatic warmth with technical precision. Subtle, focused lighting and elevated platforms move away from traditional coffee shop layouts to deliver an immersive, mysterious, and timeless environment.'
    },
    {
        slug: 'studio70',
        real: true,
        planosReales: false,
        titulo: 'Studio 70',
        descripcion: 'An open-plan room balances rest and leisure in an intimate, scenic atmosphere. A dramatic circular portal of brushed metal encloses the sleeping area with its chocolate-brown bed and Scandinavian-style lighting. Beyond the arch, the space opens into a lounge and bar with a Ball Chair, tufted leather sofa, and fuchsia pool table, creating a sophisticated and immersive environment.'
    },
    {
        slug: 'capsule',
        real: true,
        planosReales: false,
        titulo: 'Capsule',
        descripcion: 'This executive office features a design where pure geometries and material rigor create a sophisticated workspace. Structured around an impactful modular wall of metallic panels with circular reliefs, it contrasts with tactile gray plaster walls. A lounge anchored by a curved burgundy leather sofa dialogues with the workstation, framed by an illuminated circular aperture, achieving balance and scenic comfort.'
    },
    {
        slug: 'muse',
        real: true,
        planosReales: false,
        titulo: 'Muse',
        descripcion: 'This project features a modular PLA lamp manufactured through 3D printing, conceived as a customizable lighting totem. Stackable modules with pleated and fluted finishes allow for various heights and silhouettes, where upper white sections function as warm light diffusers while deeper-toned bases provide stability. Leveraging additive manufacturing precision, it merges technical versatility with a strong sculptural presence.'
    },
    {
        slug: 'dos-son-multitud',
        real: false,
        planosReales: false,
        titulo: 'Dos Son Multitud',
        descripcion: 'Tesis de Andrea. Placeholder por ahora; reemplazar cuando lleguen los renders, planos y descripcion real.'
    }
];

function rutasRenders(slug) {
    return [1, 2, 3, 4].map(n => `../img/renders/${slug}-${n}.jpg`);
}
function rutasPlanos(slug) {
    return [1, 2, 3, 4].map(n => `../img/planos/${slug}-plano-${n}.jpg`);
}

const posterPlaceholder = {
    'dos-son-multitud': '../img/placeholder.svg'
};

function obtenerIndiceProyecto() {
    const params = new URLSearchParams(window.location.search);
    let n = parseInt(params.get('proyecto'), 10);
    if (isNaN(n)) n = 1;
    n = Math.min(Math.max(n, 1), proyectos.length);
    return n - 1;
}


// =====================================================
// CARRUSEL DE RENDERS (proyecto-video.html)
// =====================================================
const tarjetasTrack = document.getElementById('tarjetasTrack');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

const indiceProyectoActual = obtenerIndiceProyecto();
let indiceActivo = 0;
let elementosTarjetas = [];
const CANT_TARJETAS = 4;

function calcularOffset(indice) {
    let d = indice - indiceActivo;
    if (d > CANT_TARJETAS / 2) d -= CANT_TARJETAS;
    if (d < -CANT_TARJETAS / 2) d += CANT_TARJETAS;
    return d;
}

function crearTarjetasInicial() {
    if (!tarjetasTrack) return;
    tarjetasTrack.innerHTML = '';
    elementosTarjetas = [];

    const proyecto = proyectos[indiceProyectoActual];

    if (proyecto.real) {
        const imgs = rutasRenders(proyecto.slug);
        imgs.forEach((src) => {
            const div = document.createElement('div');
            div.classList.add('tarjeta');
            const img = document.createElement('img');
            img.src = src;
            img.alt = proyecto.titulo;
            div.appendChild(img);
            tarjetasTrack.appendChild(div);
            elementosTarjetas.push(div);
        });
    } else {
        const poster = posterPlaceholder[proyecto.slug];
        for (let i = 0; i < CANT_TARJETAS; i++) {
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

function irSiguienteTarjeta() {
    if (indiceActivo < CANT_TARJETAS - 1) {
        indiceActivo += 1;
        actualizarPosiciones();
    } else {
        window.location.href = `proyecto-descripcion.html?proyecto=${indiceProyectoActual + 1}`;
    }
}

function irAnteriorTarjeta() {
    if (indiceActivo > 0) {
        indiceActivo -= 1;
        actualizarPosiciones();
    }
}

if (tarjetasTrack) {
    crearTarjetasInicial();
    actualizarPosiciones();

    if (btnAnterior) btnAnterior.addEventListener('click', irAnteriorTarjeta);
    if (btnSiguiente) btnSiguiente.addEventListener('click', irSiguienteTarjeta);

    const contenedor = document.querySelector('.carrusel-3d-contenedor');
    if (contenedor) {
        let touchStartX = null;
        contenedor.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        contenedor.addEventListener('touchend', (e) => {
            if (touchStartX === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX;
            touchStartX = null;
            if (Math.abs(dx) < 50) return;
            if (dx < 0) irSiguienteTarjeta();
            else irAnteriorTarjeta();
        }, { passive: true });
    }
}


// =====================================================
// PAGINA DESCRIPCION
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

    const imagenes = proyecto.planosReales
        ? rutasPlanos(proyecto.slug)
        : [1,2,3,4].map(n => '../img/placeholder.svg');
    let indiceImagen = 0;

    tituloDescripcion.textContent = proyecto.titulo;
    descripcionTexto.textContent = proyecto.descripcion;

    function pintarIndicadores() {
        if (!descripcionIndicadores) return;
        descripcionIndicadores.innerHTML = '';
        imagenes.forEach((_, i) => {
            const punto = document.createElement('div');
            punto.classList.add('punto');
            if (i === indiceImagen) punto.classList.add('activo');
            descripcionIndicadores.appendChild(punto);
        });
    }

    if (renderDescripcion) {
        renderDescripcion.src = imagenes[0];
        pintarIndicadores();

        if (renderClickable) {
            renderClickable.addEventListener('click', () => {
                if (indiceImagen === imagenes.length - 1) {
                    const siguiente = (idx + 1) % proyectos.length + 1;
                    window.location.href = `proyecto-video.html?proyecto=${siguiente}`;
                    return;
                }
                indiceImagen += 1;
                renderDescripcion.style.opacity = 0;
                setTimeout(() => {
                    renderDescripcion.src = imagenes[indiceImagen];
                    renderDescripcion.style.opacity = 1;
                    pintarIndicadores();
                }, 300);
            });
        }
    }

    if (btnVideoDesc) {
        btnVideoDesc.href = `proyecto-video.html?proyecto=${idx + 1}`;
    }
}


// =====================================================
// PAGINA HOME - toggle de contacto
// =====================================================
const btnContact = document.getElementById('btnContact');
const contactoInfo = document.getElementById('contactoInfo');

if (btnContact && contactoInfo) {
    btnContact.addEventListener('click', () => {
        contactoInfo.classList.toggle('activo');
    });
}
