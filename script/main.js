/**
 * Created by tayab on 31.05.2017.
 */
let makeOrderButton = document.getElementById('makeOrder');
let sizeSelect = document.getElementById('size');
let stuffingSelect = document.getElementById('stuffing');
let modal = document.getElementById('modal');
let closeModalButton = document.getElementById('closeModal');
let hamburgersCollection = [];

makeOrderButton.addEventListener('click', composeHamburger);
closeModalButton.addEventListener('click', closeModal);
$(document).on('click', '.edit-hamburger', editHamburger);
$(document).on('click', '.delete-hamburger', deleteHamburger);

window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }

};
function openModal(message) {
    modal.style.display = 'block';
    document.getElementById('modalContent').innerHTML = message;
}

function closeModal() {
    modal.style.display = 'none';
}

function composeHamburger() {
    let size = sizeSelect.options[sizeSelect.selectedIndex].value;
    let stuffing = stuffingSelect.options[stuffingSelect.selectedIndex].value;
    let hamburger;
    try {
        hamburger = new Hamburger(size, stuffing);
    } catch (e) {
        openModal(e.message);
        return;
    }
    let toppings = $('#toppingsCheckboxes').find(':checked');
    for (var i = 0; i < toppings.length; i++) {
        try {
            hamburger.addTopping(toppings[i].value);
        } catch (e) {
            openModal(e.message);
            return;
        }
    }

    hamburgersCollection[hamburgersCollection.length] = hamburger;
    composeHamburgerCard(hamburger, hamburgersCollection.length - 1);
}

function composeHamburgerCard(hamburger, id) {
    let imgSrc = (hamburger.getSize() == Hamburger.Sizes.small) ?
        '\images\\burger-small.jpg' : '\images\\burger-large.jpg';
    let title = hamburger.getSize() + ' hamburger with ' + hamburger.getStuffing();

    let card = $('<div class="card mt-3 col-lg-4 col-md-6 col-xs-12" id="' + id + '" style="width: 20rem;">' +
        '<img class="card-img-top" src="' + imgSrc + '"/>' +
        '<div class="card-block">' +
        '<h4 class="card-title">' + title + '</h4>' +
        '<div class="card-text">' + getHamburgerInfo(hamburger) + '</div>' +
        '<div class="row">' +
        '<button type="button" class="btn edit-hamburger btn-outline-primary offset-md-5 offset-xs-2 offset-lg-5">Edit</button>' +
        '<button type="button" class="btn delete-hamburger btn-outline-danger ml-2">Delete</button>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    $('#orderedHamburgers').append(card);
}

function editHamburger(e) {
    $(e.target).toggleClass('inEdit');
    let inEdit = $(e.target).hasClass('inEdit');
    $(e.target).text(inEdit ? 'Save' : 'Edit');
    let card = $(e.target).closest('.card');
    let id = $(card).attr('id');
    let hamburger = hamburgersCollection[id];
    if (inEdit)
        $(card).find('.card-text').empty().append(getHamburgerEditMarkup(hamburger));
    else {
        let toppings = card.find('input');
        try {
            for (var i = 0; i < toppings.length; i++)
                if (toppings[i].checked && !hamburger.getToppings().includes(toppings[i].value))
                    hamburger.addTopping(toppings[i].value);
                else if (!toppings[i].checked && hamburger.getToppings().includes(toppings[i].value))
                    hamburger.removeTopping(toppings[i].value);
        } catch (e) {
            openModal(e.message);
        } finally {
            hamburgersCollection[id] = hamburger;
            $(card).find('.card-text').empty().append(getHamburgerInfo(hamburger));
        }
    }
}

function deleteHamburger(e) {
    let card = $(e.target).closest('.card');
    let id = $(card).attr('id');
    delete hamburgersCollection[id];
    $(card).remove();
}

function getHamburgerInfo(hamburger) {
    let text = 'Toppings: ';
    for (var key in hamburger.getToppings())
        text += hamburger.getToppings()[key] + ' ';
    text += '<br/>Price: ' + hamburger.calculatePrice() + '<br/>';
    text += 'Calories: ' + hamburger.calculateCalories();
    return text;
}

function getHamburgerEditMarkup(hamburger) {
    let toppings = Hamburger.Toppings;
    let addedToppings = hamburger.getToppings();
    let markup = 'Toppings:<br/>';
    let checked = 'checked';

    for (let key in toppings) {
        if (addedToppings.includes(key))
            checked = 'checked';
        else checked = '';
        markup += '<div class="form-check">' +
            '<label class="form-check-label">' +
            `<input type="checkbox" value="${key}" ${checked} class="form-check-input">` +
            `${key} </label></div>`;
    }

    return markup;
}