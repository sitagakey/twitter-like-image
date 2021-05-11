import { StyleObject } from './style';

/**
 * styleObjectを元に、styleStringを生成する
 * @param styleObject
 */
export const styleObjectToStyleString = (styleObject: StyleObject): string => {
    let styleString = '';

    for (const [selector, valueObject] of Object.entries(styleObject)) {
        styleString += `${selector} {`;

        for (const [property, value] of Object.entries(valueObject)) {
            styleString += `${lowerCamelCaseToKebabCase(property)}: ${value};`;
        }

        styleString += `}`;
    }

    return styleString;
};
/**
 * styleStringを元に、styleElementを生成する
 * @param styleString
 */
export const styleStringToStyleElement = (styleString: string): HTMLStyleElement => {
    const styleElement = document.createElement('style');
    
    styleElement.insertAdjacentText('beforeend', styleString);

    return styleElement;
};
/**
 * 文字列をローワーキャメルケースからケバブケースに変換する
 * @param string 変換したい文字列
 */
export const lowerCamelCaseToKebabCase = (string: string): string => {
    return string.replace(/(?!=[A-Z]|^.)([A-Z])/g, (targetString) => {
        return `-${targetString.charAt(0).toLowerCase()}`;
    })
};
/**
 * 任意のHTMLElementを生成する
 * @param tagName
 * @param attrObject
 * @param [children[]]
 * @returns 
 */
export const createElement = <T extends HTMLElement> (
    tagName:string,
    attrObject: {[key: string]: string},
    children?: HTMLElement[]
): T => {
    const el = document.createElement(tagName) as T;

    for (const [key, value] of Object.entries(attrObject)) {
        el.setAttribute(key, value);
    }

    if (children && children.length > 0) {
        children.forEach((element) => {
            el.append(element);
        });
    }

    return el;
};