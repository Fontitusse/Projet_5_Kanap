//On récupère l'URL courante de la page,
//Avec URLSearchParams on récupère l'identifiant de la commande
document.getElementById("orderId").innerHTML = new URLSearchParams(location.search).get("id");
localStorage.clear();