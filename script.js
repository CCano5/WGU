// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // 1. Subscribe Button Alert (Global Footer)
    const subscribeBtn = document.querySelector('footer .btn-cta');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevents form from trying to submit
            alert("Thank you for subscribing.");
        });
    }

    // 2. Gallery Page Buttons
    // Handling multiple "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.product-card .btn-cta');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert("Item added to the cart.");
        });
    });

    // Handling the "View Shopping Cart" placeholder
    const viewCartBtn = document.querySelector('.gallery-header .btn-cta');
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', function() {
            alert("This feature is coming soon!");
        });
    }

    // 3. About Us / Contact Page Submit
    const contactSubmitBtn = document.querySelector('.custom-form .btn-cta');
    if (contactSubmitBtn) {
        contactSubmitBtn.addEventListener('click', function(e) {
            // Check if form is valid using browser defaults first
            const form = document.querySelector('.custom-form');
            if (form.checkValidity()) {
                e.preventDefault();
                alert("Thank you for your message.");
            }
        });
    }
    
    // 4. Placeholder Cart Actions (Usually found in a modal or list)
    // Adding listeners for future functionality
    const clearCartBtn = document.getElementById('clear-cart'); // If you added this ID
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => alert("Cart cleared."));
    }

    const processOrderBtn = document.getElementById('process-order'); // If you added this ID
    if (processOrderBtn) {
        processOrderBtn.addEventListener('click', () => alert("Thank you for your order."));
    }
});