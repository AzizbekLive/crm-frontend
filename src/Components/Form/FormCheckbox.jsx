import React, { forwardRef } from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';
const FormCheckbox = forwardRef(({ validation, ...props }, ref) => {
    return (
        <React.Fragment>
            <div className="form-check form-check-outline form-check-success">
                <Input ref={ref} className="form-check-input" type="checkbox" id={`formCheck-${props.value}`} {...props} />
                <Label className="form-check-label" htmlFor={`formCheck-${props.value}`}>
                    {props.label}
                </Label>
            </div>
            {validation && validation.touched[props.name] && validation.errors[props.name] ? (
                <FormFeedback type="invalid">{validation.errors[props.name]}</FormFeedback>
            ) : null}
        </React.Fragment>
    );
});

export default FormCheckbox;