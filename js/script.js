// =====================================================
// CARRUSEL 3D DE TARJETAS (proyecto-video.html)
// =====================================================
const tarjetasTrack = document.getElementById('tarjetasTrack');
const carruselIndicadores = document.getElementById('carruselIndicadores');
const nombreProyecto = document.getElementById('nombreProyecto');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

const listaTarjetas = [
    { img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop', ciudad: 'Paris', pais: 'Francia' },
    { img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop', ciudad: 'Tokyo', pais: 'Japon' },
    { img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop', ciudad: 'New York', pais: 'Estados Unidos' },
    { img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop', ciudad: 'Estambul', pais: 'Turquia' }
];

const TIEMPO_AUTO_AVANCE = 4000;
let indiceActivo = 0;
let elementosTarjetas = [];
let intervaloAuto = null;

function calcularOffset(indice) {
    const total = listaTarjetas.length;
    let diferencia = indice - indiceActivo;
    if (diferencia > total / 2) diferencia -= total;
    if (diferencia < -total / 2) diferencia += total;
    return diferencia;
}

function crearTarjetasInicial() {
    if (!tarjetasTrack) return;
    tarjetasTrack.innerHTML = '';
    elementosTarjetas = [];

    listaTarjetas.forEach((tarjeta) => {
        const div = document.createElement('div');
        div.classList.add('tarjeta');
        div.style.backgroundImage = `url('${tarjeta.img}')`;
        div.innerHTML = `
            <div class="tarjeta-info">
                <div class="tarjeta-ciudad">${tarjeta.ciudad}</div>
                <div class="tarjeta-pais">${tarjeta.pais}</div>
            </div>
        `;
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

    actualizarIndicadores();
    actualizarTitulo();
}

function actualizarIndicadores() {
    if (!carruselIndicadores) return;
    carruselIndicadores.innerHTML = '';
    listaTarjetas.forEach((_, i) => {
        const punto = document.createElement('div');
        punto.classList.add('punto');
        if (i === indiceActivo) punto.classList.add('activo');
        carruselIndicadores.appendChild(punto);
    });
}

function actualizarTitulo() {
    if (!nombreProyecto) return;
    nombreProyecto.textContent = `Proyecto ${indiceActivo + 1}`;
}

function avanzarAutomatico() {
    indiceActivo = (indiceActivo + 1) % listaTarjetas.length;
    actualizarPosiciones();
}

function reiniciarTemporizador() {
    clearInterval(intervaloAuto);
    intervaloAuto = setInterval(avanzarAutomatico, TIEMPO_AUTO_AVANCE);
}

if (btnAnterior) {
    btnAnterior.addEventListener('click', () => {
        indiceActivo = (indiceActivo - 1 + listaTarjetas.length) % listaTarjetas.length;
        actualizarPosiciones();
        reiniciarTemporizador();
    });
}

if (btnSiguiente) {
    btnSiguiente.addEventListener('click', () => {
        const esUltimoProyecto = indiceActivo === listaTarjetas.length - 1;

        if (esUltimoProyecto) {
            window.location.href = 'proyecto-descripcion.html';
        } else {
            indiceActivo = indiceActivo + 1;
            actualizarPosiciones();
            reiniciarTemporizador();
        }
    });
}

if (tarjetasTrack) {
    crearTarjetasInicial();
    actualizarPosiciones();
    reiniciarTemporizador();
}


// =====================================================
// TEXTO ANIMADO TIPO "ESCRIBIENDOSE A MANO" (proyecto-renders.html, sin uso por ahora)
// =====================================================
const textoAnimado = document.getElementById('textoAnimado');
const frase = '"I connect with everything but I\'m not attached to anything"';

if (textoAnimado) {
    let i = 0;
    function escribirTexto() {
        if (i < frase.length) {
            textoAnimado.textContent += frase.charAt(i);
            i++;
            setTimeout(escribirTexto, 60);
        }
    }
    escribirTexto();
}

const renderPrincipal = document.getElementById('renderPrincipal');
const listaRenders = [
    'img/render1.jpg',
    'img/plano1.jpg',
    'img/render2.jpg',
    'img/plano2.jpg'
];
let indiceRender = 0;

if (renderPrincipal) {
    setInterval(() => {
        indiceRender = (indiceRender + 1) % listaRenders.length;
        renderPrincipal.style.opacity = 0;
        setTimeout(() => {
            renderPrincipal.src = listaRenders[indiceRender];
            renderPrincipal.style.opacity = 1;
        }, 300);
    }, 3000);
}


// =====================================================
// ANIMACION DE ESCRITURA A MANO REAL, con Vara.js (proyecto-descripcion.html)
// =====================================================
const idsFrases = ['frase-0', 'frase-1', 'frase-2', 'frase-3'];
const fraseConSaltos = '"I connect with\neverything but\nI\'m not attached\nto anything"';

idsFrases.forEach((id, indice) => {
    const contenedor = document.getElementById(id);
    if (!contenedor) return;

    setTimeout(() => {
        new Vara(
            `#${id}`,
            'https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json',
            [
                {
                    text: fraseConSaltos,
                    fontSize: 22,
                    strokeWidth: 1,
                    color: '#1B3A6B',
                    duration: 1800
                }
            ]
        );
    }, indice * 500);
});


// =====================================================
// CARRUSEL DE IMAGENES POR CLICK + INDICADORES (proyecto-descripcion.html)
// =====================================================
const renderDescripcion = document.getElementById('renderDescripcion');
const renderClickable = document.getElementById('renderClickable');
const descripcionIndicadores = document.getElementById('descripcionIndicadores');

const listaRendersDescripcion = [
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop'
];

let indiceRenderDescripcion = 0;

function actualizarIndicadoresDescripcion() {
    if (!descripcionIndicadores) return;
    descripcionIndicadores.innerHTML = '';
    listaRendersDescripcion.forEach((_, i) => {
        const punto = document.createElement('div');
        punto.classList.add('punto');
        if (i === indiceRenderDescripcion) punto.classList.add('activo');
        descripcionIndicadores.appendChild(punto);
    });
}

if (renderDescripcion && renderClickable) {
    actualizarIndicadoresDescripcion();

    renderClickable.addEventListener('click', () => {
        indiceRenderDescripcion = (indiceRenderDescripcion + 1) % listaRendersDescripcion.length;
        renderDescripcion.style.opacity = 0;
        setTimeout(() => {
            renderDescripcion.src = listaRendersDescripcion[indiceRenderDescripcion];
            renderDescripcion.style.opacity = 1;
            actualizarIndicadoresDescripcion();
        }, 300);
    });
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