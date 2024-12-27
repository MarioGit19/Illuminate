import React from "react";
import "./SuccessAnimation.css";

const SuccessAnimation = () => {
  return (
    <div className="success-animation-overlay">
      <div className="success-animation-container">
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessAnimation;
