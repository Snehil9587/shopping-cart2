let cart = [];

//Adds a eventlistner for button additem to into cart
var addToCartButtons = document.getElementsByClassName('addItem');
for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addToCart);
}

//Gives remove button functionality and remove the selected product item from cart
function removeProduct(event) {
    var removeButton = event.target;
    removeButton.parentElement.parentElement.remove();
    updateCartTotal();
}

//Selects the items from the button clicked
function addToCart(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var productPrice = shopItem.querySelector('.price').textContent;
    var productName = shopItem.querySelector('.product-name').textContent;
    var productImage = shopItem.querySelector('.product-image').src;

    addItemToCart(productPrice, productName, productImage);
    updateCartTotal();
}

//Adds item to the cart 
function addItemToCart(productPrice, productName, productImage) {
    var cartDisplay = document.createElement('div');
    cartDisplay.classList.add('cartItemsDisplay');
    var cartItems = document.getElementsByClassName('cartItemsSelected')[0];
    //checks wheter the selected item is present in cart or not
    var cartItemNames = cartItems.getElementsByClassName('cartProductName');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == productName) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartItemContents = `
        <div class="cartProductDisplay">
            <img class="cartPrdouctImage" src="${productImage}">
            <span class="cartProductName">${productName}</span>
        </div>
        <span class="cartProductPrice">${productPrice}</span>
        <div class="cartQuantity">
            <input class="cartProductQuantity" type="number" value="1">
            <button class="btn btn-danger" type="button">Remove</button>
        </div>`

    //add a + and - button in input field for quantity

    cartDisplay.innerHTML = cartItemContents;
    cartItems.append(cartDisplay);
    cartDisplay.getElementsByClassName('btn-danger')[0].addEventListener('click', removeProduct);
    // cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartProducts = document.getElementsByClassName('cartItemsSelected')[0];
    var cartItems = cartProducts.getElementsByClassName('cartItemsDisplay');
    var total = 0;
    // console.log(cartProducts);
    console.log(total);

    for (var i = 0; i < cartItems.length; i++) {
        var cartProductItem = cartItems[i];
        var productPrice = cartProductItem.getElementsByClassName('cartProductPrice')[0];
        // console.log(productPrice);
        var productQuantity = cartProductItem.getElementsByClassName('cartProductQuantity')[0];
        // console.log(productQuantity);

        var price = parseFloat(productPrice.innerText.replace('₹', ''));
        var quantity = productQuantity.value;
        total = total + (price * quantity);
        console.log(total);
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cartTotalPrice')[0].innerText = '₹' + total;

}