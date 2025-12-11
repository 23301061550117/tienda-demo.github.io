/* --- Misma lógica que tu código original --- */

const productos = [
    /* ------------------- ROPA (10) ------------------- */
    { id: 1, nombre: "Playera Básica Blanca", precio: 249.00, categoria: "ropa", img: "images/playerabasicablanca.jpg" },
    { id: 2, nombre: "Pantalón Slim Fit", precio: 399.00, categoria: "ropa", img: "images/pantalonslimfit.jpg" },
    { id: 3, nombre: "Sudadera Oversize", precio: 499.00, categoria: "ropa", img: "images/sudaderaoversize.jpg" },
    { id: 4, nombre: "Chamarra Deportiva", precio: 699.00, categoria: "ropa", img: "images/chamarradeportiva.jpg" },
    { id: 5, nombre: "Shorts Casual", precio: 199.00, categoria: "ropa", img: "images/shortscasual.jpg" },
    { id: 6, nombre: "Playera Blanca Premium", precio: 299.00, categoria: "ropa", img: "images/playerablancapremium.jpg" },
    { id: 7, nombre: "Sudadera Hoodie Morada", precio: 549.00, categoria: "ropa", img: "images/sudaderahoodie.jpg" },
    { id: 8, nombre: "Joggers Unisex", precio: 329.00, categoria: "ropa", img: "images/joggerunisex.jpg" },
    { id: 9, nombre: "Gorra Urbana", precio: 159.00, categoria: "ropa", img: "images/gorraurbana.jpg" },
    { id: 10, nombre: "Chaqueta de Mezclilla", precio: 799.00, categoria: "ropa", img: "images/chaquetamezclilla.jpg" },

    /* ------------------- ELECTRÓNICA (10) ------------------- */
    { id: 11, nombre: "Teclado Mecánico RGB", precio: 899.00, categoria: "electronica", img: "images_2/tecladorgb.jpg" },
    { id: 12, nombre: "Mouse Gamer 7200 DPI", precio: 350.00, categoria: "electronica", img: "images_2/mousegamer.jpg" },
    { id: 13, nombre: "Audífonos Inalámbricos Pro", precio: 1250.00, categoria: "electronica", img: "images_2/audifonosinalambricos.jpg" },
    { id: 14, nombre: "Cámara Digital HD", precio: 4500.00, categoria: "electronica", img: "images_2/camaradigital.jpg" },
    { id: 15, nombre: "Reloj Inteligente Sport", precio: 999.00, categoria: "electronica", img: "images_2/relojinteligente.jpg" },
    { id: 16, nombre: "Bocina Bluetooth LED", precio: 499.00, categoria: "electronica", img: "images_2/bocinabluetooth.jpg" },
    { id: 17, nombre: "Tablet 10 pulgadas", precio: 3000.00, categoria: "electronica", img: "images_2/tablet.jpg" },
    { id: 18, nombre: "Laptop Ultrabook", precio: 14500.00, categoria: "electronica", img: "images_2/laptopultrabook.jpg" },
    { id: 19, nombre: "Cargador Rápido USB-C", precio: 299.00, categoria: "electronica", img: "images_2/cargador.jpg" },
    { id: 20, nombre: "Webcam Full HD", precio: 600.00, categoria: "electronica", img: "images_2/webcam.jpg" },

    /* ------------------- LIBROS (10) ------------------- */
    { id: 21, nombre: "Libro: Programación en JavaScript", precio: 320.00, categoria: "libros", img: "images_3/libroprogramacion.jpg" },
    { id: 22, nombre: "Libro: Cocina Rápida", precio: 180.00, categoria: "libros", img: "images_3/librococina.jpg" },
    { id: 23, nombre: "Libro: Fantasía Épica", precio: 260.00, categoria: "libros", img: "images_3/librofantasia.jpg" },
    { id: 24, nombre: "Libro: Novela Romántica", precio: 210.00, categoria: "libros", img: "images_3/novelaromantica.jpg" },
    { id: 25, nombre: "Libro: Ciencia Ficción", precio: 250.00, categoria: "libros", img: "images_3/cienciaficcion.jpg" },
    { id: 26, nombre: "Libro: Inteligencia Artificial", precio: 390.00, categoria: "libros", img: "images_3/libro_IA.jpg" },
    { id: 27, nombre: "Libro: Desarrollo Personal", precio: 230.00, categoria: "libros", img: "images_3/librodesarrollo.jpg" },
    { id: 28, nombre: "Libro: Historia Universal", precio: 340.00, categoria: "libros", img: "images_3/librohistoria.jpg" },
    { id: 29, nombre: "Libro: Cuentos Cortos", precio: 150.00, categoria: "libros", img: "images_3/cuentos.jpg" },
    { id: 30, nombre: "Libro: Matemáticas para Todos", precio: 280.00, categoria: "libros", img: "images_3/matematicas.jpg" }
];


let carrito = [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

const catalogoDiv = document.getElementById('catalogo');
const contadorCarrito = document.getElementById('contador-carrito');
const subtotalSpan = document.getElementById('subtotal');
const productosCarritoDiv = document.getElementById('productos-carrito');
const carritoSidebar = document.getElementById('carrito');
const btnCarrito = document.getElementById('btn-carrito');
const btnCerrarCarrito = document.getElementById('cerrar-carrito');

function mostrarProductos(filtro = "todo") {
    catalogoDiv.innerHTML = '';

    const filtrados = 
        filtro === "todo"
        ? productos
        : productos.filter(p => p.categoria === filtro);

    filtrados.forEach(producto => {
        const esFavorito = favoritos.includes(producto.id);

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toFixed(2)}</p>
            <button class="agregar" onclick="agregarCarrito(${producto.id})">Agregar</button>
            <button class="favorito" onclick="toggleFavorito(${producto.id})">
                ${esFavorito ? '❤️' : '🤍'}
            </button>
        `;
        catalogoDiv.appendChild(card);
    });
}

document.querySelectorAll('.filtro').forEach(btn => {
    btn.addEventListener('click', () => mostrarProductos(btn.dataset.categoria));
});

btnCarrito.addEventListener('click', () => carritoSidebar.classList.add('activo'));
btnCerrarCarrito.addEventListener('click', () => carritoSidebar.classList.remove('activo'));

function agregarCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    productosCarritoDiv.innerHTML = '';
    let subtotal = 0;

    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;

        const div = document.createElement('div');
        div.classList.add('producto-carrito');
        div.innerHTML = `
            <img src="${item.img}">
            <div>
                <h4>${item.nombre}</h4>
                <p>$${item.precio.toFixed(2)}</p>
                <div class="controles">
                    <button onclick="modificarCantidad(${item.id}, -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button onclick="modificarCantidad(${item.id}, 1)">+</button>
                    <button onclick="quitarProducto(${item.id})">Quitar</button>
                </div>
            </div>
        `;
        productosCarritoDiv.appendChild(div);
    });

    subtotalSpan.textContent = subtotal.toFixed(2);
    contadorCarrito.textContent = carrito.reduce((a,b) => a+b.cantidad, 0);
}

function modificarCantidad(id, cambio) {
    const producto = carrito.find(p => p.id === id);
    producto.cantidad += cambio;

    if (producto.cantidad <= 0) quitarProducto(id);
    else actualizarCarrito();
}

function quitarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    actualizarCarrito();
}

function toggleFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(f => f !== id);
    } else {
        favoritos.push(id);
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    mostrarProductos();
}

mostrarProductos();
actualizarCarrito();
