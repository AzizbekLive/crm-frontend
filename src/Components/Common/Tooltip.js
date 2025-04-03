import React from 'react';
import './style.css';
const TooltipElement = ({ children, tooltipText }) => {
    return (
        <div className="tooltip-container">
            <span className="tooltip-content">{tooltipText}</span>
            {children}
        </div>
    );
};

export default TooltipElement;
