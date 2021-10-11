mainArticle()

function mainArticle() {

    const urlWindow = window.location.search;
    let idArticle = urlWindow.slice(1);
    let urlArticle = `http://localhost:3000/api/products/` + idArticle;

    const mainArticle = document.querySelector("#item");

    fetch(urlArticle)
    .then(response => response.json()

    .then(function(response) {

        const articleCanape = response;
        const colors = response.colors;

   

        createCartes();
        addColors();
        ajoutAuPanier();
        
     

        // Création des cartes
        function createCartes() {
            let articleCarte = document.createElement("div");
            articleCarte.classList.add("article");
            
    
            articleCarte.innerHTML = 
            `
            <div class="item__img">
              <img id="imageUrl" src=${articleCanape.imageUrl} alt="Photographie d'un canapé">
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
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>

            </div>
          `;
    
            mainArticle.appendChild(articleCarte);
        }
         // Ajout des couleurs dans les cartes
         function addColors() {

          const colorsIndex = document.querySelector('#colors');
          
          for (let nbColors = 0; nbColors < colors.length; nbColors++) {
              colorsIndex.innerHTML += 
              `
                    <option value="${colors[nbColors]}">${colors[nbColors]}</option>
                `;
          };
          
      }
        // Ajout l'article de la page au panier
        function ajoutAuPanier() {

          const buttonSendPanier = document.querySelector("button");
          

          buttonSendPanier.addEventListener("click", function(event) {
  
              event.preventDefault();

              const nameArticleChoisi = document.querySelector("h1");
              const urlArticleChoisi = window.location.search;
              const couleurChoisi = document.querySelector("#colors");
              const prixArticleChoisi = document.querySelector("#price");
              const imageArticleChoisi = document.querySelector("#imageUrl")
             
              
              const articleChoisi = {
                  name: nameArticleChoisi.textContent,
                  id: urlArticleChoisi.slice(1),
                  color: couleurChoisi.options[couleurChoisi.selectedIndex].text,
                  price: prixArticleChoisi.textContent,
                  imageUrl: imageArticleChoisi.textContent
              };

              const stringArticleChoisi = JSON.stringify(articleChoisi)

              let getPanier = localStorage.getItem("panierKey");

              let numGetPanier = JSON.parse(getPanier);

              numGetPanier.push(stringArticleChoisi);

              let strNumGetPanier = JSON.stringify(numGetPanier);

              localStorage.setItem("panierKey", strNumGetPanier);

              indicateurNbArticlePanier()
          }) 
      }    
          
    }));
}
