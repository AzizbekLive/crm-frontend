import Cleave from 'cleave.js/react';
import React from 'react';
const FormPhoneInput = ({ ddClass, ...args }) => {
    return (
        <Cleave
            options={{
                prefix: '+998',
                delimiter: '-',
                blocks: [4, 2, 3, 2, 2],
            }}
            className={`form-control ${ddClass}`}
            {...args}
        />
    );
};

export default FormPhoneInput;
