const allPlantsContainer = document.getElementById("allPlantsContainer");
const categoriesContainer = document.getElementById("categoriesContainer");
const cartContainer = document.getElementById("cartContainer");

let addToCart = [];
const loadAllPlants = async () => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/plants`);
    const data = await res.json();
    showAllPlants(data.plants);
  } catch (error) {
    console.log(error);
  }
};

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
  const plantPrice = card.children[3].children[1].innerText; 
  
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


allPlantsContainer.addEventListener('click', (e) => {
  if (e.target.innerText === "Add to Cart") {
    handleCart(e);
  }
});

const showCart = (addToCart) => {
  cartContainer.innerHTML = ""; 

  addToCart.forEach(cart => {
    cartContainer.innerHTML += `
      <li class="flex justify-between items-center border-b py-2">
        <span class="font-medium">${cart.title}</span>
        <span class="font-bold text-green-600">${cart.price} x ${cart.quantity}</span>
      </li>
    `;
  });
};


