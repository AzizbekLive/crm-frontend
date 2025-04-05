import React, { useState } from 'react';
import { Sketch } from '@uiw/react-color';

export default function ColorPicker({ defaultValue, changeColor }) {
    const [hex, setHex] = useState(defaultValue);

    const onChange = (hex) => {
        setHex(hex);
        changeColor(hex);
    };

    return (
        <React.Fragment>
            <Sketch color={hex} onChange={(color) => onChange(color.hex)} />
        </React.Fragment>
    );
}
