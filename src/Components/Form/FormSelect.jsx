import React, { forwardRef, useEffect, useState } from 'react';
import { FormFeedback, Label } from 'reactstrap';

const FormSelect = forwardRef(({ validation, options, optionLabel = 'name', optionValue = 'id', ...props }, ref) => {
    const [optionList, setOptionList] = useState([]);

    useEffect(() => {
        setOptionList(options);
    }, [options]);
    return validation ? (
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
                {optionList?.length > 0 &&
                    optionList.map((option) => (
                        <option key={option.id} value={option[optionValue]}>
                            {option[optionLabel]}
                        </option>
                    ))}
            </select>
            {validation && validation.touched[props.name] && validation.errors[props.name] ? (
                <FormFeedback type="invalid">{validation & validation.errors[props.name]}</FormFeedback>
            ) : null}
        </React.Fragment>
    ) : (
        <React.Fragment>
            <Label className="form-label">{props.label}</Label>
            <select
                {...props}
                className={`form-select`}
                onChange={({ target }) => {
                    const { name, value } = target;
                    return props.onChange(name, value);
                }}>
                <option value="" key={-999}></option>
                {optionList?.length > 0 &&
                    optionList.map((option) => (
                        <option key={option.id} value={option[optionValue]}>
                            {option[optionLabel]}
                        </option>
                    ))}
            </select>
        </React.Fragment>
    );
});

export default FormSelect;
