//Variable canapeArray récupée dans le localStorage
var canapeArray = JSON.parse(localStorage.getItem("canapeArray"));
var price = 0;

const cartItems = document.getElementById("cart__items");

/*L'utilisateur ne pourra pas modifier le prix, on le récupère dans l'API.
On utilise la méthode async/await pour afficher le prix une fois que le reste de la 
page sera chargée*/
const recupPrice = async(id) => {
  await fetch("http://localhost:3000/api/products/"+id)
  .then((response) => response.json())
  .then((data) => (price=data.price)); 
}

//Fonction pour afficher les produits qui ont été sélectionnés dans le DOM
async function productsSelectLocalStorage() {
  if(canapeArray){
    for (let i = 0; i < canapeArray.length; i++){
      await recupPrice(canapeArray[i].id);
      const TOTAL_PRICE = price * canapeArray[i].quantiteProduit;
      const codeHtml = `<article class="cart__item" data-id="${canapeArray[i].id}" data-color="${canapeArray[i].colorValue}">
      <div class="cart__item__img">
      <img src="${canapeArray[i].productImg}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
      <div class="cart__item__content__description">
      <h2>${canapeArray[i].productName}</h2>
      <p>${canapeArray[i].color}</p>
      <p>${TOTAL_PRICE} €</p>
      </div>
      <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canapeArray[i].quantiteProduit}">
      </div>
      <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
      </div>
      </div>
      </div>
      </article>`;
    document.getElementById('cart__items')
    .insertAdjacentHTML('beforeend',codeHtml);
    }
  }
modifyQtt();
deleteProduct();
totalQuantityPrice();
}
productsSelectLocalStorage();

//Fonction qui calcule la quantité totale et le prix total du panier
function totalQuantityPrice() {
  let totalPrice = 0;
  let totalQuantity = 0;
  if(canapeArray){
    for (let i = 0; i < canapeArray.length; i++){
      let total = canapeArray[i].price * parseInt(canapeArray[i].quantiteProduit, 10);
      totalPrice += total;
      totalQuantity += parseInt(canapeArray[i].quantiteProduit, 10);
  }
  document.getElementById("totalPrice").textContent = totalPrice;
  document.getElementById("totalQuantity").textContent = totalQuantity;
  }
  else {
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML ="Vous n'avez pas d'article dans votre panier";
    localStorage.clear();    
  }
}


function modifyQtt() {
  let itemQtt = document.querySelectorAll('.itemQuantity');
  for (let j = 0; j < itemQtt.length; j++) {
    itemQtt[j].addEventListener('change', (event) => {
    event.preventDefault();
    let itemNewQtt = itemQtt[j].value;
    const newcanapeArray = {
      id: canapeArray[j].id,
      productImg: canapeArray[j].productImg,
      productName: canapeArray[j].productName,
      color: canapeArray[j].color,
      price: canapeArray[j].price,   
      quantiteProduit: itemNewQtt,
    };
    canapeArray[j] = newcanapeArray;
    localStorage.setItem('product', JSON.stringify(canapeArray));
    alert('Votre panier est à jour.');
    totalQuantityPrice();
      })
  }
}


// Fonction pour la suppression d'un produit dans le panier par l'utilisateur, on recalcule le panier
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");
  for (let j = 0; j < btn_supprimer.length; j++){
    btn_supprimer[j].addEventListener("click" , (event) => {
      event.preventDefault();
      let idDelete = canapeArray[j].id;
      let colorDelete = canapeArray[j].color;
      canapeArray = canapeArray.filter( el => el.id !== idDelete || el.color !== colorDelete );
      localStorage.setItem("canapeArray", JSON.stringify(canapeArray));
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
      totalQuantityPrice();
    })
  }
}

  


/*---------------Formulaire-----------------*/
let cName, cPName, cMail, cAdd, cCity;
cName = cPName = cAdd = cCity = cMail = 0;
let products = [];
let contact = {};

const prenomValue = document.getElementById("firstName");
const nameValue = document.getElementById("lastName");
const addressValue = document.getElementById("address");
const cityValue = document.getElementById("city");
const emailValue = document.getElementById("email");
const subButton = document.getElementById("order");
 
//Formule pour vérifier la saisie du prénom
prenomValue.addEventListener("change", () => {
  const errorFirstName = document.getElementById("firstNameErrorMsg");
  if (!verifName(prenomValue.value)) {
    prenomValue.style.border = "2px solid red"
    errorFirstName.innerText = "Veuillez saisir votre prénom avec minimum 2 caractères !";
    cPName = 1;
    }
  else {
    prenomValue.style.border = "0";
    errorFirstName.innerText = "";
    cPName = 0;
  }
});

