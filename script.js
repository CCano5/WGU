// Wait for the DOM to be fully initialized [cite: 1030-1031]
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GLOBAL FOOTER: Subscribe Feature (sessionStorage placeholder) ---
    const subscribeBtn = document.querySelector('footer .btn-cta');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            alert("Thank you for subscribing.");
        });
    }

    // --- 2. GALLERY PAGE: Shopping Cart (sessionStorage) [cite: 1282-1284] ---
    const addToCartBtns = document.querySelectorAll('.product-card .btn-cta');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Logic to pull product name from the card header [cite: 1195]
            const productName = e.target.parentElement.querySelector('h3').innerText;
            
            // Retrieve existing cart or initialize empty array [cite: 1196]
            let cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            cart.push(productName);
            
            // Re-serialize and store in sessionStorage [cite: 1195]
            sessionStorage.setItem('cartItems', JSON.stringify(cart));
            alert("Item added to the cart.");
        });
    });

    // View Cart Modal Alert [cite: 1283]
    const viewCartBtn = document.querySelector('.gallery-header .btn-cta');
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', () => {
            const cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            if (cart.length === 0) {
                alert("Your cart is empty.");
            } else {
                alert("Current Cart Items:\n" + cart.join("\n"));
            }
        });
    }

    // Clear Cart / Process Order: Data Deletion [cite: 1284]
    const clearBtn = document.getElementById('clear-cart');
    const processBtn = document.getElementById('process-order');

    [clearBtn, processBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                sessionStorage.removeItem('cartItems'); // Clear the session storage key [cite: 1197]
                const msg = btn.id === 'clear-cart' ? "Cart cleared." : "Thank you for your order.";
                alert(msg);
            });
        }
    });

    // --- 3. ABOUT US: Custom Orders (localStorage)  ---
    const contactForm = document.querySelector('.custom-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Encapsulate form data into a persistent object [cite: 1273]
            const feedbackData = {
                name: document.getElementById('name').value,
                request: document.getElementById('request').value
            };
            
            // Save to localStorage [cite: 1274]
            localStorage.setItem('customerFeedback', JSON.stringify(feedbackData));
            alert("Thank you for your message.");
            contactForm.reset();
        });
    }
});
