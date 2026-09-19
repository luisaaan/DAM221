const pedidos = [];
let total = 0;

function agregarPedido() {

    let producto = document.getElementById("producto").value;
    let precio = Number(document.getElementById("precio").value);

    pedidos.push(producto);

    total = total + precio;

    document.getElementById("lista").innerHTML +=
        "<p>" + producto + " - $" + precio + "</p>";

    document.getElementById("total").textContent = total;
}