import React from "react";

export default function MemoryCard({
  // the index of the card in the array
  index,
  // the item (emoji) on the card
  item,
  // boolean indicating whether the card is currently flipped over
  isFlipped,
  // boolean indicating whether the card has been matched with its pair
  isMatched,
  // function to handle when the card is clicked
  onClick,
}) {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      // call the parent component's handleCardClick function with the index of the clicked card
      onClick(index);
    }
  };

  return (
    <div className="card">
      <div
        className={`MemoryCard ${isFlipped || isMatched ? "flipped" : ""}`}
        onClick={handleClick}
      >
        <div className="front"></div>
        <div className="back">{isFlipped || isMatched ? item : ""}</div>
        {/* if the card is flipped or matched, show the item (emoji) on the back */}
      </div>
    </div>
  );
}
