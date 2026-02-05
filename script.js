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
    const cartIcon = document.getElementById('cart-icon');
    const viewCartBtn = document.getElementById('view-cart-btn');

    // Function to Open Modal and Populate List
    function openModal(e) {
        e.preventDefault(); 
        cartList.innerHTML = ''; 
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
        
        if (modal) modal.style.display = "block";
    }

    if (cartIcon) cartIcon.addEventListener('click', openModal);
    if (viewCartBtn) viewCartBtn.addEventListener('click', openModal);

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // --- 4. CLEAR CART & PROCESS ORDER (With Empty Checks) ---
    const clearBtn = document.getElementById('clear-cart');
    const processBtn = document.getElementById('process-order');

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            const cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            
            // Check if cart is ALREADY empty
            if (cart.length === 0) {
                alert("Your cart is already empty.");
            } else {
                sessionStorage.removeItem('cartItems'); 
                cartList.innerHTML = '<li style="list-style:none;">Your cart is empty.</li>'; 
                alert("Cart cleared.");
            }
        });
    }

    if (processBtn) {
        processBtn.addEventListener('click', function() {
            const cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];

            // Check if user is trying to order nothing
            if (cart.length === 0) {
                alert("No items in cart. Please add products before processing.");
            } else {
                sessionStorage.removeItem('cartItems'); 
                modal.style.display = "none"; 
                alert("Thank you for your order.");
            }
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
