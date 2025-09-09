const allPlantsContainer = document.getElementById("allPlantsContainer");
const categoriesContainer = document.getElementById("categoriesContainer");
const cartContainer = document.getElementById("cartContainer");

let addToCart = [];
const loadAllPlants = async () => {
  manageSpinner(true);
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/plants`);
    const data = await res.json();
    showAllPlants(data.plants);
  } catch (error) {
    console.log(error);
  }
};

const manageSpinner = (status) => {
  if(status === true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("allPlantsContainer").classList.add("hidden")
  }
  else{
        document.getElementById("allPlantsContainer").classList.remove("hidden")
    document.getElementById("spinner").classList.add("hidden")
  }
}

const showAllPlants = (plants) => {
  // console.log(plants);
  allPlantsContainer.innerHTML = "";
  plants.forEach((plant) => {
    allPlantsContainer.innerHTML += `
    <div class="plant-card bg-white shadow-md rounded-xl p-4 flex flex-col h-[420px] ">
      <img src="${plant.image}" 
           alt="" 
           class="w-full h-42 object-cover rounded-lg" />
      
      <h1 onclick="loadPlantsInfo(${plant.id})" id="${plant.id}" class="text-xl font-semibold mt-2 cursor-pointer">${plant.name}</h1>
      <p class="text-gray-600 text-sm flex-grow overflow-hidden">
        ${plant.description}
      </p>

      <div class="flex justify-between items-center mt-3 py-3">
        
        <button class="btn btn-sm bg-[#DCFCE7] text-green-600 rounded-2xl">${plant.category}</button>
        <h2 class="font-bold text-lg">
          <i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}
        </h2>
      </div>
      <button class="buyButton btn btn-wide text-white bg-green-500 rounded-2xl flex items-center mx-auto">Add to Cart</button>
    </div>
  `;
  });
  manageSpinner(false);
  loadPlantsInfo();
  
};

loadAllPlants();

// Show Categories
const loadCategories = async () => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/categories`
    );
    const data = await res.json();
    showAllCategories(data.categories);
  } catch (error) {
    console.log(error);
  }
};

const showAllCategories = (categories) => {
  categoriesContainer.innerHTML = "";

  categories.forEach((category) => {
    // console.log(category);
    // console.log(category.id);
    categoriesContainer.innerHTML += `
      <li onclick="loadByCategory(${category.id})" id="${category.id}" class="category-item cursor-pointer hover:bg-green-600 rounded-md hover:text-white p-2">
        ${category.category_name}
      </li>
    `;
  });
};

loadCategories();

// Get plant by category
const loadByCategory = async (categoryId) => {
  manageSpinner(true)
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/category/${categoryId}`
    );
    const data = await res.json();
    showAllPlants(data.plants);

    document.querySelectorAll(".category-item").forEach((item) => {
      item.classList.remove("bg-green-600", "text-white");
    });
    const activeCategory = document.getElementById(categoryId);
    activeCategory.classList.add("bg-green-600", "text-white");
  } catch (error) {
    console.log(error);
  }
  
};

// For Modal

const loadPlantsInfo = async (plantId) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/plant/${plantId}`
    );
    const data = await res.json();

    // console.log(data)
    showPlantsInfo(data.plants);
  } catch (error) {
    console.log(error);
  }
};

const showPlantsInfo = (plant) => {
  document.getElementById("modal-title").innerText = plant.name;
  document.getElementById("modal-image").src = plant.image;
  document.getElementById("modal-description").innerText = plant.description;
  document.getElementById("modal-category").innerText = plant.category;
  document.getElementById("modal-price").innerHTML = `
    <i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}
  `;
  document.getElementById("my_modal_5").showModal();
};

loadPlantsInfo();

const handleCart = (e) => {
  const card = e.target.parentNode;
  const plantTitle = card.children[1].innerText;
  const plantPrice = parseFloat(card.children[3].children[1].innerText); // convert to number
  
  const current = addToCart.find(item => item.title === plantTitle);

  if (current) {
    current.quantity += 1;
  } else {
    addToCart.push({
      title: plantTitle,
      price: plantPrice,
      quantity: 1
    });
  }

  showCart(addToCart);
};

// Event listener for Add to Cart
allPlantsContainer.addEventListener('click', (e) => {
  if (e.target.innerText === "Add to Cart") {
    handleCart(e);
  }
});

const showCart = (addToCart) => {
  cartContainer.innerHTML = ""; 

  let total = 0;

  addToCart.forEach((cart, index) => {
    const itemTotal = cart.price * cart.quantity;
    total += itemTotal;

    cartContainer.innerHTML += `
      <div class="mt-2 flex justify-between items-center bg-[#DCFCE7] p-2">
        <div>
          <p class="font-bold text-xl">${cart.title}</p>
          <p class=" text-gray-500 mt-3">${cart.price} x ${cart.quantity} = ${itemTotal}</p>
        </div>  
        <i class="removeButtons fa-solid fa-xmark cursor-pointer" data-index="${index}"></i>
      </div>
    `;
  });

  // Show total at the bottom
  if (addToCart.length > 0) {
    cartContainer.innerHTML += `
      <div class="flex justify-between items-center">
      <div class="mt-4 p-2 font-bold text-lg text-right">
        Total:
      </div>
      <div><i class="fa-solid fa-bangladeshi-taka-sign"></i>${total}</div>
      </div>
    `;
  }
  const removeBtns = cartContainer.querySelectorAll(".removeButtons");
  removeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      if (addToCart[index].quantity > 1) {
        addToCart[index].quantity -= 1;
      } else {
        addToCart.splice(index, 1);
      }
      showCart(addToCart); 
    });
  });
};


