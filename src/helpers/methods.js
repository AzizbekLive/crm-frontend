export function decreaseColor(hexColor, alpha = '20') {
    if (!/^#([A-Fa-f0-9]{6})$/.test(hexColor)) {
        return '#000000';
    }

    return `${hexColor}${alpha}`;
}

export function formatUZS(amount, noText) {
    if (!amount) return noText ? '0' : 'UZS 0';

    const formatted = new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'UZS',
        minimumFractionDigits: 0,
    }).format(amount);

    return noText ? formatted.replace('UZS ', '') : formatted;
}
