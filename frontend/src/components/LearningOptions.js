import React from "react";
import "../css/LearningOptions.css";

//calls functions in actionProvider to provide appropriate reply to user's input
const LearningOptions = (props) => {
  const options = [
    { text: "Housing", handler: props.actionProvider.handleHouseList, id: 1 },
    { text: "Banking", handler: props.actionProvider.handleBankList, id: 2 },
    { text: "Important documents", handler: props.actionProvider.handleDocList, id: 3 },
    { text: "Connecting with people", handler: props.actionProvider.handleComm, id: 4},
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;