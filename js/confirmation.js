messageCommande()


function messageCommande() {

    localStorage.removeItem("panierKey");

    let orderIdOfOrder = localStorage.getItem("orderKey");
    let priceOfOrder = localStorage.getItem("totalKey");

    let mainCommande = document.querySelector(".confirmation");
    
    let messageOrderId = document.createElement("div");
    messageOrderId.classList.add("message");
    messageOrderId.innerHTML =
    `
    <p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId">${orderIdOfOrder}</span></p>`;

    mainCommande.appendChild(messageOrderId);

}

