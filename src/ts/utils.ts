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
/**
 * 文字列で表された配列を通常の配列として返す
 * @param attrName
 */
export const getAttrStrArr = (element: Element, attrName :string) => {
    const attrArr = element.getAttribute(attrName)?.replace(/\s/g, '').split(',');
    if (!attrArr || attrArr.length < 1 || attrArr.length > 4) {
        throw new Error(`Something is wrong of ${attrName} attribute.`)
    }

    return attrArr;
};
/**
 * body要素を現在のスクロール値で固定する
 */
export const windowLock = () => {
    const doc = document.body;
    const scrollHeight = window.pageYOffset;

    doc.style.width = '100%';
    doc.style.position = 'fixed';
    doc.style.top = `-${scrollHeight}px`;
};
/**
 * body要素の固定を解く
 */
export const windowUnLock = () => {
    const doc = document.body;
    const top = doc.style.top ? Math.abs(parseInt(doc.style.top, 10)) : 0;

    doc.style.width = '';
    doc.style.position = '';
    doc.style.top = '';
    window.scrollTo(0, top);
};
/**
 * フォーカス可能な要素のセレクタ文字列
 */
export const FOCUSABLE_ELEMENTS = 'button:not(.is-hide), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
/**
 * フォーカス管理クラス
 */
export class LookAt {
    wrapperElement: HTMLElement;
    focusableElements: NodeListOf<HTMLElement>;
    firstElement: HTMLElement;
    lastElement: HTMLElement;
    mutationObserver: MutationObserver;
    private loopEvent: (e: KeyboardEvent) => void = this.focusLoop.bind(this);

    constructor(wrapperElement: HTMLElement) {
        this.wrapperElement = wrapperElement;
        this.mutationObserver = new MutationObserver(this.reset.bind(this));
        this.focusableElements = this.wrapperElement.querySelectorAll(FOCUSABLE_ELEMENTS);
        this.firstElement = this.focusableElements[0];
        this.lastElement = this.focusableElements[this.focusableElements.length - 1];
        this.focusableElements.forEach((item) => {
            this.mutationObserver.observe(item, {
                attributes: true,
            });
        });
    }
    /**
     * 各種要素とイベントを設定しなおす
     */
    reset() {
        this.resetEvents();
        this.resetFocusableElements();
    }
    /**
     * 各種要素を設定しなおす
     */
    resetFocusableElements() {
        this.focusableElements = this.wrapperElement.querySelectorAll(
            FOCUSABLE_ELEMENTS
        );
        this.firstElement = this.focusableElements[0];
        this.lastElement = this.focusableElements[
            this.focusableElements.length - 1
        ];
    }
    /**
     * イベントを設定しなおす
     */
    resetEvents() {
        this.removeEvents();
        this.addEvents();
    }
    /**
     * 対象要素にイベントハンドラを追加する
     */
    addEvents() {
        this.firstElement.addEventListener('keydown', this.loopEvent);
        this.lastElement.addEventListener('keydown', this.loopEvent);
    }
    /**
     * 対象要素のイベントハンドラを削除する
     */
    removeEvents() {
        this.firstElement.removeEventListener('keydown', this.loopEvent);
        this.lastElement.removeEventListener('keydown', this.loopEvent);
    }
    /**
     * 対象要素間でフォーカスをループさせる
     */
    focusLoop(e: KeyboardEvent) {
        const key = e.key;
        const onTab = key === 'Tab';
        const onShift = e.shiftKey;
        const target = e.target;
        const isFirstElement = target === this.firstElement;
        const isLastElement = target === this.lastElement;

        if (onTab && onShift && isFirstElement) {
            e.preventDefault();
            this.lastElement.focus();
        } else if (onTab && !onShift && isLastElement) {
            e.preventDefault();
            this.firstElement.focus();
        }
    }
}
