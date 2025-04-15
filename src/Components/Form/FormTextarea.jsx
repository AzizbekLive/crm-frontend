import React, { forwardRef } from 'react';
import { FormFeedback, Label } from 'reactstrap';

const FormTextarea = forwardRef(({ validation, ...props }, ref) => {
    const isInvalid = validation && validation.touched[props.name] && validation.errors[props.name];
    return (
        <React.Fragment>
            <Label className="form-label">{props.label}</Label>
            <textarea
                className={`form-control no-resize ${isInvalid ? 'is-invalid' : ''}`}
                rows={5}
                ref={ref}
                onChange={validation && validation.handleChange}
                onBlur={validation && validation.handleBlur}
                value={(validation && validation.values[props.name]) || ''}
                {...props}></textarea>
            {isInvalid && <FormFeedback>{validation && validation.errors[props.name]}</FormFeedback>}
        </React.Fragment>
    );
});

export default FormTextarea;
