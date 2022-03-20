import React from "react";
import "../css/LearningOptions.css";

const LearningOptions = (props) => {
  const options = [
    { text: "Housing", handler: props.actionProvider.handleHouseList, id: 1 },
    { text: "Banking", handler: props.actionProvider.handleBankList, id: 2 },
    { text: "Important documents", handler: props.actionProvider.handleDocList, id: 3 },
    { text: "Connect with people", handler: () => {}, id: 4},
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