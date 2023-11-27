/*On cherche la valeur de l'id du canapé choisi que
l'on ajoute à l'URL courante avec la méthode URLSearchParams*/
const productId = new URLSearchParams(location.search).get('id');
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + productId;

/*Fonction pour afficher l'article choisi avec la méthode fetch qui récupère l'URL de l'article*/
function getProductById () {
  fetch(objectURL) 
  .then((response) => response.json())
  .then((data) => canapCarte(data));
}
getProductById();

//Fonction construction de la carte du canapé choisi, on écrit dans le DOM
function canapCarte (product) {
  let img = document.querySelector("div.item__img");
  img.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  let name = document.getElementById("title");
  name.innerHTML = `${product.name}`;
  let price = document.getElementById("price");
  price.innerHTML = `${product.price}`;
  let description = document.getElementById("description");
  description.innerHTML = `${product.description}`;
  let color = document.getElementById("colors");
  //Boucle for pour récupérer toutes les couleurs disponible de l'article
  for (let i in product.colors) {
    color.options[color.options.length] = new Option(
      product.colors[i],
      product.colors[i]
    );
  }

 

const envoyerPanier = document.getElementById('addToCart');

//Fonction au click de l'utilisateur avec addEventListener("click"), qui écoute l'évènement
envoyerPanier.addEventListener("click", (event) => {
// Evite le rechargement de la page
  event.preventDefault();

//On écrit les éléments color, quantity dans le DOM
let color = document.getElementById('colors');
let quantiteProduit = document.getElementById('quantity');

/*Si la quantité n'est pas égale à 0 et la couleur n'est pas égale à rien,
on construit l'objet optionsProduit, on transforme la valeur de quantité en nombre
avec la méthode Number*/
if (quantiteProduit != 0 && color.value != '') {
let optionsProduit = {
  id:productId,
  productName:product.name,
  productImg:product.imageUrl,
  price:product.price,
  color:color.value,
  quantiteProduit:Number(quantiteProduit.value),
}
/*Le tableau canapeArray va être lu avec JSON.parse(localStorage.getItem)*/
let canapeArray = JSON.parse(localStorage.getItem("canapeArray"));

/*Fonction récupère dans le tableau la couleur et l'id pour comparer 
les produits choisis, s'ils sont identiques alors on les ajoute dans l'élément id "quantity"
On transforme le tableau en String et on l'ajoute dans localStorage (set).
Si les valeurs colori et quantité ne sont pas remplis, on affiche une alerte.*/
if(canapeArray===null){
canapeArray=[];
}
let search = false;
canapeArray.forEach(element => {
if(element.color===color.value && element.id===productId) {
  document.getElementById("quantity").innerHTML =
  element.quantiteProduit += Number(quantiteProduit.value);
  search=true;
}
});
if(!search){
  canapeArray.push(optionsProduit);
}
localStorage.setItem("canapeArray", JSON.stringify(canapeArray));
alert(`Votre article a bien été ajouté au panier !`);
window.location.href='../html/index.html';
}
else{
  alert('Veuillez vérifier les champs quantité et couleur');
}
});
};