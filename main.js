document.querySelector(".button-controls span").onclick = () => {
  // Get the user Name
  let userName = prompt("Enter Your Name");

  // Check if the user name is empty or not

  if (userName == undefined || userName == "") {
    document.querySelector(".name span").innerHTML = "unknown";
  } else {
    document.querySelector(".name span").innerHTML = userName;
  }

  // Remove the splash page

  document.querySelector(".button-controls").remove();
  
  // show All cards 
  blocks.forEach((block) => {
    block.classList.add("is-clicked");
    setTimeout(() => {
      block.classList.remove("is-clicked");
    }, 5000);
  });
};

// effect deuration

let duration = 1000;

let blocksContainer = document.querySelector(".box-container");

// Create array from the blocks container
let blocks = Array.from(blocksContainer.children);

// Order Range
let orderRange = Array.from(Array(blocks.length).keys());

// Suffle Order

shuffleOrder(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", () => {
    isFlipped(block);
  });
});

function shuffleOrder(array) {
  let current = array.length,
    tempNumber,
    random;

  while (current > 0) {
    // get random number
    random = Math.floor(Math.random() * current);

    // decrease current by one
    current--;

    tempNumber = array[current];

    // random = current
    array[current] = array[random];
    //current = random

    array[random] = tempNumber;
  }
}

function isFlipped(selectedCard) {
  // Add is-clicked class to the card
  selectedCard.classList.add("is-clicked");

  // add the selected cards to one var
  let allSelectedCards = blocks.filter((flippedCards) =>
    flippedCards.classList.contains("is-clicked")
  );
  if (allSelectedCards.length === 2) {
    stopClicking();
    matchedCards(allSelectedCards[0], allSelectedCards[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-click");
  setTimeout(() => {
    blocksContainer.classList.remove("no-click");
  }, duration);
}

function matchedCards(firstCard, secondCard) {
  let tries = document.querySelector(".tries span");

  if (firstCard.dataset.social === secondCard.dataset.social) {
    firstCard.classList.remove("is-clicked");
    secondCard.classList.remove("is-clicked");

    firstCard.classList.add("has-match");
    secondCard.classList.add("has-match");
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      firstCard.classList.remove("is-clicked");
      secondCard.classList.remove("is-clicked");
    }, duration);
  }
}