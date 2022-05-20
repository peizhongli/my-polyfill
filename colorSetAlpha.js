const HEX_EXP = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
const RGB_EXP = /rgba?\(([\s\S]*)\)/;

const setColorWithAlpha = (color = '', alpha = 1) => {
    if (!color) {
        return 'rgba(255,255,255,1)';
    }
    // hex 模式
    if (HEX_EXP.test(color)) {
        let R = 255;
        let G = 255;
        let B = 255;
        if (color.length === 4) {
            const generateTwoSameWord = color => color + '' + color;
            R = parseInt('0x' + generateTwoSameWord(color.slice(1, 2)));
            G = parseInt('0x' + generateTwoSameWord(color.slice(2, 3)));
            B = parseInt('0x' + generateTwoSameWord(color.slice(3, 4)));
        }
        else if (color.length === 7) {
            R = parseInt('0x' + color.slice(1, 3));
            G = parseInt('0x' + color.slice(3, 5));
            B = parseInt('0x' + color.slice(5, 7));
        }
        return `rgba(${R},${G},${B},${alpha})`;
    }
    // rgb 模式
    const rgbVal = RGB_EXP.exec(color)[1];
    const [R = 255, G = 255, B = 255] = rgbVal.split(',').map(item => {
        return item.replace(/[^0-9]/ig, '');
    });
    return `rgba(${R},${G},${B},${alpha})`;
};
