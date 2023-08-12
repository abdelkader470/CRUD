var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productCountInput = document.getElementById("productCountInput");
var mainBtn = document.getElementById("mainBtn");
var mood = "create";
var productContainer;
var tmp;
if (localStorage.getItem("myProducts") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("myProducts"));
  displayProduct();
}
function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productCountInput.value,
  };
  if (mood === "create") {
    productContainer.push(product);
    localStorage.setItem("myProducts", JSON.stringify(productContainer));
    clearForm();
    displayProduct();
  } else {
    productContainer[tmp] = product;
    localStorage.setItem("myProducts", JSON.stringify(productContainer));
    clearForm();
    displayProduct();
    mainBtn.innerHTML = "addProduct";
    mood = "create";
  }
}
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productCountInput.value = "";
}
function displayProduct() {
  var markUp = "";
  for (var i = 0; i < productContainer.length; i++) {
    markUp += `
    <tr>
    <td>${i + 1}</td>
          <td>${productContainer[i].name}</td>
          <td>${productContainer[i].price}</td>
          <td>${productContainer[i].category}</td>
          <td>${productContainer[i].desc}</td>
          <td><button onclick="changeFormForUpdate(${i})" class="btn btn-outline-warning">Update</button></td>
          <td><button onclick="deleteProduct(${i})"  class="btn btn-outline-danger">Delete</button></td>
          </tr>
    `;
  }
  document.getElementById("tBody").innerHTML = markUp;
}
function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);
  localStorage.setItem("myProducts", JSON.stringify(productContainer));
  displayProduct();
}
function searchProduct(searchTerm) {
  markUp = ``;
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true ||
      productContainer[i].category
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      markUp += `
      <tr>
    <td>${i + 1}</td>
          <td>${productContainer[i].name}</td>
          <td>${productContainer[i].price}</td>
          <td>${productContainer[i].category}</td>
          <td>${productContainer[i].desc}</td>
          <td><button  class="btn btn-outline-warning">Update</button></td>
          <td><button onclick="deleteProduct(${i})"  class="btn btn-outline-danger">Delete</button></td>
          </tr>
    `;
    }
  }
  document.getElementById("tBody").innerHTML = markUp;
}
function changeFormForUpdate(i) {
  productNameInput.value = productContainer[i].name;
  productPriceInput.value = productContainer[i].price;
  productCategoryInput.value = productContainer[i].category;
  productCountInput.value = productContainer[i].desc;
  mainBtn.innerHTML = "Update";
  mood = "update";
  tmp = i;
}
