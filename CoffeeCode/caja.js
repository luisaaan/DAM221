let pedidos = [];

function hacerPedido() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const nuevoPedido = {
        numero: pedidos.length + 1,
        productos: JSON.parse(
            JSON.stringify(carrito)
        ),
        subtotal: subtotal,
        iva: iva,
        total: total,
        fecha: new Date().toLocaleString()
    };

    pedidos.push(nuevoPedido);

    mostrarPedidos();

    crearEstadoPedido(
        nuevoPedido.numero
    );

    estadoPedido(
        nuevoPedido.numero
    );

    carrito.length = 0;

    mostrarCarrito();

    calcularTotal();

    alert(
        `Pedido #${nuevoPedido.numero} confirmado correctamente.`
    );
}

function mostrarPedidos() {
    const lista =
        document.getElementById(
            "listaPedidos"
        );

    if (!lista) return;

    lista.innerHTML = "";

    pedidos.forEach(pedido => {
        const div =
            document.createElement("div");

        div.className =
            "pedido-card";

        let productosHTML = "";

        pedido.productos.forEach(
            producto => {
                productosHTML += `
                    <p>
                        ${producto.nombre}
                        x ${producto.cantidad}
                    </p>
                `;
            }
        );

        div.innerHTML = `
            <h3>
                Pedido #${pedido.numero}
            </h3>

            <p>
                Fecha: ${pedido.fecha}
            </p>

            <div>
                ${productosHTML}
            </div>

            <p>
                Subtotal:
                $${pedido.subtotal.toFixed(2)}
            </p>

            <p>
                IVA:
                $${pedido.iva.toFixed(2)}
            </p>

            <p>
                <strong>
                    Total:
                    $${pedido.total.toFixed(2)}
                </strong>
            </p>
        `;

        lista.appendChild(div);
    });
}

function listarPedidos() {
    mostrarPedidos();
}