const proyectos = [
    {
        titulo: 'Proyecto 1',
        descripcion: 'Blending Scandinavian minimalism with biophilic elements, this design transforms an urban apartment into a serene sanctuary defined by warm whites, soft sage green, light oak, and matte black accents. Low-profile modular furniture, sheer linen textiles, and natural greenery create a deeply tranquil, light-filled home.',
        imagenes: [
            'https://picsum.photos/seed/manzur-p1-1/1200/740',
            'https://picsum.photos/seed/manzur-p1-2/1200/740',
            'https://picsum.photos/seed/manzur-p1-3/1200/740',
            'https://picsum.photos/seed/manzur-p1-4/1200/740'
        ]
    },
    {
        titulo: 'Proyecto 2',
        descripcion: 'A compact studio reimagined around light and flow, where floating oak volumes, warm plaster walls, and concealed storage carve calm, generous space out of a modest footprint. Every surface earns its place.',
        imagenes: [
            'https://picsum.photos/seed/manzur-p2-1/1200/740',
            'https://picsum.photos/seed/manzur-p2-2/1200/740',
            'https://picsum.photos/seed/manzur-p2-3/1200/740',
            'https://picsum.photos/seed/manzur-p2-4/1200/740'
        ]
    },
    {
        titulo: 'Proyecto 3',
        descripcion: 'A family home organized around a central courtyard, pairing exposed concrete with warm timber and deep green textiles to balance rawness with everyday comfort. Light moves through the house all day long.',
        imagenes: [
            'https://picsum.photos/seed/manzur-p3-1/1200/740',
            'https://picsum.photos/seed/manzur-p3-2/1200/740',
            'https://picsum.photos/seed/manzur-p3-3/1200/740',
            'https://picsum.photos/seed/manzur-p3-4/1200/740'
        ]
    },
    {
        titulo: 'Proyecto 4',
        descripcion: 'A boutique workspace where matte black steel, fluted glass, and terracotta tones frame a flexible open plan built for focus, conversation, and slow afternoons. Warm, quiet, and unmistakably intentional.',
        imagenes: [
            'https://picsum.photos/seed/manzur-p4-1/1200/740',
            'https://picsum.photos/seed/manzur-p4-2/1200/740',
            'https://picsum.photos/seed/manzur-p4-3/1200/740',
            'https://picsum.photos/seed/manzur-p4-4/1200/740'
        ]
    },
    {
        titulo: 'Proyecto 5',
        descripcion: 'A coastal retreat dressed in lime-washed walls, natural linen, and pale travertine, letting sea light and sheer curtains set the rhythm of every room. A house that breathes with the tide.',
        imagenes: [
            'https://picsum.photos/seed/manzur-p5-1/1200/740',
            'https://picsum.photos/seed/manzur-p5-2/1200/740',
            'https://picsum.photos/seed/manzur-p5-3/1200/740',
            'https://picsum.photos/seed/manzur-p5-4/1200/740'
        ]
    },
    {
        titulo: 'Proyecto 6',
        descripcion: 'A rooftop extension conceived as a glass pavilion, where slim profiles, planted terraces, and layered lighting dissolve the line between interior and sky. The city becomes part of the room.',
        imagenes: [
            'https://picsum.photos/seed/manzur-p6-1/1200/740',
            'https://picsum.photos/seed/manzur-p6-2/1200/740',
            'https://picsum.photos/seed/manzur-p6-3/1200/740',
            'https://picsum.photos/seed/manzur-p6-4/1200/740'
        ]
    }
];

function obtenerIndiceProyecto() {
    const params = new URLSearchParams(window.location.search);
    let n = parseInt(params.get('proyecto'), 10);
    if (isNaN(n)) n = 1;
    n = Math.min(Math.max(n, 1), proyectos.length);
    return n - 1;
}

const tarjetasTrack = document.getElementById('tarjetasTrack');
const nombreProyecto = document.getElementById('nombreProyecto');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

let indiceActivo = obtenerIndiceProyecto();
let elementosTarjetas = [];

function calcularOffset(indice) {
    const total = proyectos.length;
    let diferencia = indice - indiceActivo;
    if (diferencia > total / 2) diferencia -= total;
    if (diferencia < -total / 2) diferencia += total;
    return diferencia;
}

function crearTarjetasInicial() {
    if (!tarjetasTrack) return;
    tarjetasTrack.innerHTML = '';
    elementosTarjetas = [];

    proyectos.forEach((proyecto) => {
        const div = document.createElement('div');
        div.classList.add('tarjeta');
        div.style.backgroundImage = `url('${proyecto.imagenes[0]}')`;
        tarjetasTrack.appendChild(div);
        elementosTarjetas.push(div);
    });
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

    actualizarTitulo();
}

function actualizarTitulo() {
    if (!nombreProyecto) return;
    nombreProyecto.textContent = proyectos[indiceActivo].titulo;
}

if (tarjetasTrack) {
    crearTarjetasInicial();
    actualizarPosiciones();

    tarjetasTrack.addEventListener('click', () => {
        if (nombreProyecto) nombreProyecto.classList.toggle('oculto');
    });

    if (nombreProyecto) {
        nombreProyecto.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = `proyecto-descripcion.html?proyecto=${indiceActivo + 1}`;
        });
    }

    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => {
            indiceActivo = (indiceActivo - 1 + proyectos.length) % proyectos.length;
            actualizarPosiciones();
        });
    }

    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', () => {
            indiceActivo = (indiceActivo + 1) % proyectos.length;
            actualizarPosiciones();
        });
    }
}

const tituloDescripcion = document.getElementById('tituloDescripcion');
const descripcionTexto = document.getElementById('descripcionTexto');
const renderDescripcion = document.getElementById('renderDescripcion');
const renderClickable = document.getElementById('renderClickable');
const descripcionIndicadores = document.getElementById('descripcionIndicadores');
const btnVideoDesc = document.getElementById('btnVideoDesc');
const btnAnteriorDesc = document.getElementById('btnAnteriorDesc');
const btnSiguienteDesc = document.getElementById('btnSiguienteDesc');

if (tituloDescripcion && descripcionTexto) {
    const idx = obtenerIndiceProyecto();
    const total = proyectos.length;
    const proyecto = proyectos[idx];
    const renders = proyecto.imagenes;
    let indiceRender = 0;

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
                indiceRender = (indiceRender + 1) % renders.length;
                renderDescripcion.style.opacity = 0;
                setTimeout(() => {
                    renderDescripcion.src = renders[indiceRender];
                    renderDescripcion.style.opacity = 1;
                    pintarIndicadoresDescripcion();
                }, 300);
            });
        }
    }

    if (btnVideoDesc) {
        btnVideoDesc.href = `proyecto-video.html?proyecto=${idx + 1}`;
    }

    if (btnAnteriorDesc) {
        const anterior = ((idx - 1 + total) % total) + 1;
        btnAnteriorDesc.href = `proyecto-descripcion.html?proyecto=${anterior}`;
    }

    if (btnSiguienteDesc) {
        const esUltimoProyecto = idx === total - 1;
        if (esUltimoProyecto) {
            btnSiguienteDesc.href = 'home.html';
        } else {
            const siguiente = idx + 2;
            btnSiguienteDesc.href = `proyecto-descripcion.html?proyecto=${siguiente}`;
        }
    }
}

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