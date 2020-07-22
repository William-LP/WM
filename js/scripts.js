/*!
    * Start Bootstrap - Agency v6.0.2 (https://startbootstrap.com/template-overviews/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */
(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict


function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

$('#payementModal').on('show.bs.modal', function (event) {
    var paiementMethod = document.getElementById('payementMethod').value;
    var guests = document.getElementById('guests').value;
    var city = document.getElementById('city').value;
    var bookingName = document.getElementById('bookingName').value;

    // Utilisé par paiement en chèque
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    switch (parseInt(guests)) {
        case 2:
            price = 250
            priceLetters = "deux-cent-cinquante"
            break;
        case 3:
            price = 320
            priceLetters = "trois-cent-vingt"
            break;
        case 4:
            price = 320
            priceLetters = "trois-cent-vingt"
            break;
        case 5:
            price = 350
            priceLetters = "trois-cent-cinquante"
            break;
        case 6:
            price = 350
            priceLetters = "trois-cent-cinquante"
            break;
    }

    var cheque = [
        'Remplir le chèque comme indiqué :',
        '<ul>',
        '<li>Montant : ', price, '€</li>',
        '<li>Montant en lettre : ', priceLetters, '</li>',
        '<li>Ordre : William LE POMMELET</li>',
        '<li>Fait à : ', city, '</li>',
        '<li>Le ', today, '</li>',
        '<li> Une signature dans le cadre</li>',
        '</ul>',
        '<strong>Pour valider votre reservation, nous concorderons d\'un moment où je viendrais récupérer le chèque (au moins 48h avant la prestation).</strong>'
    ].join("\n");


    var virement = [
        'Effectuer un virement comme indiqué :',
        '<ul>',
        '<li>Montant : ', price, '€</li>',
        '<li>Destinataire : William LE POMMELET</li>',
        '<li>IBAN : FR76 1871 5002 0004 0822 9238 506</li>',
        '<li>Libellé : KST - ', bookingName, '</li>',
        '</ul>',
        '<strong>N\'oubliez pas d\'indiquer votre nom dans le libellé.</strong><br /><br />',
        'Une fois le virement perçu, votre réservation sera validé !'
    ].join("\n");

    var cb = [
        'Il n\'est pas encore possible de payer par carte bancaire via notre site.<br /><br />',
        'Nous vous invitons à utiliser un autre moyen de paiement et nous excusons pour la gène occasioner.'
    ].join("\n");


    var especes = [
        'Pour régler par espèce, munissez-vous de la somme en liquide et nous conviendrons d\'un rendez-vous où je viendrais collecter cette dernière.<br /><br />',
        'Il vous sera remis un bon qui validera votre réservation !'
    ].join("\n");


    var paypal = [
        '<div id="paypal-button-container"></div>'
    ].join("\n");

    switch (paiementMethod) {
        case "Chèque":
            html = cheque
            break;
        case "Virement":
            html = virement
            break;
        case "PayPal / Carte bancaire":
            html = paypal
            break;
        case "Espèces":
            html = especes
            break;
    }

    var modal = $(this)
    modal.find('.modal-title').text('Réglement par ' + paiementMethod)
    modal.find('.modal-body input').val(price + '€')

    modal.find('.modal-description').html(html)

    if (paiementMethod == "PayPal / Carte bancaire") {
        paypal_sdk.Buttons({
            style: {
                shape: 'pill',
                color: 'gold',
                layout: 'horizontal',
                label: 'paypal',

            },
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '1'
                        }
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    alert('Merci ' + details.payer.name.given_name + ', nous allons rapidement prendre contact avec vous!');
                });
            }
        }).render('#paypal-button-container');
    }



})



