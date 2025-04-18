import Cleave from 'cleave.js/react';
import React, { forwardRef } from 'react';
import { FormFeedback, Label } from 'reactstrap';

const FormMoneyInput = forwardRef(({ validation, ...props }, ref) => {
    return (
        <>
            {props?.label && <Label>{props.label}</Label>}
            <Cleave
                ref={ref}
                options={{
                    numeral: true,
                    numeralThousandsGroupStyle: 'thousand',
                }}
                onChange={validation.handleChange}
                value={validation.values[props.name] || ''}
                className={`form-control ${validation && validation.touched[props.name] && validation.errors[props.name] && 'is-invalid'} `}
                onBlur={validation && validation.handleBlur}
                {...props}
            />
            {validation && validation.touched[props.name] && validation.errors[props.name] ? (
                <FormFeedback type="invalid">{validation.errors[props.name]}</FormFeedback>
            ) : null}
        </>
    );
});

export default FormMoneyInput;
