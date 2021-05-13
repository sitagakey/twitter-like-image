import { StyleObject } from './style';
/**
 * フォーカス可能な要素のセレクタ文字列
 */
export declare const FOCUSABLE_ELEMENTS = "button:not(.is-hide), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex=\"-1\"])";
/**
 * styleObjectを元に、styleStringを生成する
 * @param styleObject
 */
export declare const styleObjectToStyleString: (styleObject: StyleObject) => string;
/**
 * styleStringを元に、styleElementを生成する
 * @param styleString
 */
export declare const styleStringToStyleElement: (styleString: string) => HTMLStyleElement;
/**
 * 文字列をローワーキャメルケースからケバブケースに変換する
 * @param string 変換したい文字列
 */
export declare const lowerCamelCaseToKebabCase: (string: string) => string;
/**
 * 任意のHTMLElementを生成する
 * @param tagName
 * @param attrObject
 * @param [children[]]
 * @returns
 */
export declare const createElement: <T extends HTMLElement>(tagName: string, attrObject: {
    [key: string]: string;
}, children?: HTMLElement[] | undefined) => T;
/**
 * body要素に対してis-fixedクラスを付与し、現在のスクロール値をtopプロパティに設定する
 */
export declare const windowLock: () => void;
/**
 * body要素のis-fixedクラスを削除し、topプロパティを初期化する
 */
export declare const windowUnLock: (scrollY: number) => void;
/**
 * フォーカス管理クラス
 */
export declare class LockAt {
    wrapperElement: HTMLElement;
    focusableElements: NodeListOf<HTMLElement>;
    firstElement: HTMLElement;
    lastElement: HTMLElement;
    private loopEvent;
    constructor(wrapperElement: HTMLElement);
    resetFocusableElements(): void;
    /**
     * 対象要素にイベントハンドラを追加する
     */
    addEvents(): void;
    /**
     * 対象要素のイベントハンドラを削除する
     */
    removeEvents(): void;
    /**
     * 対象要素間でフォーカスをループさせる
     */
    focusLoop(e: KeyboardEvent): void;
}
