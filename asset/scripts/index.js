document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";
  let drinks = [];
  let currentDrinkIndex = 0;
  let intervalId;

  const drinkImage = document.getElementById("drink-image");
  const drinkName = document.getElementById("drink-name");
  const drinkDescription = document.getElementById("drink-description");
  const drinkDetails = document.querySelector(".drink-details");
  const viewDetailsButton = document.getElementById("view-details");
  const modal = document.getElementById("mymodal");
  const modalClose = document.getElementsByClassName("close")[0];
  const modalDrinkName = document.getElementById("modal-drink-name");
  const modalDrinkImage = document.getElementById("modal-drink-image");
  const modalDrinkDescription = document.getElementById(
    "modal-drink-description"
  );
  // const menuBar = document.getElementById('menu-bar')

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      drinks = data.drinks;
      showCurrentDrink();
      intervalId = setInterval(nextDrink, 3000);
    })
    .catch((error) => {
      console.error(error);
    });

  function showCurrentDrink() {
    if (drinks.length > 0) {
      const currentDrink = drinks[currentDrinkIndex];

      drinkImage.style.opacity = "0";
      drinkDetails.style.opacity = "0";
      drinkDetails.style.transform = "translateY(20px)";
      setTimeout(() => {
        drinkImage.src = currentDrink.strDrinkThumb;
        drinkName.textContent = currentDrink.strDrink;
        drinkDescription.textContent = currentDrink.strInstructions;

        drinkImage.style.opacity = "1";
        drinkDetails.style.opacity = "1";
        drinkDetails.style.transform = "translateY(0)";
      }, 500);
    }
  }

  // var menu = document.getElementById('menu');

  // menuBar.addEventListener('click', function() {
  //     if (menu.style.display === 'block') {
  //         menu.style.display = 'none';
  //     } else {
  //         menu.style.display = 'block';
  //     }
  // });

  function nextDrink() {
    currentDrinkIndex = (currentDrinkIndex + 1) % drinks.length;
    showCurrentDrink();
  }

  function prevDrink() {
    currentDrinkIndex = (currentDrinkIndex - 1 + drinks.length) % drinks.length;
    showCurrentDrink();
  }

  document.getElementById("prev").addEventListener("click", () => {
    prevDrink();
  });

  document.getElementById("next").addEventListener("click", () => {
    nextDrink();
  });

  viewDetailsButton.addEventListener("click", () => {
    const currentDrink = drinks[currentDrinkIndex];

    modalDrinkName.textContent = currentDrink.strDrink;
    modalDrinkImage.src = currentDrink.strDrinkThumb;
    modalDrinkDescription.textContent = currentDrink.strInstructions;

    const stepsList = document.createElement("ul");
    const steps = currentDrink.strInstructions.split(".");
    steps.forEach((step, index) => {
      if (step.trim()) {
        const stepItem = document.createElement("li");
        stepItem.textContent = `Step ${index + 1}: ${step.trim()}`;
        stepsList.appendChild(stepItem);
      }
    });

    modalsteps.innerHTML = "";
    modalsteps.appendChild(stepsList);

    modal.style.display = "block";

    clearInterval(intervalId);
  });

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
    intervalId = setInterval(nextDrink, 3000);
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      intervalId = setInterval(nextDrink, 3000);
    }
  });

  drinkImage.addEventListener("click", () => {
    if (drinkDetails.style.opacity === "1") {
      drinkDetails.style.opacity = "0";
      drinkDetails.style.transform = "translateY(20px)";
    } else {
      drinkDetails.style.opacity = "1";
      drinkDetails.style.transform = "translateY(0)";
    }
  });
});
