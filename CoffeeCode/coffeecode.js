let productos = [
    {
        id: 1,
        nombre: "Café Americano",
        precio: 35
    },
    {
        id: 2,
        nombre: "Capuchino",
        precio: 45
    },
    {
        id: 3,
        nombre: "Latte",
        precio: 50
    },
    {
        id: 4,
        nombre: "Moka",
        precio: 55
    },
    {
        id: 5,
        nombre: "Chocolate Caliente",
        precio: 45
    },
    {
        id: 6,
        nombre: "Té Chai",
        precio: 40
    },
    {
        id: 7,
        nombre: "Croissant",
        precio: 35
    },
    {
        id: 8,
        nombre: "Cheesecake",
        precio: 60
    },
    {
        id: 9,
        nombre: "Galleta de Chocolate",
        precio: 25
    },
    {
        id: 10,
        nombre: "Brownie",
        precio: 40
    }
];

let carrito = [];
let pedidos = [];
let total = 0;

function listarProductos() {
    const tabla = document.getElementById("tablaProductos");

    tabla.innerHTML = "";

    productos.forEach(producto => {
        tabla.innerHTML += `
            <tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>
                    <button
                        onclick="eliminarProducto(${producto.id})"
                        class="eliminar">
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

    if (!id || !nombre || precio <= 0) {
        alert("Completa todos los campos.");
        return;
    }

    const existe = productos.some(producto => producto.id === id);

    if (existe) {
        alert("Ya existe un producto con ese ID.");
        return;
    }

    const nuevoProducto = {
        id: id,
        nombre: nombre,
        precio: precio
    };

    productos.push(nuevoProducto);

    limpiarFormulario();
    listarProductos();
    cargarMenuCliente();
}

function editarProducto() {
    const id = Number(document.getElementById("id").value);
    const producto = productos.find(producto => producto.id === id);

    if (!producto) {
        alert("No existe un producto con ese ID.");
        return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const precio = Number(document.getElementById("precio").value);

    if (nombre) {
        producto.nombre = nombre;
    }

    if (precio > 0) {
        producto.precio = precio;
    }

    limpiarFormulario();
    listarProductos();
    cargarMenuCliente();

    alert("Producto editado correctamente.");
}

function eliminarProducto(id) {
    productos = productos.filter(producto => producto.id !== id);

    carrito = carrito.filter(producto => producto.id !== id);

    calcularTotal();
    mostrarCarrito();
    listarProductos();
    cargarMenuCliente();
}

function cargarMenuCliente() {
    const menu = document.getElementById("menuCliente");

    menu.innerHTML = "";

    productos.forEach(producto => {
        menu.innerHTML += `
            <div class="producto">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
                <input
                    type="number"
                    id="cantidad-${producto.id}"
                    min="1"
                    value="1"
                    class="cantidad">
                <br>
                <button onclick="agregarAlCarrito(${producto.id})">
                    Agregar
                </button>
            </div>
        `;
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(producto => producto.id === id);
    const cantidadInput = document.getElementById(`cantidad-${id}`);
    const cantidad = Number(cantidadInput.value);

    if (!producto) {
        alert("Producto no encontrado.");
        return;
    }

    if (cantidad <= 0) {
        alert("La cantidad debe ser mayor a 0.");
        return;
    }

    const productoCarrito = carrito.find(item => item.id === id);

    if (productoCarrito) {
        productoCarrito.cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad
        });
    }

    mostrarCarrito();
    calcularTotal();

    console.log(
        `Producto agregado: ${producto.nombre} x${cantidad}`
    );
}

function mostrarCarrito() {
    const carritoHTML = document.getElementById("carrito");

    carritoHTML.innerHTML = "";

    if (carrito.length === 0) {
        carritoHTML.innerHTML = `
            <div class="mensaje">
                No hay productos seleccionados.
            </div>
        `;
        return;
    }

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;

        carritoHTML.innerHTML += `
            <div class="item-carrito">
                <div>
                    <strong>${producto.nombre}</strong>
                    <br>
                    $${producto.precio.toFixed(2)} x
                    <input
                        type="number"
                        min="1"
                        value="${producto.cantidad}"
                        class="cantidad"
                        onchange="editarCantidad(${producto.id}, this.value)">
                    =
                    $${subtotal.toFixed(2)}
                </div>
                <button
                    onclick="eliminarDelCarrito(${producto.id})"
                    class="eliminar">
                    Eliminar
                </button>
            </div>
        `;
    });
}

function editarCantidad(id, nuevaCantidad) {
    const producto = carrito.find(item => item.id === id);

    if (!producto) {
        return;
    }

    nuevaCantidad = Number(nuevaCantidad);

    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(id);
        return;
    }

    producto.cantidad = nuevaCantidad;

    calcularTotal();
    mostrarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);

    calcularTotal();
    mostrarCarrito();
}

function calcularTotal() {
    total = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });

    document.getElementById("total").textContent = total.toFixed(2);
}

function hacerPedido() {
    if (carrito.length === 0) {
        alert("Agrega productos antes de hacer el pedido.");
        return;
    }

    const nuevoPedido = {
        numero: pedidos.length + 1,
        productos: [...carrito],
        total: total
    };

    pedidos.push(nuevoPedido);

    console.log("----- PEDIDO CREADO -----");
    console.log(`Pedido #${nuevoPedido.numero}`);

    nuevoPedido.productos.forEach(producto => {
        console.log(
            `${producto.nombre} x${producto.cantidad} - $${(
                producto.precio * producto.cantidad
            ).toFixed(2)}`
        );
    });

    console.log(`Total: $${nuevoPedido.total.toFixed(2)}`);

    carrito = [];
    total = 0;

    mostrarCarrito();
    calcularTotal();
    listarPedidos();

    alert(`Pedido #${nuevoPedido.numero} realizado correctamente.`);
}

function listarPedidos() {
    const lista = document.getElementById("listaPedidos");

    lista.innerHTML = "";

    if (pedidos.length === 0) {
        lista.innerHTML = `
            <div class="mensaje">
                No hay pedidos realizados.
            </div>
        `;
        return;
    }

    pedidos.forEach(pedido => {
        lista.innerHTML += `
            <div class="pedido">
                <h3>Pedido #${pedido.numero}</h3>
        `;

        pedido.productos.forEach(producto => {
            lista.innerHTML += `
                <p>
                    ${producto.nombre}
                    x${producto.cantidad}
                    - $${(
                        producto.precio * producto.cantidad
                    ).toFixed(2)}
                </p>
            `;
        });

        lista.innerHTML += `
                <strong>Total: $${pedido.total.toFixed(2)}</strong>
            </div>
        `;
    });
}

function consultarProductos() {
    console.log("----- MENÚ DE COFFEE CODE -----");

    productos.forEach(producto => {
        console.log(
            `${producto.id}. ${producto.nombre} - $${producto.precio.toFixed(2)}`
        );
    });
}

function listarPedidosConsola() {
    console.log("----- PEDIDOS -----");

    pedidos.forEach(pedido => {
        console.log(`Pedido #${pedido.numero}`);

        pedido.productos.forEach(producto => {
            console.log(
                `${producto.nombre} x${producto.cantidad} - $${(
                    producto.precio * producto.cantidad
                ).toFixed(2)}`
            );
        });

        console.log(`Total: $${pedido.total.toFixed(2)}`);
    });
}

function limpiarFormulario() {
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
}

listarProductos();
cargarMenuCliente();
mostrarCarrito();
calcularTotal();
listarPedidos();
consultarProductos();