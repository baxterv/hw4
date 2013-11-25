// JavaScript file for Dawg Pizza menu
$(function() {

});


function renderPizzas() {
	var idx;
	var pizza;
	var template = $('.pizza-template');
	var instance;
	var pizzaType;


	for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
    	pizza = com.dawgpizza.menu.pizzas[idx];
    	instance = template.clone();
    	if (!pizza.vegetarian) {
    		pizzaType = $('.meat')
    	} else {
    		pizzaType = $('.vegetarian')
    	}
    	instance.find('.pizza-name').html(pizza.name);
    	instance.find('.pizza-description').html(pizza.description + ". $" 
            + pizza.prices[0] + " / " + pizza.prices[1] + " / " + pizza.prices[2]);

        instance.find('.order-small').attr({
         'data-price': pizza.prices[0],
         'data-name': pizza.name,
         'data-size': 'small'
        });
        instance.find('.order-medium').attr({
         'data-price': pizza.prices[1],
         'data-name': pizza.name,
         'data-size': 'medium'
        });
        instance.find('.order-large').attr({
         'data-price': pizza.prices[2],
         'data-name': pizza.name,
         'data-size': 'large'
        });


    	instance.removeClass('pizza-template');
    	pizzaType.append(instance);
    } //for each pizza
} 

function renderDrinks() {
	var idx;
	var drink;
	var template = $('.drinks-template');
	var instance;

	for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
		drink = com.dawgpizza.menu.drinks[idx];
		instance = template.clone();
		instance.find('.drink').html(drink.name + " ($" + drink.price + ")");
		instance.find('.drink').attr({
         'data-price': drink.price,
         'data-name': drink.name
        });

        instance.removeClass('drinks-template');
		$('.drinks-menu').append(instance);
		
	} // for each drink
}

function renderDesserts() {
	var idx;
	var dessert;
	var template = $('.dessert-template');
	var instance;

	for(idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
		dessert = com.dawgpizza.menu.desserts[idx];
		instance = template.clone();
		instance.find('.dessert').html(dessert.name + " ($" + dessert.price + ")");
		instance.find('.dessert').attr({
         'data-price': dessert.price,
         'data-name': dessert.name
        });
        instance.removeClass('dessert-template');
		$('.dessert-menu').append(instance);
	} // for each dessert
}
