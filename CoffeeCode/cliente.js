let carrito = [];
let subtotal = 0;
let iva = 0;
let total = 0;

function mostrarMenuDinamico() {
    const menu = document.getElementById("menuDinamico");

    if (!menu) return;

    menu.innerHTML = "";
    menu.className = "menu-grid";

    productos.forEach(producto => {
        if (producto.disponible === false) return;

        const card = document.createElement("div");

        card.className = "producto-card";

        card.innerHTML = `
            <h3>${producto.nombre}</h3>

            <p class="precio">
                $${producto.precio.toFixed(2)}
            </p>

            <p>
                ${producto.tipo}
            </p>

            <input
                type="number"
                min="1"
                value="1"
                class="cantidad"
                id="cantidad-${producto.id}"
            >

            <button
                type="button"
                onclick="seleccionarProducto(${producto.id})"
            >
                Agregar
            </button>
        `;

        menu.appendChild(card);
    });
}

function seleccionarProducto(id) {
    const input = document.getElementById(`cantidad-${id}`);

    let cantidad = 1;

    if (input) {
        cantidad = Number(input.value);

        if (cantidad < 1 || isNaN(cantidad)) {
            cantidad = 1;
        }
    }

    for (let i = 0; i < cantidad; i++) {
        agregarAlCarrito(id);
    }
}

function mostrarPromociones() {
    const promociones = document.getElementById("promociones");

    if (!promociones) return;

    promociones.innerHTML = `
        <div class="promo-card">
            <h3>10% de descuento</h3>
            <p>
                En compras de $50 o más.
            </p>
        </div>

        <div class="promo-card">
            <h3>Combo Cafetero</h3>
            <p>
                Compra una bebida y un postre.
            </p>
        </div>
    `;
}

function mostrarProductosDisponibles() {
    const lista = document.getElementById("productosDisponibles");

    if (!lista) return;

    lista.innerHTML = "";

    productos.forEach(producto => {
        if (producto.disponible === false) return;

        const div = document.createElement("div");

        div.className = "item-carrito";

        div.innerHTML = `
            <span>${producto.nombre}</span>
            <strong>$${producto.precio.toFixed(2)}</strong>
        `;

        lista.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        alert("Producto no encontrado.");
        return;
    }

    if (producto.disponible === false) {
        alert("Este producto no está disponible.");
        return;
    }

    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            tipo: producto.tipo,
            cantidad: 1
        });
    }

    mostrarCarrito();
    calcularTotal();
}

function mostrarCarrito() {
    const contenedor = document.getElementById("carrito");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <p class="mensaje">
                El carrito está vacío.
            </p>
        `;
        return;
    }

    carrito.forEach(producto => {
        const div = document.createElement("div");

        div.className = "item-carrito";

        div.innerHTML = `
            <div>
                <strong>${producto.nombre}</strong>

                <p>
                    $${producto.precio.toFixed(2)}
                    x ${producto.cantidad}
                </p>

                <p>
                    $${(
                        producto.precio *
                        producto.cantidad
                    ).toFixed(2)}
                </p>
            </div>

            <div>
                <button
                    type="button"
                    onclick="editarCantidad(
                        ${producto.id},
                        ${producto.cantidad + 1}
                    )"
                >
                    +
                </button>

                <button
                    type="button"
                    onclick="editarCantidad(
                        ${producto.id},
                        ${producto.cantidad - 1}
                    )"
                >
                    -
                </button>

                <button
                    type="button"
                    class="eliminar"
                    onclick="eliminarDelCarrito(${producto.id})"
                >
                    X
                </button>
            </div>
        `;

        contenedor.appendChild(div);
    });
}

function editarCantidad(id, cantidad) {
    const producto = carrito.find(p => p.id === id);

    if (!producto) return;

    if (cantidad <= 0) {
        eliminarDelCarrito(id);
        return;
    }

    producto.cantidad = cantidad;

    mostrarCarrito();
    calcularTotal();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);

    mostrarCarrito();
    calcularTotal();
}

function calcularTotal() {
    subtotal = carrito.reduce(
        (acumulado, producto) =>
            acumulado +
            producto.precio *
            producto.cantidad,
        0
    );

    let descuento = 0;

    if (subtotal >= 50) {
        descuento = subtotal * 0.10;
    }

    const subtotalConDescuento = subtotal - descuento;

    iva = subtotalConDescuento * 0.16;

    total = subtotalConDescuento + iva;

    const elementoSubtotal =
        document.getElementById("subtotal");

    const elementoIva =
        document.getElementById("iva");

    const elementoTotal =
        document.getElementById("total");

    if (elementoSubtotal) {
        elementoSubtotal.textContent =
            subtotalConDescuento.toFixed(2);
    }

    if (elementoIva) {
        elementoIva.textContent =
            iva.toFixed(2);
    }

    if (elementoTotal) {
        elementoTotal.textContent =
            total.toFixed(2);
    }
}

function crearEstadoPedido(numero) {
    const lista =
        document.getElementById("listaEstados");

    if (!lista) return;

    const estadoExistente =
        document.getElementById(
            `estadoPedido${numero}`
        );

    if (estadoExistente) return;

    const estado =
        document.createElement("div");

    estado.id =
        `estadoPedido${numero}`;

    estado.className =
        "pedido-card";

    estado.innerHTML = `
        <h3>Pedido #${numero}</h3>

        <div style="
            width: 100%;
            background: #eee;
            height: 10px;
            border-radius: 5px;
            margin-top: 10px;
            overflow: hidden;
        ">
            <div
                id="barra${numero}"
                style="
                    width: 25%;
                    height: 100%;
                    background: #287a3e;
                    transition: width 0.5s ease;
                "
            ></div>
        </div>

        <p
            id="texto${numero}"
            style="
                font-weight: bold;
                margin-top: 10px;
            "
        >
            Estado: Pedido recibido
        </p>
    `;

    lista.prepend(estado);
}

async function estadoPedido(numero) {
    const barra = document.getElementById(`barra${numero}`);
    const texto = document.getElementById(`texto${numero}`);

    if (!barra || !texto) return;

    texto.textContent = "Estado: Pedido recibido";
    barra.style.width = "25%";
    await esperarTiempo(5000);

    texto.textContent = "Estado: Preparando";
    barra.style.width = "50%";
    await esperarTiempo(5000);

    texto.textContent = "Estado: Empacando";
    barra.style.width = "75%";
    await esperarTiempo(5000);

    texto.textContent = "Estado: Pedido entregado";
    barra.style.width = "100%";
    await esperarTiempo(5000);
}

function esperarTiempo(tiempo) {
    return new Promise(resolve => {
        setTimeout(resolve, tiempo);
    });
}

function actualizarVistasCliente() {
    mostrarMenuDinamico();
    mostrarPromociones();
    mostrarProductosDisponibles();
    mostrarCarrito();
    calcularTotal();
}

document.addEventListener(
    "DOMContentLoaded",
    function() {
        actualizarVistasCliente();
    }
);