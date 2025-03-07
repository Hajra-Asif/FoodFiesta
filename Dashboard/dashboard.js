// toggle

document.addEventListener("DOMContentLoaded", function () {
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  function toggleSidebar() {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  sidebarToggle.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);
});

let profilename = document.getElementById("profileTrigger");
// profilename.inner 

// cards

let fetchApi = async () => {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"
  );
  let jsonData = await response.json();
  return jsonData.meals || [];
};

// card
// function getData(foodItems) {
//     return `
//         <div class="col-12 col-lg-4">
//          <div class="card" data-rating="${foodItems.rating || 0}">
//               <div class="position-relative">
//                   <img src="${foodItems.strMealThumb}" class="card-img-top" alt="${foodItems.strMeal}">
//                   <div class="recipe-badge">
//                       <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 14l9-5-9-5-9 5 9 5z'/%3E%3Cpath d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'/%3E%3C/svg%3E" alt="Beginner">
//                   </div>
//               </div>
//               <div class="card-body">
//                   <div class="cardd">
//                       <span onclick="gfg(event, 1)" class="star">★</span>
//                       <span onclick="gfg(event, 2)" class="star">★</span>
//                       <span onclick="gfg(event, 3)" class="star">★</span>
//                       <span onclick="gfg(event, 4)" class="star">★</span>
//                       <span onclick="gfg(event, 5)" class="star">★</span>
//                   </div>
//                   <h5 class="recipe-title">${foodItems.strMeal}</h5>
//                   <div class="recipe-info">
//                       <span>
//                           <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37V7z'/%3E%3C/svg%3E" alt="Time"> 45mins
//                       </span>
//                       <span>
//                           <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E" alt="Servings"> 2 people
//                       </span>
//                       <span>
//                           <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 14l9-5-9-5-9 5 9 5z'/%3E%3Cpath d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'/%3E%3C/svg%3E" alt="Level"> Beginner
//                       </span>
//                   </div>
//                   <a href="detail-page.html?id=${foodItems.idMeal}" class="anchor text-decoration-none">
//                       <button class="btn-view">View Recipe</button>
//                   </a>
//               </div>
//           </div>
//           </div>

//         `;
// }

// let displayCards = async () => {
//     let container = document.getElementById('maincardcontainer');
//     let data = await fetchApi();

//     if (!data.length) {
//         container.innerHTML = "<p>No desserts found.</p>";
//         return;
//     }

//     // container.innerHTML = data.slice(9, 17).map(getData).join('');
// };

// displayCards();

// document.addEventListener("click", function (event) {
//     if (event.target.classList.contains("star")) {
//         let card = event.target.closest(".card");
//         let stars = card.querySelectorAll(".star");
//         let rating = Array.from(stars).indexOf(event.target) + 1;

//         // Remove previous ratings
//         stars.forEach(star => star.classList.remove("one", "two", "three", "four", "five"));

//         // Add new rating class up to the selected star
//         for (let i = 0; i < rating; i++) {
//             stars[i].classList.add(["one", "two", "three", "four", "five"][i]);
//         }

//         // Update the data-rating attribute
//         card.setAttribute("data-rating", rating);
//     }
// });

//   recent uploaded

async function fetchRecipes() {
  const container = document.querySelector(".sidebar-recipes");

  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"
    );
    const { meals } = await res.json();
    container.innerHTML = "<h2>Recently Uploaded</h2>";
  


    meals.slice(14, 18).forEach(({ strMeal, strMealThumb, idMeal }) => {
      container.innerHTML += `
                <div class="horizontal-recipe-card">
                    <img src="${strMealThumb}" class="h-card-img" alt="${strMeal}">
                    <div class="h-card-content">
                         <h4 class="h-recipe-title">${strMeal}</h4>
                         <div class="cardd">
                      <span onclick="gfg(event, 1)" class="star">★</span>
                      <span onclick="gfg(event, 2)" class="star">★</span>
                      <span onclick="gfg(event, 3)" class="star">★</span>
                      <span onclick="gfg(event, 4)" class="star">★</span>
                      <span onclick="gfg(event, 5)" class="star">★</span>
                  </div>
                   <a href="../Html/detailLunch.html?id=${idMeal}" class="anchor text-decoration-none">
              <button class="btn-view btn-side">View Recipe</button>`;
    });
  } catch (error) {
    container.innerHTML = "<p>Failed to load recipes. Try again later.</p>";
    console.log(error);

  }
}

function viewRecipe(id) {
  window.open(`https://www.themealdb.com/meal/${id}, "_blank"`);
}

document.addEventListener("DOMContentLoaded", fetchRecipes);

function gfg(e, rating) {
  const stars = e.target.parentElement.getElementsByClassName("h-star");
  const card = e.target.closest(".horizontal-recipe-card");

  card.dataset.rating = rating;

  for (let i = 0; i < stars.length; i++) {
    if (i < rating) {
      stars[i].style.color = "#FFB800";
    } else {
      stars[i].style.color = "#ccc";
    }
  }
}

// piechart

const ctx = document.getElementById("salesChart").getContext("2d");
const salesChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: [
      "Chicken Fajita Mac and Cheese",
      "Chicken Enchilada Casserole",
      "Chicken Handi",
    ],
    datasets: [
      {
        data: [78, 26, 17],
        backgroundColor: ["#384c6b", "#e28a2b", "#859bba"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
});
