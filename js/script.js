mainIndex()


function mainIndex(){

    const mainIndex = document.querySelector(".items");

    let urlApi = `http://localhost:3000/api/products/`;

    fetch(urlApi)
    .then(function(response) {

        return response.json();

    })
    .then(function(response) {

        const objets = response;
       

        creationCartePourProduits()
        
        
        function creationCartePourProduits() {
            // Répartition des objets en forme de carte
            for (let objet in objets) {
            
               

                
                const urlForEachArticle = "product.html" + "?" + objets[objet]._id;
            
                let objetCarte = document.createElement("div");
                objetCarte.classList.add("a");
                objetCarte.innerHTML = 
                `<a class="a" href=${urlForEachArticle} id=${objets[objet]._id} alt = "image d'un canapé">
                <article>
                
                <img src=${objets[objet].imageUrl}>
                
                <h3 class="productName">${objets[objet].name}</h3>
               
                
                </article>
                </a>
                `;

               

        
                mainIndex.appendChild(objetCarte);
            }
        }
    })
    
}   