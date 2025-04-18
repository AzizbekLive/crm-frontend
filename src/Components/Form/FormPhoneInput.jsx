import Cleave from 'cleave.js/react';
import React from 'react';
import { Label } from 'reactstrap';
const FormPhoneInput = ({ ddClass, ...args }) => {
    return (
        <>
            {args?.label && <Label>{args.label}</Label>}
            <Cleave
                options={{
                    prefix: '+998',
                    delimiter: '-',
                    blocks: [4, 2, 3, 2, 2],
                }}
                className={`form-control ${ddClass}`}
                {...args}
            />
        </>
    );
};

export default FormPhoneInput;
