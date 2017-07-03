/**
 * Created by tayab on 04.06.2017.
 */
class Hamburger {
    static get Sizes(){
        return {
            small: 'small',
            large: 'large'
        }
    };

    static get Stuffings(){
        return {
            cheese: 'cheese',
            salad: 'salad',
            potato: 'potato'
        }
    };

    static get Toppings(){
       return {
           mayo: 'mayo',
           spice: 'spice'
       }
    };

    static get __calcSheet__(){
        return {
            [Hamburger.Sizes.small]: {
                price: 50,
                calories: 20
            },

            [Hamburger.Sizes.large]: {
                price: 100,
                calories: 40
            },

            [Hamburger.Stuffings.cheese]: {
                price: 10,
                calories: 20
            },

            [Hamburger.Stuffings.salad]: {
                price: 20,
                calories: 5
            },

            [Hamburger.Stuffings.potato]: {
                price: 15,
                calories: 10
            },

            [Hamburger.Toppings.spice]: {
                price: 15,
                calories: 0
            },

            [Hamburger.Toppings.mayo]: {
                price: 20,
                calories: 5
            }
        }
    };

    constructor(size, stuffing) {
        if (!checkParameter(Hamburger.Sizes, size))
            throw new HamburgerException('Invalid size');
        if (!checkParameter(Hamburger.Stuffings, stuffing))
            throw new HamburgerException('Invalid stuffing');

        this.size = size;
        this.stuffing = stuffing;
        this.toppings = [];
    }

    addTopping(topping) {
        if (!checkParameter(Hamburger.Toppings, topping))
            throw new HamburgerException(`Invalid topping ${topping}`);
        if (this.toppings.includes(topping))
            throw new HamburgerException(`The ${topping} topping has been added already`);
        this.toppings.push(topping);
    }

    removeTopping(topping) {
        let index = this.toppings.indexOf(topping);
        if (index == -1)
            throw new HamburgerException(`The ${topping} topping isn\'t added`);
        this.toppings.splice(index, 1);
    }

    getToppings() {
        return this.toppings;
    }

    getSize() {
        return this.size;
    }

    getStuffing() {
        return this.stuffing;
    }

    calculatePrice() {
        let price = Hamburger.__calcSheet__[this.size].price +
            Hamburger.__calcSheet__[this.stuffing].price;
        for (var key in this.toppings)
            price += Hamburger.__calcSheet__[this.toppings[key]].price;

        return price;
    }

    calculateCalories() {
        let calories = Hamburger.__calcSheet__[this.size].calories +
            Hamburger.__calcSheet__[this.stuffing].calories;
        for (var key in this.toppings)
            calories += Hamburger.__calcSheet__[this.toppings[key]].calories;

        return calories;
    }

}

class HamburgerException {
    constructor(message = 'Invalid hamburger usage!'){
        this.message = message;
        this.name = 'Hamburger exception';
    }
}

function checkParameter(parameterEnumeration, valueToCheck) {
    for (var key in parameterEnumeration)
        if (parameterEnumeration[key] == valueToCheck)
            return true;
    return false;
}