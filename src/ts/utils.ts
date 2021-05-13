import { StyleObject } from './style';

/**
 * フォーカス可能な要素のセレクタ文字列
 */
export const FOCUSABLE_ELEMENTS =
    'button:not(.is-hide), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
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
 * body要素に対してis-fixedクラスを付与し、現在のスクロール値をtopプロパティに設定する
 */
export const windowLock = () => {
    const doc = document.body;
    const scrollHeight = window.pageYOffset;

    doc.style.width = '100%';
    doc.style.position = 'fixed';
    doc.style.top = `-${scrollHeight}px`;
};
/**
 * body要素のis-fixedクラスを削除し、topプロパティを初期化する
 */
export const windowUnLock = (scrollY: number) => {
    const doc = document.body;

    doc.style.width = '';
    doc.style.position = '';
    doc.style.top = '';
    window.scrollTo(0, scrollY);
};
/**
 * フォーカス管理クラス
 */
export class LockAt {
    wrapperElement: HTMLElement;
    focusableElements: NodeListOf<HTMLElement>;
    firstElement: HTMLElement;
    lastElement: HTMLElement;
    private loopEvent: (e: KeyboardEvent) => void = this.focusLoop.bind(this);

    constructor(wrapperElement: HTMLElement) {
        this.wrapperElement = wrapperElement;
        this.focusableElements = wrapperElement.querySelectorAll(
            FOCUSABLE_ELEMENTS
        );
        this.firstElement = this.focusableElements[0];
        this.lastElement = this.focusableElements[
            this.focusableElements.length - 1
        ];

        this.addEvents();
    }

    resetFocusableElements() {
        this.removeEvents();

        this.focusableElements = this.wrapperElement.querySelectorAll(
            FOCUSABLE_ELEMENTS
        );
        this.firstElement = this.focusableElements[0];
        this.lastElement = this.focusableElements[
            this.focusableElements.length - 1
        ];

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
