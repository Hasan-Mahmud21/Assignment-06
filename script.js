const allPlantsContainer = document.getElementById("allPlantsContainer");
const categoriesContainer = document.getElementById("categoriesContainer");


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
plants.forEach(plant => {
  allPlantsContainer.innerHTML += `
    <div class="plant-card bg-white shadow-md rounded-xl p-4 flex flex-col h-[420px] ">
      <img src="${plant.image}" 
           alt="" 
           class="w-full h-42 object-cover rounded-lg" />
      
      <h1 class="text-xl font-semibold mt-2">${plant.name}</h1>
      <p class="text-gray-600 text-sm flex-grow overflow-hidden">
        ${plant.description}
      </p>

      <div class="flex justify-between items-center mt-3 py-3">
        
        <button class="btn btn-sm bg-[#DCFCE7] text-green-600 rounded-2xl">${plant.category}</button>
        <h2 class="font-bold text-lg">
          <i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}
        </h2>
      </div>
      <button class="btn btn-wide text-white bg-green-500 rounded-2xl flex items-center mx-auto">Add to Cart</button>
    </div>
  `;
});

};

loadAllPlants();



// Show Categories
const loadCategories = async () => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/categories`);
    const data = await res.json();
    showAllCategories(data.categories);
  } catch (error) {
    console.log(error);
  }
};

const showAllCategories = (categories) => {
  categoriesContainer.innerHTML = "";

  categories.forEach(category => {
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
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`);
    const data = await res.json();
    showAllPlants(data.plants);

    
    document.querySelectorAll(".category-item").forEach(item => {
      item.classList.remove("bg-green-600", "text-white");
    });
    const activeCategory = document.getElementById(categoryId);
    activeCategory.classList.add("bg-green-600", "text-white");

  } catch (error) {
    console.log(error);
  }
};


