/**
 * Created by tayab on 31.05.2017.
 */
function Hamburger(size, stuffing) {
    if (!checkParameter([Hamburger.SIZE_SMALL, Hamburger.SIZE_LARGE], size))
        throw new HamburgerException('Invalid size');
    if (!checkParameter([Hamburger.STUFFING_CHEESE,
        Hamburger.STUFFING_SALAD, Hamburger.STUFFING_POTATO], stuffing))
        throw new HamburgerException('Invalid stuffing');

    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];
}

Hamburger.SIZE_SMALL = 'small';
Hamburger.SIZE_LARGE = 'large';
Hamburger.STUFFING_CHEESE = 'cheese';
Hamburger.STUFFING_SALAD = 'salad';
Hamburger.STUFFING_POTATO = 'potato';
Hamburger.TOPPING_MAYO = 'mayo';
Hamburger.TOPPING_SPICE = 'spice';

Hamburger.__calcSheet__ = {
    'small': {
        price: 50,
        calories: 20
    },

    'large': {
    price: 100,
    calories: 40
    },

    'cheese': {
        price: 10,
        calories: 20
    },

    'salad': {
        price: 20,
        calories: 5
    },

    'potato': {
        price: 15,
        calories: 10
    },

    'spice': {
        price: 15,
        calories: 0
    },

    'mayo': {
        price: 20,
        calories: 5
    }
};

Hamburger.prototype.addTopping = function (topping) {
    if(!checkParameter([Hamburger.TOPPING_MAYO,
            Hamburger.TOPPING_SPICE], topping))
        throw new HamburgerException('Invalid topping');
    if(this.toppings.includes(topping))
        throw new HamburgerException('The "' + topping+ '" topping has been added already');
    this.toppings.push(topping);
};

Hamburger.prototype.removeTopping = function (topping) {
    var index = this.toppings.indexOf(topping);
    if(index == -1)
        throw new HamburgerException('The "' + topping+ '" topping isn\'t added');
    this.toppings.splice(index, 1);
};

Hamburger.prototype.getToppings = function () {
    return this.toppings;
};

Hamburger.prototype.getSize = function () {
    return this.size;
};

Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
};

Hamburger.prototype.calculatePrice = function () {
    var price = Hamburger.__calcSheet__[this.size].price +
        Hamburger.__calcSheet__[this.stuffing].price;
    for(var key in this.toppings)
        price += Hamburger.__calcSheet__[this.toppings[key]].price;

    return price;
};

Hamburger.prototype.calculateCalories = function () {
    var calories = Hamburger.__calcSheet__[this.size].calories +
        Hamburger.__calcSheet__[this.stuffing].calories;
    for(var key in this.toppings)
        calories += Hamburger.__calcSheet__[this.toppings[key]].calories;

    return calories;
};

function HamburgerException(message) {
    this.message = message || 'Invalid hamburger usage!';
    this.name = 'Hamburger exception';
}

function checkParameter(parameterEnumeration, valueToCheck) {
    for (var key in parameterEnumeration)
        if (parameterEnumeration[key] == valueToCheck)
            return true;
    return false;
}