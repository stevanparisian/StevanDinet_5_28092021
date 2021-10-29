/* Sélection de l'element pour insérer les cartes objets */

mainIndex()

function mainIndex() {

    const mainIndex = document.querySelector(".items");

    let urlApi = `http://localhost:3000/api/products/`;

    fetch(urlApi)
        .then(function (response) {

            return response.json();

        })
        .then(function (response) {

            const objets = response;

            /* Répartition des objets en forme de carte */

            creationCartePourProduits()

            function creationCartePourProduits() {
                for (let objet in objets) {

                    const urlForEachArticle = "product.html" + "?" + objets[objet]._id;

                    let objetCarte = document.createElement("div");
                    objetCarte.classList.add("a");
                    objetCarte.innerHTML =
                        `<a class="a" href=${urlForEachArticle} id=${objets[objet]._id}>
                <article>
                
                <img src=${objets[objet].imageUrl} alt = "image d'un canapé">
                
                <h3 class="productName">${objets[objet].name}</h3>
               
                
                </article>
                </a>
                `;
                    mainIndex.appendChild(objetCarte);
                }
            }
        })
}