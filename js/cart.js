/* Création de la page réactive du panier */

pagePanier()


function pagePanier() {

    let getPanier = localStorage.getItem("panierKey");
    let numGetPanier = JSON.parse(getPanier);

    if (numGetPanier.length == 0) {
        const messagePanierVide = document.querySelector(".paniervide ")
        messagePanierVide.classList.remove("cache");
        
    }

    for (let articleChoisi in numGetPanier) {

        let articlePanier = numGetPanier[articleChoisi];

        let convertInArray = JSON.parse(articlePanier);
        

        const tableauPanier = document.querySelector("#cart__items");

        let carteFormatPanier = document.createElement("div");
        carteFormatPanier.classList.add("articles-panier-beta")
        carteFormatPanier.innerHTML =
            `
        
        <article class="cart__item" data-id="${convertInArray.id}">
                <div class="cart__item__img">
                  <img src="${convertInArray.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${convertInArray.name}</h2>
                    <p class="price">${convertInArray.price * convertInArray.quantity}€</p>
                    </div>
                    <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${convertInArray.quantity}</p>
                     </div>
                    </div>
                </div>
              </article>
        `;

        tableauPanier.appendChild(carteFormatPanier);

    };
    
    /* Ajout du bouton supprimer  */
    
    addButtonDelete();
    
    function addButtonDelete() {
        
        numOfArticles = numGetPanier.length;
        let i = 0
        
        for (i; i < numOfArticles; i++) {
            let artPanier = document.querySelector(".articles-panier-beta");
            artPanier.innerHTML +=
            `       
            <div class="cart__item__content__settings__delete" id=${i} onclick="deleteArt(id)">
            <p class="deleteItem">Supprimer</p>
            </div>`;
            artPanier.classList.add("articles-panier");
            artPanier.classList.remove("articles-panier-beta");
        }
    }
    
    /* Prix total panier */
    
    const allPrices = document.querySelectorAll(".price");
    const arrayAllPrices = Array.from(allPrices)
    
    const nbPrices = arrayAllPrices.length
    let totalPanier = 0;
    
    for (let j = 0; j < nbPrices; j++) {
        let strBasis = arrayAllPrices[j].textContent;
        let newStrBasis = strBasis.substring(0, strBasis.length - 1);
        let convertStrInNum = parseInt(newStrBasis);
        
        totalPanier += convertStrInNum;
    }
    
    const affichageTotal = document.querySelector(".cart__price");
    let blocTotal = document.createElement("div");
    blocTotal.innerHTML =
    `<p>Total : <span id="totalPrice">${totalPanier}</span> €</p>`;
    
    affichageTotal.appendChild(blocTotal);
       
}

/* Message quand on supprime un article */

function deleteArt(indexDel) {

    let getPanierForDel = JSON.parse(localStorage.getItem("panierKey"));
    getPanierForDel.splice(indexDel, 1);
    const newPanier = JSON.stringify(getPanierForDel);
    localStorage.setItem("panierKey", newPanier);

    alert("Votre article à bien été supprimé");
    setTimeout(300);
    window.location.reload();

}

//-------------------------------------------
// Formulaire panier Validation
//-------------------------------------------
let form = document.querySelector("#contact")

verifForm()
envoieFormulaire()


function envoieFormulaire() {

    let button = document.querySelector(".cart__order__form__submit");

    button.addEventListener('click', function (e) {

        e.preventDefault();

        let getPanier = localStorage.getItem("panierKey");
        let numGetPanier = JSON.parse(getPanier);


        if (validLetter(form.firstName) && validLetter(form.lastName) && validAddress(form.address) && validLetter(form.city) && validEmail(form.email)) {

            if (numGetPanier == 0) {

                alert("Vous ne pouvez pas commander un panier qui est vide, veuillez sélectionner un article au minimum");

            } else {

                /* Récupération des srtings articles du panier */
                let products = [];

                for (let articleInPanier in numGetPanier) {

                    let articlePanier = numGetPanier[articleInPanier];
                    let convertInArray = JSON.parse(articlePanier);

                    let getIdArtPanier = convertInArray.id;

                    products.push(getIdArtPanier);

                }
                //---------------------------------------------


                /* Récupération du formulaire */
                let contact = {
                    firstName: form.firstName.value,
                    lastName: form.lastName.value,
                    address: form.address.value,
                    city: form.city.value,
                    email: form.email.value
                };
                //---------------------------------------------


                /* Envoi des données avec FETCH */
                fetch("http://localhost:3000/api/products/order",
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({ contact, products })
                    })
                    .then(response => response.json())
                    .then(function (response) {

                        let objetRetour = response;

                        console.log(objetRetour["orderId"]);
                        localStorage.setItem("orderKey", objetRetour["orderId"]);


                        alert("Veuillez cliquer sur OK pour comfirmer votre commande.");
                        location.replace("confirmation.html");
                    })
                    .catch(function (error) {

                        console.log(error)

                    })

            }

        } else {

            if (numGetPanier == 0) {
                alert("Votre panier est vide, veuillez sélectionner au moins un article et le formulaire n'est pas correctement rempli");
            } else {
                alert("Le formulaire n'est pas correctement rempli");
            }
        }
    });
}

