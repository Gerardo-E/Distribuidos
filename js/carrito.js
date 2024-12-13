async function cargarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    carritoDiv.innerHTML = "<p>Cargando artículos en el carrito...</p>";

    try {
        const response = await fetch(`${baseUrl}/VerCarrito`, {
            method: "GET",
        });
        const carrito = await response.json();

        if (carrito.length === 0) {
            carritoDiv.innerHTML = "<p>El carrito está vacío.</p>";
            return;
        }

        carritoDiv.innerHTML = "";
        let total = 0;

        carrito.forEach((item) => {
            const costo = item.cantidad * item.precio;
            total += costo;

            const card = document.createElement("div");
            card.className = "card mb-3";
            card.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="data:image/jpeg;base64,${item.foto}" class="img-fluid rounded-start" alt="${item.nombre}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text">Cantidad: ${item.cantidad}</p>
                            <p class="card-text">Precio: $${item.precio}</p>
                            <p class="card-text">Costo: $${costo}</p>
                            <button class="btn btn-danger" onclick="eliminarArticulo(${item.id_articulo})">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
            carritoDiv.appendChild(card);
        });

        const totalDiv = document.createElement("div");
        totalDiv.innerHTML = `<h4>Total: $${total}</h4>`;
        carritoDiv.appendChild(totalDiv);
    } catch (error) {
        console.error("Error al cargar el carrito:", error);
        carritoDiv.innerHTML = "<p>Error al cargar el carrito.</p>";
    }
}

async function eliminarArticulo(idArticulo) {
    try {
        const response = await fetch(`${baseUrl}/EliminarArticuloCarrito`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_articulo: idArticulo }),
        });
        const result = await response.json();
        alert(result.message);
        cargarCarrito();
    } catch (error) {
        console.error("Error al eliminar el artículo:", error);
    }
}

document.getElementById("vaciarCarrito").addEventListener("click", async () => {
    try {
        const response = await fetch(`${baseUrl}/EliminarCarrito`, {
            method: "POST",
        });
        const result = await response.json();
        alert(result.message);
        cargarCarrito();
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
    }
});

// Cargar carrito al abrir la página
cargarCarrito();
