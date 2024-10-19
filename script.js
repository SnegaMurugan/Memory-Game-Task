const cardsArray = [
    { name: 'A', id: 1 }, { name: 'A', id: 2 },
    { name: 'B', id: 3 }, { name: 'B', id: 4 },
    { name: 'C', id: 5 }, { name: 'C', id: 6 },
    { name: 'D', id: 7 }, { name: 'D', id: 8 },
    { name: 'E', id: 9 }, { name: 'E', id: 10 },
    { name: 'F', id: 11 }, { name: 'F', id: 12 }
  ];
  
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matches = 0;
  const gameBoard = document.getElementById('gameBoard');
  
  // Create and shuffle cards at the start
  function createBoard() {
    // Shuffle the cards
    let shuffledCards = shuffle(cardsArray);
    
    // Create cards
    shuffledCards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.name = card.name;
  
      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');
  
      const cardFront = document.createElement('div');
      cardFront.classList.add('card-front');
      cardFront.textContent = card.name;
  
      const cardBack = document.createElement('div');
      cardBack.classList.add('card-back');
  
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      cardElement.appendChild(cardInner);
  
      cardElement.addEventListener('click', flipCard);
  
      gameBoard.appendChild(cardElement);
    });
  }
  
  // Shuffle function
  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }
  
  // Handle card flip
  function flipCard() {
    if (lockBoard || this === firstCard) return;
  
    this.classList.add('flip');
  
    if (!firstCard) {
      firstCard = this;
      return;
    }
  
    secondCard = this;
    lockBoard = true;
  
    checkForMatch();
  }
  
  // Check if cards match
  function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  
    isMatch ? disableCards() : unflipCards();
  }
  
  // Disable matched cards
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
    resetBoard();
    matches++;
    
    if (matches === cardsArray.length / 2) {
      setTimeout(() => alert('You won!'), 500);
    }
  }
  
  // Unflip cards if they don't match
  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1000);
  }
  
  // Reset first and second card selections
  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }
  
  // Restart game
  function restartGame() {
    gameBoard.innerHTML = '';
    matches = 0;
    createBoard();
  }
  
  // Start the game
  document.getElementById('restartBtn').addEventListener('click', restartGame);
  
  // Initialize game
  createBoard();
  