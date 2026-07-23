// ===== Carrusel 3D de tarjetas (proyecto-video.html) =====
const tarjetasTrack = document.getElementById('tarjetasTrack');
const carruselIndicadores = document.getElementById('carruselIndicadores');
const nombreProyecto = document.getElementById('nombreProyecto');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// Imagenes de ciudades como PRUEBA. Cuando tengas los videos del cliente,
// cambiamos "img" por "video" con la ruta real.
const listaTarjetas = [
    { img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop', ciudad: 'Paris', pais: 'Francia' },
    { img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop', ciudad: 'Tokyo', pais: 'Japon' },
    { img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop', ciudad: 'New York', pais: 'Estados Unidos' },
    { img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop', ciudad: 'Estambul', pais: 'Turquia' }
];

const TIEMPO_AUTO_AVANCE = 4000; // ms entre cada cambio automatico
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

// Avance automatico: siempre hace loop, nunca redirige
function avanzarAutomatico() {
    indiceActivo = (indiceActivo + 1) % listaTarjetas.length;
    actualizarPosiciones();
}

function reiniciarTemporizador() {
    clearInterval(intervaloAuto);
    intervaloAuto = setInterval(avanzarAutomatico, TIEMPO_AUTO_AVANCE);
}

// Flecha manual: retroceder (con loop, nunca redirige)
if (btnAnterior) {
    btnAnterior.addEventListener('click', () => {
        indiceActivo = (indiceActivo - 1 + listaTarjetas.length) % listaTarjetas.length;
        actualizarPosiciones();
        reiniciarTemporizador();
    });
}

// Flecha manual: avanzar. Si estamos en el ultimo proyecto, redirige a la pagina de renders
if (btnSiguiente) {
    btnSiguiente.addEventListener('click', () => {
        const esUltimoProyecto = indiceActivo === listaTarjetas.length - 1;

        if (esUltimoProyecto) {
            window.location.href = 'proyecto-renders.html';
        } else {
            indiceActivo = indiceActivo + 1;
            actualizarPosiciones();
            reiniciarTemporizador();
        }
    });
}

// Inicializa el carrusel
if (tarjetasTrack) {
    crearTarjetasInicial();
    actualizarPosiciones();
    reiniciarTemporizador();
}