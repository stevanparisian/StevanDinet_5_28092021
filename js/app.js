createPanier()



// Création de Panier
function createPanier() {

    if (localStorage.getItem('panierKey') == null) {
        
        let panierArray = [];
        let panierArrayStr = JSON.stringify(panierArray);
        localStorage.setItem("panierKey", panierArrayStr);
        
    }
}


