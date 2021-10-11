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
                    <p class="price">${convertInArray.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                  </div>
                </div>
              </article>
        `;

        

        tableauPanier.appendChild(carteFormatPanier);

    }

    /* Ajout du bouton supprimer */

    addButtonDelete();

    function addButtonDelete() {

        numOfArticles = numGetPanier.length;
        let i = 0

        for (i; i < numOfArticles; i++) {
            let artPanier = document.querySelector(".cart__item__content");
            artPanier.innerHTML += 
            `<div class="cart__item__content__settings__delete" id=${i} onclick="deleteArt(id)">
            <p class="deleteItem">Supprimer</p>
          </div>`;
            artPanier.classList.add("articles-panier");
            artPanier.classList.remove("articles-panier-beta");
        }
    }

    const allPrices = document.querySelectorAll(".price"); 
    const arrayAllPrices = Array.from(allPrices)

    const nbPrices = arrayAllPrices.length
    let totalPanier = 0;
    
    for (let j = 0; j < nbPrices; j++) {
        let strBasis = arrayAllPrices[j].textContent;
        let newStrBasis = strBasis.substring(0, strBasis.length - 2);
        let convertStrInNum = parseInt(newStrBasis);

        totalPanier += convertStrInNum;
    }
    
    const affichageTotal = document.querySelector(".cart__price");
    let blocTotal = document.createElement("div");
    blocTotal.innerHTML =
    `<p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice">${totalPanier}</span> €</p>`;

    affichageTotal.appendChild(blocTotal);
    
}


function deleteArt(indexDel) {

    let getPanierForDel = JSON.parse(localStorage.getItem("panierKey"));
    getPanierForDel.splice(indexDel, 1);
    const newPanier = JSON.stringify(getPanierForDel);
    localStorage.setItem("panierKey", newPanier);
    
    alert("Votre article à bien été supprimé");
    setTimeout(300);
    window.location.reload();
    
}




