import React, { useEffect, useMemo } from 'react';
import Flatpickr from 'react-flatpickr';
import { useTranslation } from 'react-i18next';
import UzbekLatin from 'flatpickr/dist/l10n/uz_latn.js';
import Russian from 'flatpickr/dist/l10n/ru.js';
// import 'flatpickr/dist/themes/dark.css';
// import 'flatpickr/dist/themes/light.css';
import { useLayoutStore } from '../../stores/layouts';
import { Label } from 'reactstrap';
const FormDatePicker = ({ ...props }) => {
    const { i18n } = useTranslation();
    const layoutModeType = useLayoutStore((s) => s.layoutModeType);

    useEffect(() => {
        const themeId = 'flatpickr-theme-style';

        // Remove existing theme <link> if exists
        const oldTheme = document.getElementById(themeId);
        if (oldTheme) oldTheme.remove();

        // Create new link tag for the selected theme
        const link = document.createElement('link');
        link.id = themeId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href =
            layoutModeType === 'dark'
                ? 'https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/dark.css'
                : 'https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/light.css';

        document.head.appendChild(link);
    }, [layoutModeType]);

    const options = useMemo(() => {
        const locales = {
            uz: UzbekLatin.uz_latn,
            ru: Russian.ru,
            // Add more as needed
        };

        return {
            locale: locales[i18n.language] || 'en', // fallback to uz
            enableTime: props?.enableTime,
            dateFormat: props?.enableTime ? 'Y-m-d H:i' : 'Y-m-d',
            defaultDate: new Date(),
        };
    }, [i18n.language]);

    return (
        <>
            {props?.label && <Label>{props.label}</Label>}
            <Flatpickr className="form-control" name={props.name} {...props} options={options} />
        </>
    );
};

export default FormDatePicker;
