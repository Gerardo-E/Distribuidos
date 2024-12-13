const baseUrl = "https://t8-2021630254-a.azurewebsites.net/api";

// Agregar artículo
async function agregarArticulo(data) {
    try {
        const response = await fetch(`${baseUrl}/AgregarArticulo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error al agregar artículo: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error en agregarArticulo:", error);
        throw error;
    }
}

// Buscar artículos
async function buscarArticulos(keyword) {
    try {
        const response = await fetch(`${baseUrl}/BuscarArticulos?keyword=${encodeURIComponent(keyword)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error(`Error al buscar artículos: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error en buscarArticulos:", error);
        throw error;
    }
}

// Comprar artículo
async function comprarArticulo(data) {
    try {
        const response = await fetch(`${baseUrl}/ComprarArticulo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error al comprar artículo: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error en comprarArticulo:", error);
        throw error;
    }
}

// Eliminar artículo del carrito
async function eliminarArticuloCarrito(idArticulo) {
    try {
        const response = await fetch(`${baseUrl}/EliminarArticuloCarrito`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idArticulo }),
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar artículo del carrito: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error en eliminarArticuloCarrito:", error);
        throw error;
    }
}

// Eliminar todo el carrito
async function eliminarCarrito() {
    try {
        const response = await fetch(`${baseUrl}/EliminarCarrito`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar el carrito: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error en eliminarCarrito:", error);
        throw error;
    }
}

// Manejo de errores global para todas las funciones
function handleApiError(error) {
    console.error("Error al interactuar con la API:", error);
    alert("Ocurrió un error al interactuar con la API. Por favor, revisa los registros.");
}
