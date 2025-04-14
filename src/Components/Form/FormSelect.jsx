import React, { forwardRef } from 'react';
import { FormFeedback, Label } from 'reactstrap';

const FormSelect = forwardRef(({ validation, options, optionLabel = 'name', optionValue = 'id', ...props }, ref) => {
    return (
        <React.Fragment>
            <Label className="form-label">{props.label}</Label>
            <select
                ref={ref}
                name="category"
                {...props}
                className={`form-select ${validation && validation.touched[props.name] && validation.errors[props.name] ? 'is-invalid' : ''}`}
                onChange={validation && validation.handleChange}
                onBlur={validation && validation.handleBlur}
                value={(validation && validation.values[props.name]) || ''}>
                <option value="" key={-999}></option>
                {options.length > 0 &&
                    options.map((option) => (
                        <option key={option.id} value={option[optionValue]}>
                            {option[optionLabel]}
                        </option>
                    ))}
            </select>
            {validation && validation.touched[props.name] && validation.errors[props.name] ? (
                <FormFeedback type="invalid">{validation & validation.errors[props.name]}</FormFeedback>
            ) : null}
        </React.Fragment>
    );
});

export default FormSelect;
