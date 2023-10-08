let username = prompt("Cual es tu nombre?");
alert("Bienvenid@ de vuelta a tu lista de juegos " + username);

let juego1 = "The Legend of Zelda, Tears of the kingdom"
let juego2 = "Killer Instinct"
let juego3 = "Super Smash Bros 64"

function mostrarJuegos(){
    alert(`Tus videojuegos son ${juego1}, ${juego2}, ${juego3}`);
}

function agregarNuevoJuego(nuevoJuego) {
    if (!nuevoJuego){
        alert("Ingresa el nombre de tu juego")
    } else{
        videojuego3 = nuevoJuego
        alert(`Has agregado "${nuevoJuego}" a tu lista`)
    }
    
}

function listaDeOpciones() {
    let opcion;
    do{
        opcion = parseInt(prompt("Menu:\n" + "1. Mostrar lista de juegos\n" + "2. Agregar nuevo juego\n" + "3. Salir"));

switch (opcion){
    case 1:
        mostrarJuegos();
        break;
    case 2:
        let nuevoJuego = prompt("Ingresa l nombre del nuevo juego");
        agregarNuevoJuego(nuevoJuego);
        break;
    case 3:
        alert("Gracias por revisar tu lista");
        break
    default:
        alert("opcion no valida")
}


    } while (opcion !== 3); 
    
} 

listaDeOpciones()
    