// --- Vérification Formulaire avant envoie
function verifForm() {

    form.firstName.addEventListener('change', function() {
        validLetter(this);

        const msgError = document.querySelector("#firstN");
        

        if(validLetter(this) == false) {
            
            msgError.classList.remove("cache");

        } else {

            msgError.classList.add("cache");

        }
    });

    form.lastName.addEventListener('change', function() {
        validLetter(this);

        const msgError = document.querySelector("#lastN");
        
        if(validLetter(this) == false) {
            
            msgError.classList.remove("cache");

        } else {

            msgError.classList.add("cache");

        }

    });

    form.address.addEventListener('change', function() {
        validAddress(this);

        const msgError = document.querySelector("#addrS");
        
        if(validLetter(this) == false) {
            
            msgError.classList.remove("cache");

        } else {

            msgError.classList.add("cache");

        }
        
    });

    form.city.addEventListener('change', function() {
        validLetter(this);

        const msgError = document.querySelector("#citY");
        
        if(validLetter(this) == false) {
            
            msgError.classList.remove("cache");

        } else {

            msgError.classList.add("cache");

        }
        
    });

    form.email.addEventListener('change', function() {
        validEmail(this);

        const msgError = document.querySelector("#emaiL");
        
        if(validLetter(this) == false) {
            
            msgError.classList.remove("cache");

        } else {

            msgError.classList.add("cache");

        }
    });
}

// REGEX pour formulaire
function validEmail(inputEmail) {
    let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

    let testEmail = emailRegex.test(inputEmail.value);
    

    if (testEmail) {
        inputEmail.classList.add("borderGreen");
        inputEmail.classList.remove("borderRed");
    } else {
        inputEmail.classList.add("borderRed");
        inputEmail.classList.remove("borderGreen");
    }

    if (inputEmail.value.length == 0) {
        inputEmail.classList.remove("borderGreen");
        inputEmail.classList.remove("borderRed");        
    }

    return testEmail;
}

function validLetter(inputLetter) {
    let letterRegex = new RegExp('[a-zA-Z ,.-]$', 'g');

    let testLetter = letterRegex.test(inputLetter.value);

    if (inputLetter.value.length < 2) {
        inputLetter.classList.add("borderRed");
        inputLetter.classList.remove("borderGreen");
        testLetter = false;
    } else if (testLetter) {
        inputLetter.classList.add("borderGreen");
        inputLetter.classList.remove("borderRed");
    } else {
        inputLetter.classList.add("borderRed");
        inputLetter.classList.remove("borderGreen");
    }


    if (inputLetter.value.length == 0) {
        inputLetter.classList.remove("borderGreen");
        inputLetter.classList.remove("borderRed");        
    }
    
    return testLetter;
}

function validAddress(inputAddress) {
    let addressRegex = new RegExp ('[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.-]$', 'g');

    let addressTest = addressRegex.test(inputAddress.value);

    if (inputAddress.value.length < 2) {
        inputAddress.classList.add("borderRed");
        inputAddress.classList.remove("borderGreen");
        addressTest = false;
    } else if (addressTest) {
        inputAddress.classList.add("borderGreen");
        inputAddress.classList.remove("borderRed");
    } else {
        inputAddress.classList.add("borderRed");
        inputAddress.classList.remove("borderGreen");
    }

    if (inputAddress.value.length == 0) {
        inputAddress.classList.remove("borderGreen");
        inputAddress.classList.remove("borderRed");
    }

    return addressTest;
}