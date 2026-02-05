// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. SUBSCRIBE FEATURE (Global Footer) ---
    const subscribeBtn = document.querySelector('footer .btn-cta');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            alert("Thank you for subscribing.");
        });
    }

    // --- 2. SHOPPING CART LOGIC (sessionStorage) ---
    // Targets the "Add to Cart" buttons on the Gallery page
    const addToCartBtns = document.querySelectorAll('.product-card .btn-cta');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Logic to grab the specific book or item name from the card
            const productName = e.target.parentElement.querySelector('h3').innerText;
            
            // Retrieve current cart from session storage or start a new array [cite: 513]
            let cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            cart.push(productName);
            
            // Save the updated array back to sessionStorage [cite: 513]
            sessionStorage.setItem('cartItems', JSON.stringify(cart));
            alert(`${productName} added to the cart.`);
        });
    });

    // View Cart Modal Simulation
    // Reads from sessionStorage to display current selections [cite: 514]
    const viewCartBtn = document.querySelector('.gallery-header .btn-cta:first-child');
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', function() {
            const cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            if (cart.length === 0) {
                alert("Your cart is empty.");
            } else {
                alert("Your Cart:\n- " + cart.join("\n- "));
            }
        });
    }

    // Clear Cart & Process Order: Deleting Session Data [cite: 515]
    const clearBtn = document.getElementById('clear-cart');
    const processBtn = document.getElementById('process-order');

    [clearBtn, processBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                sessionStorage.removeItem('cartItems'); // Clears the storage [cite: 515]
                const message = btn.id === 'clear-cart' ? "Cart cleared." : "Thank you for your order.";
                alert(message);
            });
        }
    });

    // --- 3. CUSTOM ORDER FORM (localStorage) ---
    // Persistently saves customer info from the About Us page [cite: 591, 592]
    const contactForm = document.querySelector('.custom-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevents page reload so data can be saved
            
            // Capture the specific input values from your about.html IDs
            const customerName = document.getElementById('name').value;
            const customerRequest = document.getElementById('request').value;

            // Create the data object to be stored
            const feedbackEntry = {
                name: customerName,
                request: customerRequest,
                date: new Date().toLocaleDateString()
            };

            // Save the object to localStorage [cite: 591, 592]
            localStorage.setItem('customerFeedback', JSON.stringify(feedbackEntry));
            
            alert(`Thank you for your message, ${customerName}! Your message has been sent.`);
            contactForm.reset(); // Clears the form fields
        });
    }
});
