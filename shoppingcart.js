let cart = [];

//Adds a eventlistner for button additem to into cart
var addToCartButtons = document.getElementsByClassName('addItem');
for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addToCart);
}

//Adds eventListner for quantity change input
var quantityInputs = document.getElementsByClassName('cartProductQuantity')
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
}

//Gives remove button functionality and remove the selected product item from cart
function removeProduct(event) {
    var removeButton = event.target;
    removeButton.parentElement.parentElement.remove();
    updateCartTotal();
}

//Checks for Quantity change and removes list item if quantity=0
function quantityChanged(event) {
    input = event.target;
    if (input.value == 0) {
        removeProduct(event);
    }
    updateCartTotal();
}

//Remove all cart Items
function removeall() {
    var cartProductList = document.querySelectorAll('.cartItemsDisplay');
    for (var i = 0; i < cartProductList.length; i++) {
        removeAllProducts = cartProductList[i]
        removeAllProducts.remove();
        updateCartTotal();
    }
}

//Selects the items from the button clicked on card item
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

    //checks for same Added tocart item
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == productName) {
            alert("Item already added");
            return;
            // cartQuantityName = cartItemNames[i];
            // console.log(cartQuantityName);
            // cartItemQuantity = cartQuantityName.getElementsByClassName('cardProductQuantity');
            // console.log(cartItemQuantity);
            // var currentQuantity = parseInt(cartItemQuantity.value);
            // console.log(currentQuantity);
            // cartItemQuantity.value = currentQuantity + 1;
            // console.log(cartItemQuantity.value);
            // updateCartTotal();
            // return;
        }
    }
    //Adds contents to the Cartlist with all details
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
    cartDisplay.getElementsByClassName('cartProductQuantity')[0].addEventListener('change', quantityChanged);
}

//updates the cartTotal on given set of conditions
function updateCartTotal() {
    var cartProducts = document.getElementsByClassName('cartItemsSelected')[0];
    var cartItems = cartProducts.getElementsByClassName('cartItemsDisplay');
    var total = 0;
    // console.log(cartProducts);

    for (var i = 0; i < cartItems.length; i++) {
        var cartProductItem = cartItems[i];
        //captures the Items Price on first occurence
        var productPrice = cartProductItem.getElementsByClassName('cartProductPrice')[0];
        //captures the Items Quantity on first occurence
        var productQuantity = cartProductItem.getElementsByClassName('cartProductQuantity')[0];

        //replaces the ₹ sign and comma from the given list item price for pure float value
        var price = parseFloat(productPrice.innerText.replace('₹', '').replace(/,/g, ''));
        //checks for quantity present in input value
        var quantity = productQuantity.value;
        total = total + (price * quantity);
        console.log(total);
    }

    total = Math.round(total * 100) / 100;
    //formats the final total for local Indian currency and format
    formattedTotal = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(total);
    //prints the final total value in Indian rupees format
    document.getElementsByClassName('cartTotalPrice')[0].innerText = '₹ ' + formattedTotal;

}