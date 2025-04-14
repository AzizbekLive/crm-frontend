import React, { forwardRef } from 'react';
import { FormFeedback, Label } from 'reactstrap';

const FormTextarea = forwardRef(({ validation, ...props }, ref) => {
    const isInvalid = validation.touched[props.name] && validation.errors[props.name];
    return (
        <React.Fragment>
            <Label className="form-label">{props.label}</Label>
            <textarea
                className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
                rows={5}
                ref={ref}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values[props.name] || ''}
                {...props}></textarea>
            {isInvalid && <FormFeedback>{validation.errors[props.name]}</FormFeedback>}
        </React.Fragment>
    );
});

export default FormTextarea;
