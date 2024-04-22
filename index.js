document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
  let drinks = []
  let currentDrinkIndex = 0
  let autoSwitch = true

  const drinkImage = document.getElementById('drink-image')
  const drinkName = document.getElementById('drink-name')
  const drinkDescription = document.getElementById('drink-description')
  const drinkDetails = document.querySelector('.drink-details')

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      drinks = data.drinks
      showCurrentDrink()
      if (autoSwitch) {
        setInterval(nextDrink, 2000)
      }
    })
    .catch((error) => {
      console.error(
        error
      )
    })

  function showCurrentDrink() {
    if (drinks.length > 0) {
      const currentDrink = drinks[currentDrinkIndex]
      drinkImage.src = currentDrink.strDrinkThumb
      drinkName.textContent = currentDrink.strDrink
      drinkDescription.textContent = currentDrink.strInstructions

      drinkDetails.style.opacity = '0'
      drinkDetails.style.transform = 'translateY(20px)'
      setTimeout(() => {
        drinkDetails.style.opacity = '1'
        drinkDetails.style.transform = 'translateY(0)'
      }, 10)
    }
  }

  function nextDrink() {
    currentDrinkIndex = (currentDrinkIndex + 1) % drinks.length
    showCurrentDrink()
  }

  document.getElementById('prev').addEventListener('click', () => {
    currentDrinkIndex = (currentDrinkIndex - 1 + drinks.length) % drinks.length
    showCurrentDrink()
    clearInterval(autoSwitch)
    autoSwitch = false
  })

  document.getElementById('next').addEventListener('click', () => {
    nextDrink()
    clearInterval(autoSwitch)
    autoSwitch = false
  })

  document.getElementById('details-btn').addEventListener('click', () => {
    drinkDetails.style.transform = 'translateY(0)'
    drinkDetails.style.opacity = '1'
  })
})
