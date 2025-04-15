import React, { useState } from 'react';
import { Sketch } from '@uiw/react-color';
import { useTranslation } from 'react-i18next';
import { Button } from 'reactstrap';

export default function ColorPicker({ defaultValue, changeColor }) {
    const [hex, setHex] = useState(defaultValue);
    const { t } = useTranslation();

    const onChange = (hex) => {
        setHex(hex);
    };

    const onSubmit = () => {
        changeColor(hex);
    };

    const onCancel = () => {
        setHex(defaultValue);
    };

    return (
        <React.Fragment>
            <Sketch color={hex} onChange={(color) => onChange(color.hex)} />
            <div className="d-flex justify-content-end gap-1 mt-2">
                <Button size="sm" color="warning" onClick={onCancel}>
                    {t('Cancel')}
                </Button>
                <Button size="sm" onClick={onSubmit}>
                    {t('Submit')}
                </Button>
            </div>
        </React.Fragment>
    );
}
