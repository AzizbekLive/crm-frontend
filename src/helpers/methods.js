export function decreaseColor(hexColor, alpha = '20') {
    if (!/^#([A-Fa-f0-9]{6})$/.test(hexColor)) {
        return '#000000';
    }

    return `${hexColor}${alpha}`;
}
