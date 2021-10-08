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
        carteFormatPanier.classList.add("articles-panier")
        carteFormatPanier.innerHTML = 
        `
        <article class="cart__item" data-id="{product-ID}">
        <div class="cart__item__img">
          <img src=${convertInArray.imageUrl} alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>Nom du produit</h2>
            <p>42,00 €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
        `;

        tableauPanier.appendChild(carteFormatPanier);

    }
}


