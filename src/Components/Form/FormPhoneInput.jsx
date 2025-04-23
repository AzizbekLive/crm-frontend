import Cleave from 'cleave.js/react';
import React, { forwardRef } from 'react';
import { FormFeedback, Label } from 'reactstrap';
const FormPhoneInput = forwardRef(({ validation, ...props }, ref) => {
    return (
        <>
            {props?.label && <Label>{props.label}</Label>}
            <Cleave
                ref={ref}
                options={{
                    prefix: '+998',
                    delimiter: '-',
                    blocks: [4, 2, 3, 2, 2],
                }}
                className={`form-control ${validation && validation.touched[props.name] && validation.errors[props.name] && 'is-invalid'} `}
                onChange={validation && validation.handleChange}
                onBlur={validation && validation.handleBlur}
                {...props}
            />
            {validation && validation.touched[props.name] && validation.errors[props.name] ? (
                <FormFeedback type="invalid">{validation.errors[props.name]}</FormFeedback>
            ) : null}
        </>
    );
});

export default FormPhoneInput;
