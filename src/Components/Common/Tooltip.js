import React from 'react';
import './style.css';
const TooltipElement = ({ children, tooltipText, direction = '' }) => {
    return (
        <div className="tooltip-container">
            <span className={`tooltip-content ${direction}`}>{tooltipText}</span>
            {children}
        </div>
    );
};

export default TooltipElement;
