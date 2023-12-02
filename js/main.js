document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    displayGameList();
    displayCart();
}

function displayGameList() {
    fetch('games.json')
        .then(response => response.json())
        .then(games => {
            const gameListDiv = document.getElementById("gameList");

            games.forEach(game => {
                const gameDiv = document.createElement("div");
                gameDiv.classList.add("game");
                gameDiv.innerHTML = `
                    <h3>${game.title}</h3>
                    <p>$${game.price.toFixed(2)}</p>
                    <button onclick="addToCart(${game.id})">Add to Cart</button>
                `;
                gameListDiv.appendChild(gameDiv);
            });
        })
        .catch(error => console.error('Error fetching games:', error));
}

function addToCart(gameId) {
    fetch('games.json')
        .then(response => response.json())
        .then(games => {
            const selectedGame = games.find(game => game.id === gameId);

            if (selectedGame) {
                let cart = getCartFromLocalStorage();
                cart.push(selectedGame);
                updateCartInLocalStorage(cart);
                displayCart();
            }
        })
        .catch(error => console.error('Error fetching games:', error));
}

function displayCart() {
    const cartList = document.getElementById("cartList");
    const totalPriceElement = document.getElementById("totalPrice");

    let cart = getCartFromLocalStorage();

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${item.title} - $${item.price.toFixed(2)}
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartList.appendChild(listItem);
        total += item.price;
    });

    totalPriceElement.textContent = total.toFixed(2);

    const existingButtons = document.querySelectorAll("#cart button");
    existingButtons.forEach(button => button.remove());

    const payButton = document.createElement("button");
    payButton.textContent = "Pagar";
    payButton.onclick = () => {
        Swal.fire({
            title: '¡Gracias por su compra!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    };
    document.getElementById("cart").appendChild(payButton);

    const removeGamesButton = document.createElement("button");
    removeGamesButton.textContent = "Eliminar Juegos";
    removeGamesButton.onclick = removeGamesFromCart;
    document.getElementById("cart").appendChild(removeGamesButton);
}

function removeFromCart(index) {
    let cart = getCartFromLocalStorage();

    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCartInLocalStorage(cart);
        displayCart();
    }
}

function removeGamesFromCart() {
    Swal.fire({
        title: '¿Está seguro?',
        text: "Esta acción eliminará todos los juegos del carrito.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            updateCartInLocalStorage([]);
            displayCart();
        }
    });
}

function getCartFromLocalStorage() {
    const cartString = localStorage.getItem("shoppingCart");
    return cartString ? JSON.parse(cartString) : [];
}

function updateCartInLocalStorage(cart) {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
