document.getElementById("formBusqueda").addEventListener("submit", async (event) => {
    event.preventDefault();

    const palabraClave = document.getElementById("palabraClave").value;

    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "<p>Buscando...</p>";

    try {
        const articulos = await buscarArticulos(palabraClave);
        if (articulos.length === 0) {
            resultadosDiv.innerHTML = "<p>No se encontraron artículos.</p>";
            return;
        }

        resultadosDiv.innerHTML = "";
        articulos.forEach((articulo) => {
            const card = document.createElement("div");
            card.className = "card mb-3";
            card.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="data:image/jpeg;base64,${articulo.foto}" class="img-fluid rounded-start" alt="${articulo.nombre}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${articulo.nombre}</h5>
                            <p class="card-text">${articulo.descripcion}</p>
                            <p class="card-text">Precio: $${articulo.precio}</p>
                            <div class="input-group mb-3">
                                <input type="number" class="form-control" value="1" min="1" id="cantidad-${articulo.id_articulo}">
                                <button class="btn btn-success" onclick="comprar(${articulo.id_articulo})">Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            resultadosDiv.appendChild(card);
        });
    } catch (error) {
        console.error("Error al buscar artículos:", error);
        resultadosDiv.innerHTML = "<p>Error al buscar artículos.</p>";
    }
});


async function comprar(idArticulo) {
    const cantidad = parseInt(document.getElementById(`cantidad-${idArticulo}`).value);
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("La cantidad debe ser un número positivo.");
        return;
    }

    const response = await comprarArticulo({ idArticulo, cantidad });
    if (response.message) {
        alert(response.message);
    } else {
        console.error("Error en la respuesta del servidor:", response);
        alert("Ocurrió un error al procesar la compra.");
    }
}

