document.addEventListener('DOMContentLoaded', () => {
    const productTableBody = document.getElementById('productTableBody');  // For produits.html
    const cartTableBody = document.getElementById('cartTableBody');  // For panier.html
    const grandTotal = document.getElementById('grandTotal');  // For panier.html
    let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Load cart from localStorage

    // Fetch and display products for produits.html
    if (productTableBody) {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(products => {
                products.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><img src="${product.image}" alt="${product.title}" class="img-fluid" style="max-width: 50px;"></td>
                        <td>${product.title}</td>
                        <td>${product.price} CAD</td>
                        <td><button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">Ajouter</button></td>
                    `;
                    productTableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des produits:', error));
    }

    function showPopupNotification() {
        const popup = document.getElementById('popupNotification');
        popup.classList.add('show');
        
        setTimeout(() => {
            popup.classList.remove('show');
        }, 2000);  // Popup will disappear after 2 seconds
    }
    
    // Update the addToCart function to call showPopupNotification
    window.addToCart = function (productId) {
        const productInCart = cart.find(item => item.id === productId);
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            fetch(`https://fakestoreapi.com/products/${productId}`)
                .then(response => response.json())
                .then(product => {
                    cart.push({
                        id: product.id,
                        name: product.title,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    });
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                    showPopupNotification();  // Show popup when item is added
                })
                .catch(error => console.error('Erreur lors de l\'ajout au panier:', error));
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        showPopupNotification();  // Show popup when item is added
    };
    

    // Function to display the cart on panier.html
    function updateCart() {
        if (!cartTableBody) return;  // Check if on panier.html
    
        cartTableBody.innerHTML = '';  // Clear current cart display
        let total = 0;
    
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
    
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" class="img-fluid" style="max-width: 50px;"></td>
                <td>${item.name}</td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="decreaseQuantity(${item.id})">-</button>
                    ${item.quantity}
                    <button class="btn btn-sm btn-secondary" onclick="increaseQuantity(${item.id})">+</button>
                </td>
                <td>${item.price} CAD</td>
                <td>${itemTotal.toFixed(2)} CAD</td>
            `;
            cartTableBody.appendChild(row);
        });
    
        grandTotal.textContent = `${total.toFixed(2)} CAD`;
        localStorage.setItem('cart', JSON.stringify(cart));  // Update local storage
    }
    

    // Increase quantity function
    window.increaseQuantity = function (productId) {
        const product = cart.find(item => item.id === productId);
        if (product) {
            product.quantity += 1;
            updateCart();
        }
    };

    // Decrease quantity function
    window.decreaseQuantity = function (productId) {
        const product = cart.find(item => item.id === productId);
        if (product && product.quantity > 1) {
            product.quantity -= 1;
        } else if (product) {
            cart = cart.filter(item => item.id !== productId);  // Remove if quantity is 0
        }
        updateCart();
    };

    // Initialize cart display on panier.html load
    if (cartTableBody) {
        updateCart();
    }
});
