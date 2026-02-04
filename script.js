// Wait for the DOM to be fully initialized
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GLOBAL FOOTER: Subscribe Feature ---
    const subscribeBtn = document.querySelector('footer .btn-cta');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            alert("Thank you for subscribing.");
        });
    }

    // --- 2. GALLERY PAGE: Shopping Cart Logic ---
    
    // "Add to Cart" Buttons
    const addToCartBtns = document.querySelectorAll('.product-card .btn-cta');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productName = e.target.parentElement.querySelector('h3').innerText;
            
            let cart = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            cart.push(productName);
            
            sessionStorage.setItem('cartItems', JSON.stringify(cart));
            alert("Item added to the cart.");
        });
    });

    // --- MODAL LOGIC ---
    const modal = document.getElementById('cart-modal');
    const cartIcon = document.getElementById('cart-icon');
    const viewCartBtn = document.getElementById('view-cart-btn'); // Secondary Button
    const closeModal = document.querySelector('.close-modal');
    const cartList = document.getElementById('cart-items-list');

    // Function to Open Modal and Populate List
    const openModal = (e) => {
        if (e) e.preventDefault(); // Prevent default link behavior
        
        // Populate the list
        cartList.innerHTML = ''; // Clear previous list
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
        
        modal.style.display = "block"; // Show modal
    };

    // Trigger 1: Click on Cart Icon in Header
    if (cartIcon && modal) {
        cartIcon.addEventListener('click', openModal);
    }

    // Trigger 2: Click on "View Shopping Cart" Button in Body
    if (viewCartBtn && modal) {
        viewCartBtn.addEventListener('click', openModal);
    }

    // Close Modal when X is clicked
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    // Close Modal when clicking outside the box
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // --- BUTTONS INSIDE MODAL: Clear & Process ---
    const clearBtn = document.getElementById('clear-cart');
    const processBtn = document.getElementById('process-order');

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            sessionStorage.removeItem('cartItems'); 
            cartList.innerHTML = '<li style="list-style:none;">Your cart is empty.</li>'; // Visually clear list
            alert("Cart cleared.");
        });
    }

    if (processBtn) {
        processBtn.addEventListener('click', () => {
            sessionStorage.removeItem('cartItems'); 
            modal.style.display = "none"; 
            alert("Thank you for your order.");
        });
    }

    // --- 3. ABOUT US: Custom Orders ---
    const contactForm = document.querySelector('.custom-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const feedbackData = {
                name: document.getElementById('name').value,
                request: document.getElementById('request').value
            };
            
            localStorage.setItem('customerFeedback', JSON.stringify(feedbackData));
            alert("Thank you for your message.");
            contactForm.reset();
        });
    }
});