// Obtener elementos del DOM
const enlacesMenu = document.querySelectorAll("nav ul li a");
const productos = document.querySelectorAll(".productos li");
const carritoProductos = document.querySelector(".productos-carrito");
const totalPrecio = document.getElementById("total-precio");
const cantidadCarrito = document.getElementById("cantidad-carrito");
const vaciarCarritoBtn = document.querySelector(".vaciar-carrito");
const finalizarCompraBtn = document.querySelector(".finalizar-compra");
const seccionCarrito = document.getElementById("carrito");

// Variables para el carrito
let carrito = [];

// Mostrar/ocultar secciones del menú
enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        const seccionObjetivo = document.getElementById(enlace.hash);
        if (seccionObjetivo) {
            seccionObjetivo.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Agregar productos al carrito
productos.forEach(producto => {
    const botonAgregar = producto.querySelector(".agregar-carrito");
    botonAgregar.addEventListener("click", () => {
        const idProducto = producto.dataset.id;
        const nombreProducto = producto.querySelector("h4").textContent;
        const precioProducto = parseFloat(producto.querySelector(".precio").textContent);

        // Buscar el producto en el carrito
        const productoEnCarrito = carrito.find(producto => producto.id === idProducto);

        // Si el producto no está en el carrito, agregarlo
        if (!productoEnCarrito) {
            carrito.push({
                id: idProducto,
                nombre: nombreProducto,
                precio: precioProducto,
                cantidad: 1
            });

            // Mostrar el producto en el carrito
            const nuevoProductoCarrito = document.createElement("li");
            nuevoProductoCarrito.innerHTML = `
                <p>${nombreProducto} x 1 - S/. <span class="math-inline">\{precioProducto\.toFixed\(2\)\}</p\>
<button class\="eliminar\-producto" data\-id\="</span>{idProducto}">Eliminar</button>
            `;
            carritoProductos.appendChild(nuevoProductoCarrito);

            // Actualizar la cantidad en el carrito
            cantidadCarrito.textContent = carrito.length;

            // Actualizar el precio total
            actualizarTotalPrecio();
        } else {
            // Si el producto ya está en el carrito, aumentar la cantidad
            productoEnCarrito.cantidad++;

            // Actualizar la cantidad en el carrito
            const productoCarrito = carritoProductos.querySelector(`[data-id="${idProducto}"] p`);
            productoCarrito.textContent = `${nombreProducto} x ${productoEnCarrito.cantidad} - S/. ${(productoEnCarrito.cantidad * precioProducto).toFixed(2)}`;

            // Actualizar el precio total
            actualizarTotalPrecio();
        }
    });
});

// Eliminar productos del carrito
carritoProductos.addEventListener("click", (event) => {
    if (event.target.classList.contains("eliminar-producto")) {
        const idProducto = event.target.dataset.id;

        // Buscar el producto en el carrito
        const indiceProducto = carrito.findIndex(producto => producto.id === idProducto);

        // Eliminar el producto del array del carrito
        carrito.splice(indiceProducto, 1);

        // Eliminar el producto del HTML del carrito
        const productoCarrito = event.target.parentNode;
        productoCarrito.remove();

        // Actualizar la cantidad en el carrito
        cantidadCarrito.textContent = carrito.length;

        // Actualizar el precio total
        actualizarTotalPrecio();
    }
});

// Vaciar el carrito
vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    carritoProductos.innerHTML = "";
    cantidadCarrito.textContent = 0;
    totalPrecio.textContent = "S/. 0.00";
});

// Finalizar compra (simulación)
finalizarCompraBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos para continuar.");
        return;
    }

    alert("¡Gracias por tu compra! Tu pedido está siendo procesado.");

    // Vaciar el carrito después de la compra simulada
    vaciarCarritoBtn.click();
});

// Función para actualizar el precio total
function actualizarTotalPrecio() {
    let precioTotal = 0;
    carrito.forEach(producto => {
        precioTotal += producto.precio * producto.cantidad;

