const baseUrl = "https://t8-2021630254-a.azurewebsites.net/api";

async function agregarArticulo(data) {
    const response = await fetch(`${baseUrl}/AgregarArticulo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}

async function buscarArticulos(data) {
    const response = await fetch(`${baseUrl}/BuscarArticulos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}

async function comprarArticulo(data) {
    const response = await fetch(`${baseUrl}/ComprarArticulo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}
