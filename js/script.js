// =====================================================
// DATOS DE LOS 5 PROYECTOS
// - "real": tiene renders subidos (carrusel pagina 3)
// - "rendersCount": cuantos renders reales tiene
// - "planosCount": cuantos planos reales tiene (0 = usar placeholders)
// =====================================================
const proyectos = [
    {
        slug: 'waiting-room',
        real: true,
        rendersCount: 4,
        planosCount: 3,
        titulo: 'The Waiting Room',
        descripcion: 'This design proposal transforms the coffee experience into a cinematic, theatrical atmosphere. By contrasting red velvet curtains and a black-and-white checkered floor with sleek, polished stainless steel volumes, the space balances dramatic warmth with technical precision. Subtle, focused lighting and elevated platforms move away from traditional coffee shop layouts to deliver an immersive, mysterious, and timeless environment.'
    },
    {
        slug: 'studio70',
        real: true,
        rendersCount: 4,
        planosCount: 4,
        titulo: 'Studio 70',
        descripcion: 'An open-plan room balances rest and leisure in an intimate, scenic atmosphere. A dramatic circular portal of brushed metal encloses the sleeping area with its chocolate-brown bed and Scandinavian-style lighting. Beyond the arch, the space opens into a lounge and bar with a Ball Chair, tufted leather sofa, and fuchsia pool table, creating a sophisticated and immersive environment.'
    },
    {
        slug: 'capsule',
        real: true,
        rendersCount: 4,
        planosCount: 5,
        titulo: 'Capsule',
        descripcion: 'This executive office features a design where pure geometries and material rigor create a sophisticated workspace. Structured around an impactful modular wall of metallic panels with circular reliefs, it contrasts with tactile gray plaster walls. A lounge anchored by a curved burgundy leather sofa dialogues with the workstation, framed by an illuminated circular aperture, achieving balance and scenic comfort.'
    },
    {
        slug: 'muse',
        real: true,
        rendersCount: 4,
        planosCount: 2,
        titulo: 'Muse',
        descripcion: 'This project features a modular PLA lamp manufactured through 3D printing, conceived as a customizable lighting totem. Stackable modules with pleated and fluted finishes allow for various heights and silhouettes, where upper white sections function as warm light diffusers while deeper-toned bases provide stability. Leveraging additive manufacturing precision, it merges technical versatility with a strong sculptural presence.'
    },
    {
        slug: 'dos-son-multitud',
        real: true,
        rendersCount: 12,
        planosCount: 1,
        titulo: 'Dos Son Multitud',
        descripcion: 'This home is an intimate sanctuary where voluntary isolation becomes the ultimate form of happiness; a space of radical lines where chairs possess a soul and every object waits, with its own feelings, to fuel a creative explosion. A realm of deep silences acting as a protective womb, allowing the mind to reconcile with its inner contradictions through raw matter.'
    }
];

function rutasRenders(slug, count) {
    return Array.from({length: count}, (_, i) => `../img/renders/${slug}-${i+1}.jpg`);
}
function rutasPlanos(slug, count) {
    return Array.from({length: count}, (_, i) => `../img/planos/${slug}-plano-${i+1}.jpg`);
}
function placeholdersPlanos(count) {
    return Array.from({length: count}, () => '../img/placeholder.svg');
}

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

function calcularOffset(indice, total) {
    let d = indice - indiceActivo;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
}

function crearTarjetasInicial() {
    if (!tarjetasTrack) return;
    tarjetasTrack.innerHTML = '';
    elementosTarjetas = [];

    const proyecto = proyectos[indiceProyectoActual];

    if (proyecto.real) {
        const imgs = rutasRenders(proyecto.slug, proyecto.rendersCount);
        imgs.forEach((src, i) => {
            const div = document.createElement('div');
            div.classList.add('tarjeta');
            const img = document.createElement('img');
            // La primera imagen (la que se ve de entrada) se pide con prioridad alta;
            // el resto del proyecto se sigue pidiendo en paralelo pero de fondo.
            img.fetchPriority = i === 0 ? 'high' : 'low';
            img.src = src;
            img.alt = proyecto.titulo;
            div.appendChild(img);
            tarjetasTrack.appendChild(div);
            elementosTarjetas.push(div);
        });
    } else {
        for (let i = 0; i < 4; i++) {
            const div = document.createElement('div');
            div.classList.add('tarjeta');
            const img = document.createElement('img');
            img.src = '../img/placeholder.svg';
            img.alt = proyecto.titulo;
            div.appendChild(img);
            tarjetasTrack.appendChild(div);
            elementosTarjetas.push(div);
        }
    }
}

function actualizarPosiciones() {
    const total = elementosTarjetas.length;
    elementosTarjetas.forEach((div, i) => {
        const offset = calcularOffset(i, total);
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
    const total = elementosTarjetas.length;
    if (indiceActivo < total - 1) {
        indiceActivo += 1;
        actualizarPosiciones();
    } else {
        window.location.href = `proyecto-descripcion.html?proyecto=${indiceProyectoActual + 1}`;
    }
}

function irAnteriorTarjeta() {
    const total = elementosTarjetas.length;
    if (indiceActivo > 0) {
        indiceActivo -= 1;
        actualizarPosiciones();
    } else if (total > 1) {
        indiceActivo = total - 1;
        actualizarPosiciones();
    }
}

if (tarjetasTrack) {
    crearTarjetasInicial();
    actualizarPosiciones();

    // Precargar los planos de este proyecto mientras se ve el carrusel de renders,
    // para que ya esten en cache del navegador al llegar a la pagina de descripcion.
    const proyectoActual = proyectos[indiceProyectoActual];
    if (proyectoActual) {
        const planos = proyectoActual.planosCount > 0
            ? rutasPlanos(proyectoActual.slug, proyectoActual.planosCount)
            : placeholdersPlanos(4);
        planos.forEach((src) => {
            const pre = new Image();
            pre.fetchPriority = 'low';
            pre.src = src;
        });
    }

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
// PAGINA DESCRIPCION - planos con cantidad variable
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

    // Si planosCount > 0 usa los reales; si 0, muestra 4 placeholders
    const imagenes = proyecto.planosCount > 0
        ? rutasPlanos(proyecto.slug, proyecto.planosCount)
        : placeholdersPlanos(4);
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

    function precargar(src) {
        if (!src) return;
        const pre = new Image();
        pre.src = src;
    }

    // capaFrente es la que se ve ahora; capaFondo esta oculta y lista para
    // recibir la siguiente imagen antes de pasar a frente (crossfade real).
    let capaFrente = renderCapaA;
    let capaFondo = renderCapaB;

    if (renderCapaA && renderCapaB) {
        renderCapaA.fetchPriority = 'high';
        renderCapaA.src = imagenes[0];
        renderCapaA.classList.add('render-capa-activa');
        renderCapaB.classList.remove('render-capa-activa');
        pintarIndicadores();
        precargar(imagenes[1]);

        if (renderClickable) {
            renderClickable.addEventListener('click', () => {
                if (indiceImagen === imagenes.length - 1) {
                    const siguiente = (idx + 1) % proyectos.length + 1;
                    window.location.href = `proyecto-video.html?proyecto=${siguiente}`;
                    return;
                }
                indiceImagen += 1;
                capaFondo.src = imagenes[indiceImagen];
                capaFondo.classList.add('render-capa-activa');
                capaFrente.classList.remove('render-capa-activa');
                [capaFrente, capaFondo] = [capaFondo, capaFrente];
                pintarIndicadores();
                precargar(imagenes[indiceImagen + 1]);
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
