import React, { forwardRef } from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';

const FormInput = forwardRef(({ validation, ...props }, ref) => {
    return (
        <React.Fragment>
            {props?.label && <Label className="form-label">{props.label}</Label>}
            <Input
                ref={ref}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values[props.name] || ''}
                invalid={validation.touched[props.name] && validation.errors[props.name] ? true : false}
                {...props}
            />
            {validation.touched[props.name] && validation.errors[props.name] ? (
                <FormFeedback type="invalid">{validation.errors[props.name]}</FormFeedback>
            ) : null}
        </React.Fragment>
    );
});

export default FormInput;
