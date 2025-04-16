import React from 'react';
import './style.css';
import emptyDataImage from '../../assets/images/empty-data.png';
import { Button } from 'reactstrap';
const EmptyData = ({ title, text, actionHandler }) => {
    return (
        <div className="emty-data">
            <img src={emptyDataImage} alt="" />
            <h2>{title || 'No customers available'}</h2>
            <p className="text-muted">{text || 'No customer information has been added. Add a new customer and enter their information.'}</p>

            {!!actionHandler && (
                <Button type="button" color="success" className="me-2">
                    <i className="ri-add-line me-1 align-bottom" />
                    Create New User
                </Button>
            )}
        </div>
    );
};

export default EmptyData;
