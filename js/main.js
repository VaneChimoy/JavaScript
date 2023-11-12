// Predefined list of Nintendo 64 games
const games = [
    { id: 1, title: "Super Mario 64", price: 29.99 },
    { id: 2, title: "The Legend of Zelda: Ocarina of Time", price: 39.99 },
    { id: 3, title: "Mario Kart 64", price: 24.99 },
    { id: 4, title: "GoldenEye 007", price: 19.99 },
    { id: 5, title: "Banjo-Kazooie", price: 34.99 }
];

// Initialize the game list and cart
function initialize() {
    displayGameList();
    displayCart();
}

// Display the list of games
function displayGameList() {
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
}

// Add a game to the cart
function addToCart(gameId) {
    const selectedGame = games.find(game => game.id === gameId);

    if (selectedGame) {
        let cart = getCartFromLocalStorage();
        cart.push(selectedGame);
        updateCartInLocalStorage(cart);
        displayCart();
    }
}

// Display the shopping cart
function displayCart() {
    const cartList = document.getElementById("cartList");
    const totalPriceElement = document.getElementById("totalPrice");

    let cart = getCartFromLocalStorage();

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.title} - $${item.price.toFixed(2)}`;
        cartList.appendChild(listItem);
        total += item.price;
    });

    totalPriceElement.textContent = total.toFixed(2);

    // Clear existing buttons
    const existingButtons = document.querySelectorAll("#cart button");
    existingButtons.forEach(button => button.remove());

    // Add "Pagar" button
    const payButton = document.createElement("button");
    payButton.textContent = "Pagar";
    payButton.onclick = () => {
        // Redirecting to the "thankyou.html" page
        // window.location.href = "thankyou.html";

        // Displaying a thank you message on the same page
        displayThankYouMessage();
    };
    document.getElementById("cart").appendChild(payButton);

    // Add "Eliminar Juegos" button
    const removeGamesButton = document.createElement("button");
    removeGamesButton.textContent = "Eliminar Juegos";
    removeGamesButton.onclick = removeGamesFromCart;
    document.getElementById("cart").appendChild(removeGamesButton);
}

// Display a thank you message on the same page
function displayThankYouMessage() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "<h2>Gracias por su compra</h2>";
}

// Remove all games from the cart
function removeGamesFromCart() {
    updateCartInLocalStorage([]);
    displayCart();
}

// Get the cart from local storage
function getCartFromLocalStorage() {
    const cartString = localStorage.getItem("shoppingCart");
    return cartString ? JSON.parse(cartString) : [];
}

// Update the cart in local storage
function updateCartInLocalStorage(cart) {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Initialize the page
initialize();
