let productos = [
    {
        id: 1,
        nombre: "Espresso",
        precio: 35,
        tipo: "bebida",
        disponible: true
    },
    {
        id: 2,
        nombre: "Capuchino",
        precio: 45,
        tipo: "bebida",
        disponible: true
    },
    {
        id: 3,
        nombre: "Latte",
        precio: 50,
        tipo: "bebida",
        disponible: true
    },
    {
        id: 4,
        nombre: "Americano",
        precio: 30,
        tipo: "bebida",
        disponible: true
    },
    {
        id: 5,
        nombre: "Mocha",
        precio: 55,
        tipo: "bebida",
        disponible: true
    },
    {
        id: 6,
        nombre: "Cheesecake",
        precio: 45,
        tipo: "postre",
        disponible: true
    },
    {
        id: 7,
        nombre: "Brownie",
        precio: 35,
        tipo: "postre",
        disponible: true
    },
    {
        id: 8,
        nombre: "Galleta",
        precio: 25,
        tipo: "postre",
        disponible: true
    },
    {
        id: 9,
        nombre: "Pastel de chocolate",
        precio: 50,
        tipo: "postre",
        disponible: true
    },
    {
        id: 10,
        nombre: "Croissant",
        precio: 40,
        tipo: "postre",
        disponible: true
    }
];

function mostrarProductos(lista) {
    const tabla = document.getElementById("tablaProductos");

    if (!tabla) return;

    tabla.innerHTML = "";

    lista.forEach(producto => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.tipo}</td>
            <td>
                <button type="button" onclick="seleccionarParaEditar(${producto.id})">
                    Editar
                </button>
                <button type="button" class="eliminar" onclick="eliminarProducto(${producto.id})">
                    Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}

function listarProductos() {
    mostrarProductos(productos);
}

function buscarProducto() {
    const id = Number(document.getElementById("buscarId").value);

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        alert("Producto no encontrado.");
        return;
    }

    mostrarProductos([producto]);
}

function productosBaratos() {
    mostrarProductos(productos.filter(p => p.precio <= 40));
}

function productosCaros() {
    mostrarProductos(productos.filter(p => p.precio > 40));
}

function filtrarBebidas() {
    mostrarProductos(productos.filter(p => p.tipo === "bebida"));
}

function filtrarPostres() {
    mostrarProductos(productos.filter(p => p.tipo === "postre"));
}

function agregarProducto() {
    const id = Number(document.getElementById("id").value);
    const nombre = document.getElementById("nombre").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const tipo = document.getElementById("tipo").value;

    if (!id || !nombre || !precio) {
        alert("Completa todos los campos.");
        return;
    }

    if (productos.some(p => p.id === id)) {
        alert("Ya existe un producto con ese ID.");
        return;
    }

    productos.push({
        id,
        nombre,
        precio,
        tipo,
        disponible: true
    });

    listarProductos();
    mostrarMenuDinamico();
    mostrarProductosDisponibles();
    limpiarFormulario();

    alert("Producto agregado correctamente.");
}

function editarProducto() {
    const id = Number(document.getElementById("id").value);
    const nombre = document.getElementById("nombre").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const tipo = document.getElementById("tipo").value;

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        alert("Producto no encontrado.");
        return;
    }

    if (nombre) producto.nombre = nombre;
    if (precio) producto.precio = precio;

    producto.tipo = tipo;

    listarProductos();
    mostrarMenuDinamico();
    mostrarProductosDisponibles();
    limpiarFormulario();

    alert("Producto actualizado correctamente.");
}

function seleccionarParaEditar(id) {
    const producto = productos.find(p => p.id === id);

    if (!producto) return;

    document.getElementById("id").value = producto.id;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("tipo").value = producto.tipo;
}

function eliminarProducto(id) {
    const indice = productos.findIndex(p => p.id === id);

    if (indice === -1) return;

    productos.splice(indice, 1);

    listarProductos();
    mostrarMenuDinamico();
    mostrarProductosDisponibles();

    alert("Producto eliminado correctamente.");
}

function limpiarFormulario() {
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("tipo").value = "bebida";
}

document.addEventListener("DOMContentLoaded", function() {
    listarProductos();
});