//document ready function
$(function(){
    renderPizzas();
    renderDrinks();
    renderDesserts();

    //create a cart model as a simple object with
    //the properties we eventually need to post to
    //the server
    var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.add-to-cart').click(function(){
        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price')
        };

        //push the new item on to the items array
        cart.items.push(newCartItem);

        //render the cart's contents to the element
        //we're using to contain the cart information
        //note that you would need a <div> or some
        //other grouping element on the page that has a
        //style class of 'cart-container'
        renderCart(cart, $('.cart-container'));
    });

    // $('.remove-item').click(function(){
    //     var idxToRemove = this.getAttribute('data-index');
    //     cart.items.splice(idxToRemove, 1);

    //     renderCart(cart, $('.cart-container'));
    // });

    $('.empty-cart').click(function(){
        cart.items = [];
        renderCart(cart,$('.cart-container'));
    });

    $('.place-order').click(function(){

        var signupForm = $('.signup-form');
        var reqField;       //reference to a required field
        var reqValue;       //the required field's value

        cart.name = signupForm.find('input[name="first-name"]').val() + " " + signupForm.find('input[name="last-name"]').val();
        cart.address1 = signupForm.find('input[name="addr-1"]').val();
        cart.zip = signupForm.find('input[name="zip"]').val();
        cart.phone = signupForm.find('input[name="phone"]').val();

        //find the input with name="first-name" and get its trimmed value
        reqField = signupForm.find('input[name="first-name"]');
        reqValue = reqField.val().trim();
        if (0 == reqValue.length) {
            //field has no value
            alert('You must enter a first name!');
            return false;
        }
        reqField = signupForm.find('input[name="last-name"]');
        reqValue = reqField.val().trim();
        if (0 == reqValue.length) {
            //field has no value
            alert('You must enter a last name!');
            return false;
        }
        reqField = signupForm.find('input[name="addr-1"]');
        reqValue = reqField.val().trim();
        if (0 == reqValue.length) {
            //field has no value
            alert('You must enter an address!');
            return false;
        }
        reqField = signupForm.find('input[name="zip"]');
        reqValue = reqField.val().trim();
        if (0 == reqValue.length) {
            //field has no value
            alert('You must enter a zip code!');
            return false;
        }
        reqField = signupForm.find('input[name="phone"]');
        reqValue = reqField.val().trim();
        if (0 == reqValue.length) {
            //field has no value
            alert('You must enter a phone number!');
            return false;
        }
        reqValue = $('.total-price').html();
        if (20 > reqValue) {
            //order is less than $20
            alert('Your order must be at least $20 to qualify for delivery');
            return false;
        }

        postCart(cart, $('.cart-form'));
    }); //on place order

}); //doc ready

// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>
//
function renderCart(cart, container) {
    var idx, item;
    var template = $('.cart-item-template');
    var instance;
    var subtotal = 0; //keeps track of subtotal of all items
    
    //empty the container of whatever is there currently
    container.empty();

    //for each item in the cart...
    for (idx = 0; idx < cart.items.length; ++idx) {
        item = cart.items[idx];
        instance = template.clone();

        instance.find('.title').html(item.name);
        instance.find('.price').html(item.price);
        instance.find('.remove-item').attr('data-index', idx);
        subtotal += parseInt(item.price, 10);
        console.log(subtotal);
        instance.removeClass('cart-item-template');
        container.append(instance);
    } //for each cart item

    //renders tax and total price for the order

    var tax = subtotal * 0.095; // calculate tax
    var total=subtotal+tax; //add tax to subtotal
    $('.subtotal-amount').html(subtotal.toFixed(2));
    $('.tax-amount').html(tax.toFixed(2));
    $('.total-price').html(total.toFixed(2));


    $('.remove-item').click(function(){
        var idxToRemove = this.getAttribute('data-index');
        cart.items.splice(idxToRemove, 1);

        renderCart(cart, $('.cart-container'));
    });

} //renderCart()

// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
    //find the input in the form that has the name of 'cart'    
    //and set it's value to a JSON representation of the cart model
    cartForm.find('input[name="cart"]').val(JSON.stringify(cart));

    //submit the form--this will navigate to an order confirmation page
    cartForm.submit();

} //postCart()

