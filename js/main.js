let username = prompt("Cual es tu nombre?");
alert("Bienvenid@ de vuelta a tu lista de videojuegos, " + username);

const videoGamesList = [];

function mostrarVideojuegos() {
    if (videoGamesList.length === 0) {
        alert("Tu lista de videojuegos está vacía.");
    } else {
        let message = "Tus videojuegos son:\n";
        for (let i = 0; i < videoGamesList.length; i++) {
            message += `${i + 1}. ${videoGamesList[i].nombre} - Precio: ${videoGamesList[i].precio}\n`;
        }
        alert(message);
    }
}

function agregarNuevoVideojuego() {
    const nombre = prompt("Ingresa el nombre del videojuego:");
    const precio = parseFloat(prompt("Ingresa el precio del videojuego:"));
    
    if (!nombre || isNaN(precio)) {
        alert("Ingresa un nombre y precio válidos.");
    } else {
        videoGamesList.push({ nombre, precio });
        alert(`Has agregado "${nombre}" a tu lista de videojuegos.`);
    }
}

function buscarPorRangoDePrecios() {
    const minPrice = parseFloat(prompt("Ingresa el precio mínimo del rango:"));
    const maxPrice = parseFloat(prompt("Ingresa el precio máximo del rango:"));
    
    if (isNaN(minPrice) || isNaN(maxPrice)) {
        alert("Ingresa precios válidos.");
        return;
    }

    const filteredGames = videoGamesList.filter(game => game.precio >= minPrice && game.precio <= maxPrice);
    if (filteredGames.length === 0) {
        alert("No se encontraron juegos en ese rango de precios.");
    } else {
        let message = "Juegos en el rango de precios:\n";
        for (let i = 0; i < filteredGames.length; i++) {
            message += `${i + 1}. ${filteredGames[i].nombre} - Precio: ${filteredGames[i].precio}\n`;
        }
        alert(message);
    }
}

function listaDeOpciones() {
    let opcion;
    do {
        opcion = parseInt(prompt("Menu:\n" + "1. Mostrar lista de videojuegos\n" + "2. Agregar nuevo videojuego\n" + "3. Buscar por rango de precios\n" + "4. Salir"));

        switch (opcion) {
            case 1:
                mostrarVideojuegos();
                break;
            case 2:
                agregarNuevoVideojuego();
                break;
            case 3:
                buscarPorRangoDePrecios();
                break;
            case 4:
                alert("Gracias por usar la lista de videojuegos.");
                break;
            default:
                alert("Opción no válida.");
        }
    } while (opcion !== 4);
}

listaDeOpciones();
