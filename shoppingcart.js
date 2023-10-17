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
}

//Selects the items from the button clicked
function addToCart(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var productPrice = shopItem.querySelector('.price').textContent;
    var productName = shopItem.querySelector('.product-name').textContent;
    var productImage = shopItem.querySelector('.product-image').src;

    addItemToCart(productPrice, productName, productImage);
    console.log(button, "clicked successfully");

}
//Adds item to the cart 
function addItemToCart(productPrice, productName, productImage) {
    var cartDisplay = document.createElement('div');
    cartDisplay.classList.add('cartItemsDisplay');
    var cartItems = document.getElementsByClassName('cartItemsSelected')[0];
    var cartItemNames = cartItems.getElementsByClassName('cartProductName');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == productName) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartItemContents = `
        <div class="cartProductDisplay">
            <img class="cartPrdouctImage" src="${productImage}" width="100" height="100">
            <span class="cartProductName">${productName}</span>
        </div>
        <span class="cartProductPrice">${productPrice}</span>
        <div class="cartQuantity">
            <input class="cartProductQuantity" type="number" value="1">
            <button class="btn btn-danger" type="button"><i class="fa fa-trash"></i></button>
        </div>`
    cartDisplay.innerHTML = cartItemContents;
    cartItems.append(cartDisplay);
    cartDisplay.getElementsByClassName('btn-danger')[0].addEventListener('click', removeProduct)
    // cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}