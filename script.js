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

    // --- 2. ADD TO CART LOGIC ---
    const addToCartBtns = document.querySelectorAll('.product-card .btn-cta');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const productName = e.target.parentElement.querySelector('h3').innerText;
            
            let cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            cart.push(productName);
            
            sessionStorage.setItem('cartItems', JSON.stringify(cart));
            alert(`${productName} added to the cart.`);
        });
    });

    // --- 3. MODAL & CART DISPLAY LOGIC ---
    const modal = document.getElementById('cart-modal');
    const cartList = document.getElementById('cart-items-list');
    const closeBtn = document.querySelector('.close-modal');
    
    // Triggers: The Cart Icon (Header) AND The View Cart Button (Gallery)
    const cartIcon = document.getElementById('cart-icon');
    const viewCartBtn = document.getElementById('view-cart-btn');

    // Function to Open Modal and Populate List
    function openModal(e) {
        e.preventDefault(); // Stop page jump
        
        // Clear previous list
        cartList.innerHTML = ''; 
        
        // Get fresh data
        const cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        
        if (cart.length === 0) {
            cartList.innerHTML = '<li style="list-style:none;">Your cart is empty.</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                cartList.appendChild(li);
            });
        }
        
        // Show the window
        if (modal) modal.style.display = "block";
    }

    // Attach listener to Cart Icon (if it exists on this page)
    if (cartIcon) {
        cartIcon.addEventListener('click', openModal);
    }

    // Attach listener to View Cart Button (if it exists on this page)
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', openModal);
    }

    // Close Modal Logic
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    // Close if clicking outside the box
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // --- 4. CLEAR CART & PROCESS ORDER (Inside Modal) ---
    const clearBtn = document.getElementById('clear-cart');
    const processBtn = document.getElementById('process-order');

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            sessionStorage.removeItem('cartItems'); 
            cartList.innerHTML = '<li style="list-style:none;">Your cart is empty.</li>'; // Update UI instantly
            alert("Cart cleared.");
        });
    }

    if (processBtn) {
        processBtn.addEventListener('click', function() {
            sessionStorage.removeItem('cartItems'); 
            modal.style.display = "none"; // Close window
            alert("Thank you for your order.");
        });
    }

    // --- 5. CUSTOM ORDER FORM (About Us Page) ---
    const contactForm = document.querySelector('.custom-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const customerName = document.getElementById('name').value;
            const customerRequest = document.getElementById('request').value;

            const feedbackEntry = {
                name: customerName,
                request: customerRequest,
                date: new Date().toLocaleDateString()
            };

            localStorage.setItem('customerFeedback', JSON.stringify(feedbackEntry));
            
            alert(`Thank you for your message, ${customerName}! Your message has been sent.`);
            contactForm.reset();
        });
    }
});
