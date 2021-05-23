import { style } from './style';
import {
    styleObjectToStyleString,
    styleStringToStyleElement,
    createElement,
    getAttrStrArr,
    windowLock,
    windowUnLock,
    LookAt,
} from './utils';

class TwitterLikeImage extends HTMLElement {
    init = false;
    content: HTMLElement|null = null;
    backdrop: HTMLElement|null = null;
    backdropContent: HTMLElement|null = null;
    backdropCaption: HTMLElement|null = null;
    backdropPrev: HTMLElement|null = null;
    backdropNext: HTMLElement|null = null;
    backdropClose: HTMLElement|null = null;
    item: HTMLLIElement[]|null = null;
    backdropContentItem: HTMLLIElement[]|null = null;
    srcArr: string[] = [];
    altArr: string[] = [];
    activeItemIdx: number = -1;
    lookAt: LookAt|null = null;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.appendTemplateToShadowDom();
    }
    connectedCallback() {
        if (!this.init) {
            this.init = true;
            this.setElementsToThis();
            this.appendItemElements();
            this.setEventListener();
            this.closeBackdrop();
        }
    }
    /**
     * shadowDOMに要素のテンプレートを追加する
     */
    appendTemplateToShadowDom() {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="twitter-like-image" part="container">
            <ul class="content"></ul>
            <div class="backdrop" tabindex="-1">
            <ul class="backdrop-content"></ul>
            <p class="backdrop-caption"></p>
            <button class="backdrop-prev" aria-label="previous"></button>
            <button class="backdrop-next" aria-label="next"></button>
            <button class="backdrop-close" aria-label="close"></button>
            </div>
            </div>
        `;

        const instance = template.content.cloneNode(true);
        const styleElement = styleStringToStyleElement(styleObjectToStyleString(style));
        this.shadowRoot?.append(instance, styleElement);
    }
    /**
     * 各種要素をthisに格納する
     */
    setElementsToThis() {
        const { shadowRoot } = this;
        if (!shadowRoot) {
            throw new Error('ShadowRoot is not found.');
        }

        const srcArr = getAttrStrArr(shadowRoot.host, 'src');
        const altArr = getAttrStrArr(shadowRoot.host, 'alt');
        const content = shadowRoot.querySelector<HTMLElement>('.content');
        const backdrop = shadowRoot.querySelector<HTMLElement>('.backdrop');
        const backdropContent = shadowRoot.querySelector<HTMLElement>('.backdrop-content');
        const backdropCaption = shadowRoot.querySelector<HTMLElement>('.backdrop-caption');
        const backdropPrev = shadowRoot.querySelector<HTMLElement>('.backdrop-prev');
        const backdropNext = shadowRoot.querySelector<HTMLElement>('.backdrop-next');
        const backdropClose = shadowRoot.querySelector<HTMLElement>('.backdrop-close');
        if (!backdrop || !content || !backdropContent || !backdropCaption || !backdropPrev || !backdropNext || !backdropClose) {
            throw new Error('Something in structure element is not exist.')
        }

        this.altArr = altArr;
        this.srcArr = srcArr;
        this.content = content;
        this.backdrop = backdrop;
        this.backdropContent = backdropContent;
        this.backdropCaption = backdropCaption;
        this.backdropPrev = backdropPrev;
        this.backdropNext = backdropNext;
        this.backdropClose = backdropClose;
        this.item = srcArr.map((src, i) => {
            const contentImg = createElement<HTMLImageElement>('img', { src, alt: altArr[i] ?? '' });
            const button = createElement<HTMLButtonElement>('button', { type: 'button', 'aria-label': `view larger image` }, [contentImg]);
            const item = createElement<HTMLLIElement>('li', { class: 'item' }, [button]);

            return item;
        });
        this.backdropContentItem = srcArr.map((src, i) => {
            const backdropImg = createElement<HTMLImageElement>('img', { src, alt: altArr[i] ?? '' });
            const backdropContentItem = createElement<HTMLLIElement>('li', { class: 'backdrop-item' }, [backdropImg]);

            return backdropContentItem;
        });
        this.lookAt = new LookAt(backdrop);
    }
    /**
     * item要素をcontentおよびcontentBackdrop要素に追加する
     */
    appendItemElements() {
        const { content, backdropContent, item, backdropContentItem } = this;
        if (!content || !backdropContent || !item || !backdropContentItem) {
            throw new Error('Either content or backdrop-content is not exist.')
        }

        content.append(...item);
        backdropContent.append(...backdropContentItem);
    }
    /**
     * 各種要素にイベントを設定する
     */
    setEventListener() {
        const { backdrop, backdropPrev, backdropNext, backdropClose, item } = this;
        if (!backdrop || !backdropPrev || !backdropNext || !backdropClose || !item) {
            throw new Error('Either backdrop or backdropPrev or backdropNext or backdropClose or item is not exist.');
        }

        item.forEach((_item, i) => {
            const button = _item.querySelector('button');
            if (!button) {
                throw new Error('button is not exist');
            }

            button.addEventListener('click', this.openBackdrop.bind(this, i));
        });
        backdrop.addEventListener('transitionend', this.readyBackdropContent.bind(this))
        backdrop.addEventListener('click', this.closeBackdropIfMe.bind(this))
        backdropPrev.addEventListener('click', this.switchTargetImageToPrevious.bind(this));
        backdropNext.addEventListener('click', this.switchTargetImageToNext.bind(this));
        backdropClose.addEventListener('click', this.closeBackdrop.bind(this));
    }
    /**
     * backdropContentのアニメーション準備ができたら実行される処理
     * @param e
     */
    readyBackdropContent(e: TransitionEvent) {
        const { backdropContent } = this;
        if (!backdropContent) {
            throw new Error('Either content or backdrop-content is not exist.');
        }

        if (e.target === e.currentTarget && e.propertyName === 'opacity') {
            if (backdropContent.classList.contains('is-animation')) {
                backdropContent.classList.remove('is-animation');
            } else {
                backdropContent.classList.add('is-animation');
                this.focusBackdropBtnAssociatedWithActiveItemIdx();
            }
        }
    }
    /**
     * itemIdxに対応したitemButtonにフォーカスする
     * @param itemIdx
     */
    focusItemButton(itemIdx: number) {
        const { item } = this;
        if (!item) {
            throw new Error('item is wrong.')
        }

        item[itemIdx]?.querySelector('button')?.focus();
    }
    /**
     * activeItemIdxに関連したbackdropBtnにフォーカスする
     */
    focusBackdropBtnAssociatedWithActiveItemIdx() {
        const { backdropPrev, backdropNext } = this;
        if (!backdropPrev || !backdropNext) {
            throw new Error('Either backdropPrev or backdropNext is not exist.');
        }

        if (this.activeItemIdx === this.srcArr.length - 1) {
            backdropPrev.focus();
        } else {
            backdropNext.focus();
        }
    }
    /**
     * backdropを開く
     * @param itemIdx
     */
    openBackdrop(itemIdx: number) {
        const { backdrop } = this;
        if (!backdrop) {
            throw new Error('backdrop is not exist.');
        }

        windowLock();
        this.switchTargetImageTo(itemIdx);
        backdrop.classList.remove('is-hide');
    }
    /**
     * backdropを閉じる
     * @param e
     */
    closeBackdrop() {
        const { backdrop } = this;
        if (!backdrop) {
            throw new Error('backdrop is not exist.');
        }

        windowUnLock();
        this.focusItemButton(this.activeItemIdx);
        this.switchTargetImageTo(-1);
        backdrop.classList.add('is-hide');
    }
    /**
     * MouseEventの発生源がcurrentTargetの場合、backdropを閉じる
     * @param e
     */
    closeBackdropIfMe(e: MouseEvent) {
        if (e.target === e.currentTarget) {
            this.closeBackdrop()
        }
    }
    /**
     * itemIdxに対応したitemをtargetとして各種処理を与える
     * @param itemIdx
     */
    switchTargetImageTo(itemIdx: number) {
        this.activeItemIdx = itemIdx;
        this.translateTo(itemIdx);
        this.changeStateOfBackdropPrevBtn(itemIdx === 0, this.focusBackdropBtnAssociatedWithActiveItemIdx.bind(this));
        this.changeStateOfBackdropNextBtn(itemIdx === this.srcArr.length - 1, this.focusBackdropBtnAssociatedWithActiveItemIdx.bind(this));
        this.setCaption(this.altArr[itemIdx] ?? '');
    }
    /**
     * activeItemIdx-1に対応したitemをtargetとして各種処理を与える
     */
    switchTargetImageToPrevious() {
        this.switchTargetImageTo(this.activeItemIdx - 1);
    }
    /**
     * activeItemIdx+1に対応したitemをtargetとして各種処理を与える
     */
    switchTargetImageToNext() {
        this.switchTargetImageTo(this.activeItemIdx + 1);
    }
    /**
     * backdropPrevBtnの表示状態を変更する
     * @param boolean 
     * @param trueCallback 
     */
    changeStateOfBackdropPrevBtn(boolean: boolean, trueCallback: () => void) {
        if (boolean) {
            this.backdropPrev?.classList.add('is-hide');

            if (trueCallback) {
                trueCallback();
            }
        } else if (!boolean && this.backdropPrev?.classList.contains('is-hide')) {
            this.backdropPrev?.classList.remove('is-hide');
        }
    }
    /**
     * backdropNextBtnの表示状態を変更する
     * @param boolean 
     * @param trueCallback 
     */
    changeStateOfBackdropNextBtn(boolean: boolean, trueCallback: () => void) {
        if (boolean) {
            this.backdropNext?.classList.add('is-hide');

            if (trueCallback) {
                trueCallback();
            }
        } else if (!boolean && this.backdropNext?.classList.contains('is-hide')) {
            this.backdropNext?.classList.remove('is-hide');
        }
    }
    /**
     * itemIdxに対応したitemを画面上に表示させる
     * @param itemIdx
     */
    translateTo(itemIdx: number) {
        const { backdropContent } = this;
        if (!backdropContent) {
            throw new Error('backdropContent is not exist.');
        }

        backdropContent.style.transform = `translateX(-${itemIdx * 100}%)`;
    }
    /**
     * キャプションを設定する
     * @param caption
     */
    setCaption(caption: string) {
        const { backdropCaption } = this;
        if (!backdropCaption) {
            throw new Error('backdropCaption is not exist.');
        }

        backdropCaption.innerText = caption;
    }
}
customElements.define('tl-img', TwitterLikeImage);