createPanier()
indicateurNbArticlePanier()


// Création de Panier
function createPanier() {

    if (localStorage.getItem('panierKey') == null) {
        
        let panierArray = [];
        let panierArrayStr = JSON.stringify(panierArray);
        localStorage.setItem("panierKey", panierArrayStr);
       
    }
}



// Indicateur du nombre d'articles dans le panier
function indicateurNbArticlePanier() {

    let getPanier = localStorage.getItem("panierKey");

    let arrayGetPanier = JSON.parse(getPanier);
    const nbArticleInPanier = arrayGetPanier.length;
    
    if (nbArticleInPanier > 0) {

        const headerReload = document.querySelector(".panier");
        headerReload.innerHTML =
        `
                <li>Panier</li>
                <div class="nb-articles cache"> ${nbArticleInPanier} </div>
                <i class="fas fa-shopping-basket"></i>
        
        `;

        let affichageNbArticlesPanier = document.querySelector(".nb-articles");
        affichageNbArticlesPanier.classList.remove("cache");
    }
}