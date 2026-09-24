let productos = [
    { id: 1, nombre: "Café Americano", precio: 35, tipo: "bebida" },
    { id: 2, nombre: "Capuchino", precio: 45, tipo: "bebida" },
    { id: 3, nombre: "Latte", precio: 50, tipo: "bebida" },
    { id: 4, nombre: "Moka", precio: 55, tipo: "bebida" },
    { id: 5, nombre: "Chocolate Caliente", precio: 45, tipo: "bebida" },
    { id: 6, nombre: "Té Chai", precio: 40, tipo: "bebida" },
    { id: 7, nombre: "Croissant", precio: 35, tipo: "postre" },
    { id: 8, nombre: "Cheesecake", precio: 60, tipo: "postre" },
    { id: 9, nombre: "Galleta de Chocolate", precio: 25, tipo: "postre" },
    { id: 10, nombre: "Brownie", precio: 40, tipo: "postre" }
];

let carrito = [];
let pedidos = [];
let subtotal = 0;
let iva = 0;
let total = 0;
const TASA_IVA = 0.16;

function listarProductos() {
    const tabla = document.getElementById("tablaProductos");
    if (!tabla) return;
    tabla.innerHTML = "";

    productos.forEach(({ id, nombre, precio, tipo }) => {
        tabla.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${nombre}</td>
                <td>$${precio.toFixed(2)}</td>
                <td>${tipo}</td>
                <td>
                    <button onclick="eliminarProducto(${id})" class="eliminar">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function buscarProducto() {
    const id = Number(document.getElementById("buscarId").value);
    
    if (!id) {
        listarProductos();
        return;
    }

    const producto = productos.find(p => p.id === id);
    const tabla = document.getElementById("tablaProductos");
    if (!tabla) return;
    
    tabla.innerHTML = "";

    if (producto) {
        const { id, nombre, precio, tipo } = producto;
        tabla.innerHTML = `
            <tr>
                <td>${id}</td>
                <td>${nombre}</td>
                <td>$${precio.toFixed(2)}</td>
                <td>${tipo}</td>
                <td>
                    <button onclick="eliminarProducto(${id})" class="eliminar">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    } else {
        tabla.innerHTML = `<tr><td colspan="5" style="text-align:center;">Producto no encontrado</td></tr>`;
    }
}

function productosBaratos() {
    const baratos = productos.filter(p => p.precio <= 40);
    const tabla = document.getElementById("tablaProductos");
    if (!tabla) return;
    
    tabla.innerHTML = "";
    
    if (baratos.length === 0) {
        tabla.innerHTML = `<tr><td colspan="5" style="text-align:center;">No hay productos baratos</td></tr>`;
        return;
    }

    baratos.forEach(({ id, nombre, precio, tipo }) => {
        tabla.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${nombre}</td>
                <td>$${precio.toFixed(2)}</td>
                <td>${tipo}</td>
                <td>
                    <button onclick="eliminarProducto(${id})" class="eliminar">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function productosCaros() {
    const caros = productos.filter(p => p.precio > 40);
    const tabla = document.getElementById("tablaProductos");
    if (!tabla) return;
    
    tabla.innerHTML = "";

    if (caros.length === 0) {
        tabla.innerHTML = `<tr><td colspan="5" style="text-align:center;">No hay productos caros</td></tr>`;
        return;
    }

    caros.forEach(({ id, nombre, precio, tipo }) => {
        tabla.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${nombre}</td>
                <td>$${precio.toFixed(2)}</td>
                <td>${tipo}</td>
                <td>
                    <button onclick="eliminarProducto(${id})" class="eliminar">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function filtrarBebidas() {
    const bebidas = productos.filter(p => p.tipo === "bebida");
    const tabla = document.getElementById("tablaProductos");
    if (!tabla) return;
    
    tabla.innerHTML = "";

    bebidas.forEach(({ id, nombre, precio, tipo }) => {
        tabla.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${nombre}</td>
                <td>$${precio.toFixed(2)}</td>
                <td>${tipo}</td>
                <td>
                    <button onclick="eliminarProducto(${id})" class="eliminar">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function filtrarPostres() {
    const postres = productos.filter(p => p.tipo === "postre");
    const tabla = document.getElementById("tablaProductos");
    if (!tabla) return;
    
    tabla.innerHTML = "";

    postres.forEach(({ id, nombre, precio, tipo }) => {
        tabla.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${nombre}</td>
                <td>$${precio.toFixed(2)}</td>
                <td>${tipo}</td>
                <td>
                    <button onclick="eliminarProducto(${id})" class="eliminar">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function agregarProducto() {
    const id = Number(document.getElementById("id").value);
    const nombre = document.getElementById("nombre").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const tipo = document.getElementById("tipo").value;

    if (!id || !nombre || precio <= 0) {
        alert("Completa todos los campos.");
        return;
    }

    const existe = productos.some(producto => producto.id === id);

    if (existe) {
        alert("Ya existe un producto con ese ID.");
        return;
    }

    productos.push({ id, nombre, precio, tipo });

    limpiarFormulario();
    actualizarVistasCliente();
}

function editarProducto() {
    const id = Number(document.getElementById("id").value);
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        alert("No existe un producto con ese ID.");
        return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const tipo = document.getElementById("tipo").value;

    if (nombre) producto.nombre = nombre;
    if (precio > 0) producto.precio = precio;
    if (tipo) producto.tipo = tipo;

    limpiarFormulario();
    actualizarVistasCliente();

    alert("Producto editado correctamente.");
}

function eliminarProducto(id) {
    productos = productos.filter(producto => producto.id !== id);
    carrito = carrito.filter(producto => producto.id !== id);

    calcularTotal();
    mostrarCarrito();
    actualizarVistasCliente();
}

function limpiarFormulario() {
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    if (document.getElementById("buscarId")) {
        document.getElementById("buscarId").value = "";
    }
}

// ===== FUNCIONES DEL CLIENTE =====

function mostrarMenuDinamico() {
    const menu = document.getElementById("menuCliente");
    if (!menu) return;

    const tarjetasMenu = productos.map(producto => {
        return `
            <div class="producto-card">
                <h3>${producto.nombre}</h3>
                <p><i>(${producto.tipo})</i></p>
                <div class="precio">Precio: $${producto.precio.toFixed(2)}</div>
                <input type="number" id="cantidad-${producto.id}" min="1" value="1" class="cantidad">
                <button onclick="agregarAlCarrito(${producto.id})">
                    Agregar
                </button>
            </div>
        `;
    });

    menu.innerHTML = tarjetasMenu.join("");
}

function seleccionarProducto(nombreProducto) {
    const producto = productos.find(p => p.nombre === nombreProducto);
    if (producto) {
        agregarAlCarrito(producto.id);
    }
}

function mostrarPromociones() {
    const promociones = document.getElementById("promociones");
    if (!promociones) return;

    promociones.innerHTML = "";

    productos.forEach(producto => {
        if (producto.precio >= 50) {
            const descuento = producto.precio * 0.10;
            const precioFinal = producto.precio - descuento;

            promociones.innerHTML += `
                <div class="promo-card">
                    <h3>${producto.nombre}</h3>
                    <p>Precio normal: $${producto.precio.toFixed(2)}</p>
                    <p><strong>10% de descuento</strong></p>
                    <p>Precio final: $${precioFinal.toFixed(2)}</p>
                    <button onclick="seleccionarProducto('${producto.nombre}')">Agregar Promo</button>
                </div>
            `;
        }
    });
}

function mostrarProductosDisponibles() {
    const disponibles = document.getElementById("productosDisponibles");
    if (!disponibles) return;

    disponibles.innerHTML = "";

    productos.forEach(producto => {
        disponibles.innerHTML += `
            <p>
                <strong>ID ${producto.id}:</strong> ${producto.nombre} - $${producto.precio.toFixed(2)}
            </p>
        `;
    });
}

function actualizarVistasCliente() {
    listarProductos();
    mostrarMenuDinamico();
    mostrarPromociones();
    mostrarProductosDisponibles();
}

// ===== GESTIÓN DE CARRITO Y PEDIDOS =====

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const cantidadInput = document.getElementById(`cantidad-${id}`);
    const cantidad = cantidadInput ? Number(cantidadInput.value) : 1;

    if (!producto || cantidad <= 0) return;

    const productoCarrito = carrito.find(item => item.id === id);

    if (productoCarrito) {
        productoCarrito.cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad });
    }

    mostrarCarrito();
    calcularTotal();
}

function mostrarCarrito() {
    const carritoHTML = document.getElementById("carrito");
    if (!carritoHTML) return;

    carritoHTML.innerHTML = "";

    if (carrito.length === 0) {
        carritoHTML.innerHTML = `<div class="mensaje">No hay productos seleccionados.</div>`;
        return;
    }

    carrito.forEach(({ id, nombre, precio, cantidad }) => {
        const subtotalItem = precio * cantidad;
        carritoHTML.innerHTML += `
            <div class="item-carrito">
                <div>
                    <strong>${nombre}</strong><br>
                    $${precio.toFixed(2)} x 
                    <input type="number" min="1" value="${cantidad}" 
                           class="cantidad" style="width:50px;" 
                           onchange="editarCantidad(${id}, this.value)">
                    = $${subtotalItem.toFixed(2)}
                </div>
                <button onclick="eliminarDelCarrito(${id})" class="eliminar">X</button>
            </div>
        `;
    });
}

function editarCantidad(id, nuevaCantidad) {
    const producto = carrito.find(item => item.id === id);
    if (!producto) return;

    nuevaCantidad = Number(nuevaCantidad);
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(id);
    } else {
        producto.cantidad = nuevaCantidad;
        calcularTotal();
        mostrarCarrito();
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    calcularTotal();
    mostrarCarrito();
}

function calcularTotal() {
    subtotal = carrito.reduce((acumulado, { precio, cantidad }) => {
        return acumulado + (precio * cantidad);
    }, 0);

    iva = subtotal * TASA_IVA;
    total = subtotal + iva;

    const elSubtotal = document.getElementById("subtotal");
    const elIva = document.getElementById("iva");
    const elTotal = document.getElementById("total");

    if (elSubtotal) elSubtotal.textContent = subtotal.toFixed(2);
    if (elIva) elIva.textContent = iva.toFixed(2);
    if (elTotal) elTotal.textContent = total.toFixed(2);
}

function hacerPedido() {
    if (carrito.length === 0) {
        alert("Agrega productos antes de realizar el pedido.");
        return;
    }

    const nuevoPedido = {
        numero: pedidos.length + 1,
        productos: [...carrito],
        subtotal: subtotal,
        iva: iva,
        total: total
    };

    pedidos.push(nuevoPedido);

    carrito = [];
    subtotal = 0;
    iva = 0;
    total = 0;

    mostrarCarrito();
    calcularTotal();
    listarPedidos();

    alert(`¡Pedido #${nuevoPedido.numero} realizado con éxito!`);
}

function listarPedidos() {
    const lista = document.getElementById("listaPedidos");
    if (!lista) return;

    lista.innerHTML = "";

    if (pedidos.length === 0) {
        lista.innerHTML = `<div class="mensaje">No hay pedidos realizados.</div>`;
        return;
    }

    pedidos.forEach(({ numero, productos, subtotal, iva, total }) => {
        let itemsHTML = productos.map(({ nombre, cantidad, precio }) => 
            `<p>${nombre} x${cantidad} - $${(precio * cantidad).toFixed(2)}</p>`
        ).join('');

        lista.innerHTML += `
            <div class="pedido-card">
                <h3>Pedido #${numero}</h3>
                ${itemsHTML}
                <p>Subtotal: $${subtotal.toFixed(2)}</p>
                <p>IVA (16%): $${iva.toFixed(2)}</p>
                <strong>Total: $${total.toFixed(2)}</strong>
            </div>
        `;
    });
}

function esperarTiempo(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function estadoPedido() {
    const barra = document.getElementById('barraProgreso');
    const texto = document.getElementById('textoEstado');

    texto.textContent = "Estado: Procesando el pago... 💳";
    barra.style.width = "25%";
    await esperarTiempo(2000);

    texto.textContent = "Estado: Preparando en almacén... 📦";
    barra.style.width = "50%";
    await esperarTiempo(3000);

    texto.textContent = "Estado: En camino con el repartidor... 🛵";
    barra.style.width = "75%";
    await esperarTiempo(3000);

    texto.textContent = "Estado: ¡Pedido entregado con éxito! 🎉";
    barra.style.width = "100%";
}



// Inicialización
actualizarVistasCliente();
mostrarCarrito();
calcularTotal();
listarPedidos();