import React, { useEffect, useMemo } from 'react';
import Flatpickr from 'react-flatpickr';
import { useTranslation } from 'react-i18next';
import UzbekLatin from 'flatpickr/dist/l10n/uz_latn.js';
import Russian from 'flatpickr/dist/l10n/ru.js';
// import 'flatpickr/dist/themes/dark.css';
// import 'flatpickr/dist/themes/light.css';
import { useLayoutStore } from '../../stores/layouts';
const FormDatePicker = () => {
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
            enableTime: true,
            dateFormat: 'Y-m-d H:i',
            defaultDate: new Date(),
        };
    }, [i18n.language]);

    return <Flatpickr className="form-control" name="date" options={options} />;
};

export default FormDatePicker;
