//Fonction pour récupèrer les "data" dans l'API avec la méthode fetch
function index(){
    fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((data) => {
      productHome(data);
    })
    .catch((error) => {
      console.log('Erreur :',error)
    });
  }

  index();

//Fonction qui affiche tous les articles dans le DOM
//Prend en paramètre l'objet products
function productHome(products){
  for(article of products){
    const codeHtml=
    `<a href="./product.html?id=${article._id}">
      <article>
        <img src="${article.imageUrl}" alt="${article.altTxt}">
        <h3 class="productName">${article.name}</h3>
        <p class="productDescription">${article.description}</p>
      </article>
    </a>`;
document.getElementById('items')
.insertAdjacentHTML('beforeend',codeHtml);
  }
} 