//Formule pour vérifier la saisie du nom
nameValue.addEventListener("change", () => {
  const errorName = document.getElementById("lastNameErrorMsg");
  if (!verifName(nameValue.value)) {
    nameValue.style.border = "2px solid red";
    errorName.innerText = "Veuillez saisir votre nom avec minimum 2 caractères !";
    cName = 1;
  }
  else {
    nameValue.style.border = "0";
    errorName.innerText = "";
    cName = 0;
  }
});

//Formule pour vérifier la saisie de l'adresse
addressValue.addEventListener("change", () => {
  const errorAddress = document.getElementById("addressErrorMsg");
  if (!verifAddress(addressValue.value)) {
    addressValue.style.border = "2px solid red";
    errorAddress.innerText = "Veuillez saisir une adresse correcte !";
    cAdd = 1;
  }
  else {
    addressValue.style.border = "0";
    errorAddress.innerText = "";
    cAdd = 0;
  }
});

//Formule pour vérifier la saisie de la ville
cityValue.addEventListener("change", () => {
  const errorCity = document.getElementById("cityErrorMsg");
  if (!verifCity(cityValue.value)) {
    cityValue.style.border = "2px solid red";
    errorCity.innerText = "Veuillez saisir un nom de ville valide !";
    cCity = 1;
  }
  else {
    cityValue.style.border = "0";
    errorCity.innerText = "";
    cCity = 0;
  }
});

//Formule pour vérifier la saisie de l'email
emailValue.addEventListener("change", () => {
  const errorEmail = document.getElementById("emailErrorMsg");
  if (!verifEmail(emailValue.value)) {
    emailValue.style.border = "2px solid red";
    errorEmail.innerText = "Veuillez saisir une adresse e-mail valide !";
    cMail = 1;
  }
  else {
    emailValue.style.border = "0";
    errorEmail.innerText = "";
    cMail = 0;
  }
});  


/*------------------------Commande------------------*/
subButton.addEventListener('click', (e) => {
  e.preventDefault(); 
  // On vérifie que tous les champs ont été correctement remplis avant l'envoi commande
  if (cPName == 0 && cName == 0 && cAdd == 0 && cCity == 0 && cMail == 0) {
    verificationFinale();
  }
  else {
    alert("Certains champs n'ont pas été renseignés correctement. Merci de vérifier les informations saisies.");
  }

  function verificationFinale() {
    // Si le localStorage a été vidé depuis la page panier il faut empêcher la commande :
    let isTherePanier = JSON.parse(localStorage.getItem("canapeArray"));
    if (isTherePanier == null || isTherePanier.length < 1) {
      alert("Une erreur est survenue. Votre panier est vide. Merci de le remplir avant de procéder au paiement.");
    }
    // Si le panier n'a pas été vidé on envoie la liste des id dans le tableau 'canapeArray'
    else {
      for (const ids of isTherePanier) {
          canapeArray.push(ids.idItem);
      }
      // On implémente l'objet contact
      contact.firstName = prenomValue.value;
      contact.lastName = nameValue.value;
      contact.address = addressValue.value;
      contact.city = cityValue.value;
      contact.email = emailValue.value; 
    requetePost();
    }
  }
});

// Requête POST envoyée au serveur pour obtenir l'id de commande.
function requetePost() {
  var canapeArray = []; 
  function validControl() {
    if (prenomValue && nameValue && addressValue && cityValue && emailValue) {
      for (let i = 0; i < canapeArray.length; i++) {
        canapeArray.push(canapeArray[i].id);
      }
      return true;
    }
    else if(!prenomValue || !nameValue || !addressValue || !cityValue || !emailValue){
      alert("Vous devez renseigner tous les champs !");
    }
    else {
      alert('Merci de revérifier les données du formulaire')
    }
  }
  validControl();

// je mets les valeurs du formulaire et les produits sélectionnés dans un objet...
function envoiCommande() {
  const sendFormData = {
    contact : {
      firstName : document.getElementById('firstName').value,
      lastName : document.getElementById('lastName').value,
      address : document.getElementById('address').value,
      city : document.getElementById('city').value,
      email : document.getElementById('email').value
    },
  products,
  }
  
//On envoie le formulaire au serveur avec la méthode POST
  fetch('http://localhost:3000/api/products/order',{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendFormData),
  })
    .then((response) => response.json())
    .then((data) => {
    document.location.href = `confirmation.html?id=${data.orderId}`;
    })
    .catch((error) => {
    alert ("Un problème a été rencontré lors de l'envoi du formulaire.");
    localStorage.clear();
    });
}
envoiCommande();
}

//Fonctions vérifications formulaire
function verifName(name) {
  return /^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-]{2,}$/.test(name);
};

function verifEmail(email) {
  return /([\w-\.]+@[\w\.\-]+\.{1}[\w]+)/.test(email);
};

function verifAddress(address) {
  return /^[a-zA-Z\d\s,'\-À-ÖØ-öø-ÿ\/]{2,}$/.test(address);
};

function verifCity(city) {
  return /^[a-zA-Z\s,'\-À-ÖØ-öø-ÿ\/]{2,}$/.test(city);
};