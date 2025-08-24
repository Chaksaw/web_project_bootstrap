
    // Load navbar
    document.addEventListener("DOMContentLoaded", function() {
        fetch('components/navbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navbar').innerHTML = data;
                // Activate current page link
                const currentPage = window.location.pathname.split("/").pop();
                const navLinks = {
                    "index.html": "nav-home",
                    "produits.html": "nav-products",
                    "contact.html": "nav-contact",
                    "about.html": "nav-about",
                    "panier.html": "nav-cart"
                };
                const activeLink = navLinks[currentPage];
                if (activeLink) {
                    document.getElementById(activeLink).classList.add("active");
                }
            })
            .catch(error => console.error('Erreur lors du chargement de la barre de navigation:', error));
    });

