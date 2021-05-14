import { StyleObject } from './style';
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
 * 文字列で表された配列を通常の配列として返す
 * @param attrName
 */
export declare const getAttrStrArr: (element: Element, attrName: string) => string[];
/**
 * body要素を現在のスクロール値で固定する
 */
export declare const windowLock: () => void;
/**
 * body要素の固定を解く
 */
export declare const windowUnLock: () => void;
/**
 * フォーカス可能な要素のセレクタ文字列
 */
export declare const FOCUSABLE_ELEMENTS = "button:not(.is-hide), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex=\"-1\"])";
/**
 * フォーカス管理クラス
 */
export declare class LookAt {
    wrapperElement: HTMLElement;
    focusableElements: NodeListOf<HTMLElement>;
    firstElement: HTMLElement;
    lastElement: HTMLElement;
    mutationObserver: MutationObserver;
    private loopEvent;
    constructor(wrapperElement: HTMLElement);
    /**
     * 各種要素とイベントを設定しなおす
     */
    reset(): void;
    /**
     * 各種要素を設定しなおす
     */
    resetFocusableElements(): void;
    /**
     * イベントを設定しなおす
     */
    resetEvents(): void;
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
