document.getElementById("formCaptura").addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const foto = document.getElementById("foto").files[0];

    let fotoBase64 = "";
    if (foto) {
        const reader = new FileReader();
        reader.onload = async () => {
            fotoBase64 = reader.result.split(",")[1];

            const response = await agregarArticulo({ nombre, descripcion, precio, cantidad, foto: fotoBase64 });
            document.getElementById("mensaje").innerHTML = `<div class="alert alert-success">${response.message}</div>`;
        };
        reader.readAsDataURL(foto);
    } else {
        const response = await agregarArticulo({ nombre, descripcion, precio, cantidad });
        document.getElementById("mensaje").innerHTML = `<div class="alert alert-success">${response.message}</div>`;
    }
});
