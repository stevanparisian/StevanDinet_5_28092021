/* Récupération des articles sur l'api */
mainArticle()

function mainArticle() {

  const urlWindow = window.location.search;
  let idArticle = urlWindow.slice(1);
  let urlArticle = `http://localhost:3000/api/products/` + idArticle;

  const mainArticle = document.querySelector("#item");

  fetch(urlArticle)
    .then(response => response.json()

      .then(function (response) {

        const articleCanape = response;
        const colors = response.colors;

        createCartes();
        addColors();
        ajoutAuPanier();



        /* Création des produits de maniere dynamique */
        function createCartes() {
          let articleCarte = document.createElement("div");
          articleCarte.classList.add("article");


          articleCarte.innerHTML =
            `
            <div class="item__img">
              <img src=${articleCanape.imageUrl} alt="Photographie d'un canapé">
              <p id="image">${articleCanape.imageUrl}</p>
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${articleCanape.name}</h1>
                <p>Prix : <span id="price">${articleCanape.price}</span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${articleCanape.description}</p>
              </div>
             

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une couleur :</label>
                  <select name="color-select" id="colors">
                      
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="1" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>

            </div>
          `;

          mainArticle.appendChild(articleCarte);
        }
        /* Ajout des couleurs dans les cartes */
        function addColors() {

          const colorsIndex = document.querySelector('#colors');

          for (let nbColors = 0; nbColors < colors.length; nbColors++) {
            colorsIndex.innerHTML +=
              `
                    <option value="${colors[nbColors]}">${colors[nbColors]}</option>
                `;
          };

        }
        /* Ajoute l'article de la page au panier */
        function ajoutAuPanier() {

          const buttonSendPanier = document.querySelector("button");


          buttonSendPanier.addEventListener("click", function (event) {

            event.preventDefault();

            const nameArticleChoisi = document.querySelector("h1");
            const urlArticleChoisi = window.location.search;
            const couleurChoisi = document.querySelector("#colors");
            const prixArticleChoisi = document.querySelector("#price");
            const imageArticleChoisi = document.querySelector("#image");
            const quantite_produit = document.querySelector("#quantity");


            let articleChoisi = {
              name: nameArticleChoisi.textContent,
              id: urlArticleChoisi.slice(1),
              color: couleurChoisi.options[couleurChoisi.selectedIndex].text,
              price: prixArticleChoisi.textContent,
              imageUrl: imageArticleChoisi.textContent,
              quantity: quantite_produit.value
              /* quantity: parseFloat(document.querySelector("#quantity").value) */

              
            };
            const choixForm = couleurChoisi.value;


            let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem('panierKey'));

                // fonction pour une fenêtre popup de confirmation de commande ou annulation
                const popupConfirmation = () => {
                    if (window.confirm(` Le canapé ${nameArticleChoisi.textContent} de couleur ${choixForm} à bien été ajouté au panier. 
Pour consulter le panier cliquez sur OK ou pour poursuivre vos achats cliquez sur ANNULER ` )) {
                            window.location.href = 'cart.html';
                        } else {
                            window.location.href = 'product.html' + "?"  + idArticle;
                        }
                    }

         
            let exist = false;
            // S'il y a aucun produit localstorage
            if (produitEnregistreDansLocalStorage == null ) {
              produitEnregistreDansLocalStorage = [];
              exist = true;
              produitEnregistreDansLocalStorage.push(articleChoisi);
              localStorage.setItem('panierKey', JSON.stringify(produitEnregistreDansLocalStorage));
              console.log(produitEnregistreDansLocalStorage);
              popupConfirmation();
              
            } 
            
            // S'il y a déja des produits dans localstorage 
            else {    
                
                //Verifier si le produit existe déja pour augmenter seulement la quantité
                for (let i = 0; i < produitEnregistreDansLocalStorage.length; i++) {
                  if(produitEnregistreDansLocalStorage[i].id + produitEnregistreDansLocalStorage[i].color == articleChoisi.id + articleChoisi.color){
                    produitEnregistreDansLocalStorage[i].quantity = +produitEnregistreDansLocalStorage[i].quantity + +articleChoisi.quantity;
                      localStorage.setItem("panierKey", JSON.stringify(produitEnregistreDansLocalStorage));
                      exist = true;
                        //popupConfirmation();  
                    }
                }    
                    
                    // Si le produit n'existe pas le créer
                    if(exist == false) {
                     
                        produitEnregistreDansLocalStorage.push(articleChoisi);
                        localStorage.setItem('panierKey', JSON.stringify(produitEnregistreDansLocalStorage));  
                        //popupConfirmation(); 
                    } 
                    popupConfirmation()
               
            };
            
            /* indiquer le nombre d'article dans le panier */
            
            /* const stringArticleChoisi = JSON.stringify(articleChoisi)
            
            let getPanier = localStorage.getItem("panierKey");
            
            let numGetPanier = JSON.parse(getPanier);
            
            numGetPanier.push(stringArticleChoisi);
            
            let strNumGetPanier = JSON.stringify(numGetPanier);
            
            localStorage.setItem("panierKey", strNumGetPanier);

            let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem('panierKey'));
            
            alert("Votre article à bien été ajouté au panier");
            
            indicateurNbArticlePanier()
            
            for (let i = 0; i < produitEnregistreDansLocalStorage.length; i++) {
              if(produitEnregistreDansLocalStorage[i].id == articleChoisi.id){
                produitEnregistreDansLocalStorage[i].quantity = +produitEnregistreDansLocalStorage[i].quantity + +articleChoisi.quantity;
                  localStorage.setItem("panierKey", JSON.stringify(produitEnregistreDansLocalStorage));
                  exist = true;
                  //popupConfirmation();  
              }
            }   */     

          })
}


}));
}
