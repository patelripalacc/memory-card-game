// Importing React, and the useState and useEffect hooks
import React, { useState, useEffect } from "react";
// Importing the CSS for the component
import "./MemoryGame.css";
// Importing a helper function to shuffle an array
import { shuffle } from "./helper/helperFunction";
// Importing a custom component that represents a single card in the game
import MemoryCard from "./MemoryCard";

function MemoryGame() {
  // An array of possible items that can appear on a card
  const items = ["🍎", "🍌", "🍒", "🍇", "🥝", "🥭", "🍊", "🍑", "🍐", "🍓"];
  // A state variable for an array of cards that is shuffled when the component is mounted
  const [cards, setCards] = useState(shuffle([...items, ...items]));
  // A state variable for an array of cards that the user has selected
  const [selectedCards, setSelectedCards] = useState([]);
  // A state variable for an array of cards that have been matched
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    // A useEffect hook that runs whenever the matchedCards or cards state variables change
    if (matchedCards.length === cards.length) {
      // If all the cards have been matched, show an alert message to congratulate the user
      alert("Congratulations, you won!");
    }
  }, [matchedCards, cards]);

  const handleCardClick = (index) => {
    if (selectedCards.length === 1 && selectedCards[0].index === index) {
      // If the user clicks the same card twice, do nothing
      return;
    }

    // Create a new card object with an index and an item from the cards array
    const card = { index, item: cards[index] };
    // Add the new card to the selectedCards state array
    setSelectedCards((prev) => [...prev, card]);

    if (selectedCards.length === 0) {
      // If this is the first card the user clicked, do nothing else for now
      return;
    }

    // If this is the second card the user clicked, check if the two cards match
    if (selectedCards[0].item === card.item) {
      // If they match, add both cards to the matchedCards state array
      setMatchedCards((prev) => [...prev, selectedCards[0], card]);
    } else {
      setTimeout(() => {
        // If they don't match, wait one second and then reset the selectedCards state array
        setSelectedCards([]);
      }, 1000);
    }
  };

  // The return statement renders the MemoryGame component
  return (
    <div className="container">
      <h1 className="h1">Memory Game</h1>
      <div className="MemoryGame">
        {cards.map((item, index) => (
          // Map over the cards state array and render a MemoryCard component for each one
          <MemoryCard
            key={index}
            index={index}
            item={item}
            isFlipped={selectedCards.some((card) => card.index === index)}
            isMatched={matchedCards.some((card) => card.index === index)}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
