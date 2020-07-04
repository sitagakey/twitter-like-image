class TLImageViewer {
    root: HTMLElement
    items: NodeListOf<HTMLImageElement>|null
    itemsLength: number
    activeItemIdx: number
    detail: TLImageViewerDetail
    init: Function
    activate: Function
    setEvent: Function
    rootMouseEnter: Function
    itemClick: Function
    adjustGridTemplateRow: Function
}
interface TLImageViewerDetail {
    root: HTMLDivElement
    content: HTMLDivElement
    template: string
    visibility: boolean
    items: NodeListOf<HTMLLIElement>|null
    relationViewer: TLImageViewer
    prevBtn: boolean
    nextBtn: boolean
    transitionendClass: boolean
    caption: string
    touchPoint: {x:number, y:number}
    init: Function
    insertTemplate: Function
    setItems: Function
    removeItems: Function
    setEvent: Function
    show: Function
    hide: Function
    movePrev: Function
    moveNext: Function
    moveDetailContent: Function
    switchMoveBtns: Function
    setTransitionendClass: Function
}
interface Window {
    TLImageViewer: object;
}

(() => {
    const utils = {
        getIndex(el):number {
            const parent = el.parentElement;

            return [...parent.children].indexOf(el);
        },
        getUserAgent():string {
            const userAgent = window.navigator.userAgent.toLowerCase();

            if(userAgent.indexOf('msie') >= 0) {
                return 'ie';
            } else if(userAgent.indexOf('edge') >= 0 || userAgent.indexOf('edg') >= 0) {
                return 'edge';
            } else if(userAgent.indexOf('chrome') >= 0) {
                return 'chrome';
            } else if(userAgent.indexOf('safari') >= 0) {
                return 'safari';
            } else if(userAgent.indexOf('firefox') >= 0) {
                return 'firefox';
            } else if(userAgent.indexOf('opera') >= 0) {
                return 'opera';
            } else {
                return 'others';
            }
        }
    };

    /**
     * 画像ビューアー本体
     */
    class TLImageViewer {
        _root: HTMLElement;
        _items: NodeListOf<HTMLImageElement>|null;
        _itemsLength: number;
        _activeItemIdx: number;
        _detail: TLImageViewerDetail;

        constructor(root: HTMLElement) {
            this._root = root;
            this._items = null;
            this._itemsLength = 0;
            this._activeItemIdx = -1;
            this._detail = new TLImageViewerDetail(this);

            this.init();
        }

        get root ():HTMLElement {
            return this._root;
        }
        set root (el:HTMLElement) {
            this._root = el;
        }
        get items ():NodeListOf<HTMLImageElement> {
            return this._items;
        }
        set items (items:NodeListOf<HTMLImageElement>) {
            this._items = items;
        }
        get itemsLength ():number {
            return this._itemsLength;
        }
        set itemsLength (number:number) {
            this._itemsLength = number;
        }
        get activeItemIdx ():number {
            return this._activeItemIdx;
        }
        set activeItemIdx (number:number) {
            this._activeItemIdx = number;

            if (number > -1) {
                this.detail.moveDetailContent();
                this.detail.switchMoveBtns();
            }
        }
        get detail ():TLImageViewerDetail {
            return this._detail;
        }
        set detail (detail:TLImageViewerDetail) {
            this._detail = detail;
        }

        /**
         * 初期化
         */
        init(): void {
            this.insertContentElement();
            this.activate();
            this.setEvent();

            if (utils.getUserAgent() === 'safari') {
                this.adjustGridTemplateRow();
            }
        }
        /**
         * 画像を格納するためのインナー要素を生成する
         */
        insertContentElement():void {
            const template = `
                <div class="TLImageViewer-content"></div>
            `;

            this.root.insertAdjacentHTML('afterbegin', template);
        }
        /**
         * 要素を利用可能な状態にする
         */
        activate():void {
            const content:HTMLElement = this.root.querySelector('.TLImageViewer-content');
            const items:NodeListOf<HTMLImageElement> = this.root.querySelectorAll('img');
            const itemsLength:number = items.length;
            const notExistItems = itemsLength === 0;

            items.forEach((item:HTMLImageElement) => {
                item.classList.add('TLImageViewer-content-item');

                content.insertAdjacentElement('beforeend', item);
            });

            this.items = items;
            this.itemsLength = itemsLength;

            this.root.classList.add('TLImageViewer');
            this.root.dataset.item = String(itemsLength);

            this.detail.setItems(this.items);

            if (notExistItems) {
                console.error('Probably the wrong construction.\nCorrect construction is "* > img"');
            }
        }
        /**
         * 各要素にイベントを設定する
         */
        setEvent():void {
            Array.prototype.forEach.call(this.items, (item) => {
                item.addEventListener('click', this.itemClick.bind(this));
            });
        }
        /**
         * アイテムクリック時の処理
         */
        itemClick(e):void {
            const target = e.target;

            this.activeItemIdx = utils.getIndex(target);
            this.detail.show();
        }
        /**
         * grid（1fr）の仕様が異なっているブラウザのためのpolyfill
         */
        adjustGridTemplateRow():void {
            const resizeObserver = new ResizeObserver((entries) => {
                for (const entrie of entries) {
                    const content = entrie.target as HTMLElement;
                    const contentHeight = content.offsetHeight;

                    content.style.gridTemplateRows = `${contentHeight / 2}px ${contentHeight / 2}px`;
                }
            });

            resizeObserver.observe(this.root.querySelector('.TLImageViewer-content'));
        }
    }

    /**
     * 画像ビューアーの詳細
     */
    class TLImageViewerDetail {
        _root: HTMLDivElement|null;
        _content: HTMLDivElement|null;
        _items: NodeListOf<HTMLImageElement>|null;
        _relationViewer:TLImageViewer;
        _template:string;
        _visibility: boolean;
        _prevBtn: boolean;
        _nextBtn: boolean;
        _transitionendClass: boolean;
        _caption: string;
        _touchPoint: {x:number, y:number};

        constructor(relationViewer: TLImageViewer) {
            this._root = null;
            this._content = null;
            this._items = null;
            this._template = '';
            this._visibility = false;
            this._relationViewer = relationViewer;
            this._prevBtn = false;
            this._nextBtn = false;
            this._transitionendClass = false;
            this._caption = '';
            this._touchPoint = {x: 0, y: 0};

            this.init();
        }

        get root ():HTMLDivElement {
            return this._root;
        }
        set root (el:HTMLDivElement) {
            this._root = el;
        }
        get content ():HTMLDivElement {
            return this._content;
        }
        set content (el:HTMLDivElement) {
            this._content = el;
        }
        get template ():string {
            return this._template;
        }
        set template (string:string) {
            this._template = string;
        }
        get visibility ():boolean {
            return this._visibility;
        }
        set visibility (boolean:boolean) {
            this._visibility = boolean;

            if (boolean) {
                this.root.classList.add('is-visible');
            } else {
                this.root.classList.remove('is-visible');
            }
        }
        get items ():NodeListOf<HTMLImageElement> {
            return this._items;
        }
        set items (items:NodeListOf<HTMLImageElement>|null) {
            const detailContent:HTMLElement = this.root.querySelector('.TLImageViewerDetail-content');

            if (items) {
                items.forEach((item:HTMLImageElement) => {
                    const detailContentList = document.createElement('li');
                    const cloneItem = item.cloneNode() as HTMLImageElement;

                    cloneItem.classList.remove('TLImageViewer-content-item');
                    cloneItem.classList.add('TLImageViewerDetail-content-list-item');

                    detailContentList.classList.add('TLImageViewerDetail-content-list');
                    detailContentList.append(cloneItem);

                    detailContent.append(detailContentList);
                });
            } else {
                const detailContentList:NodeListOf<HTMLLIElement> = detailContent.querySelectorAll('.TLImageViewerDetail-content-list');

                detailContentList.forEach((item:HTMLLIElement) => {
                    item.remove();
                });
            }

            this._items = items;
        }
        get relationViewer ():TLImageViewer {
            return this._relationViewer;
        }
        set relationViewer (relationViewer:TLImageViewer) {
            this._relationViewer = relationViewer;
        }
        get prevBtn ():boolean {
            return this._prevBtn;
        }
        set prevBtn (boolean:boolean) {
            const prevBtn = this.root.querySelector('.TLImageViewerDetail-prev');

            if (boolean) {
                prevBtn.classList.add('is-visible');
            } else {
                prevBtn.classList.remove('is-visible');
            }

            this._prevBtn = boolean;
        }
        get nextBtn ():boolean {
            return this._nextBtn;
        }
        set nextBtn (boolean:boolean) {
            const nextBtn = this.root.querySelector('.TLImageViewerDetail-next');

            if (boolean) {
                nextBtn.classList.add('is-visible');
            } else {
                nextBtn.classList.remove('is-visible');
            }

            this._nextBtn = boolean;
        }
        get transitionendClass ():boolean {
            return this._transitionendClass;
        }
        set transitionendClass (boolean:boolean) {
            if (boolean) {
                this.root.classList.add('is-transitionend');
            } else {
                this.root.classList.remove('is-transitionend');
            }

            this._transitionendClass = boolean;
        }
        get caption ():string {
            return this._caption;
        }
        set caption (string:string) {
            const captionEl = this.root.querySelector('.TLImageViewerDetail-caption') as HTMLParagraphElement;

            captionEl.innerText = string;
            this._caption = string;
        }
        get touchPoint ():{x:number, y:number} {
            return this._touchPoint;
        }
        set touchPoint (obj:{x:number, y:number}) {
            this._touchPoint = obj;
        }

        /**
         * 初期化
         */
        init():void {
            this.insertTemplate();
            this.setEvent();
        }
        /**
         * 詳細表示用のコンテナ要素を追加する
         */
        insertTemplate():void {
            const template = `
                <div class="TLImageViewerDetail">
                    <ul class="TLImageViewerDetail-content"></ul>
                    <p class="TLImageViewerDetail-caption"></p>
                    <button type="button" class="TLImageViewerDetail-prev"><span>prev</span></button>
                    <button type="button" class="TLImageViewerDetail-next"><span>next</span></button>
                    <button type="button" class="TLImageViewerDetail-close"><span>close</span></button>
                </div>
            `;

            this.relationViewer.root.insertAdjacentHTML('beforeend', template);
            this.template = template;
            this.root = this.relationViewer.root.querySelector('.TLImageViewerDetail') as HTMLDivElement;
            this.content = this.relationViewer.root.querySelector('.TLImageViewerDetail-content') as HTMLDivElement;
        }
        /**
         * 各要素にイベントを設定する
         */
        setEvent():void {
            const prevBtn = this.root.querySelector('.TLImageViewerDetail-prev');
            const nextBtn = this.root.querySelector('.TLImageViewerDetail-next');
            const closeBtn = this.root.querySelector('.TLImageViewerDetail-close');

            prevBtn.addEventListener('click', this.movePrev.bind(this));
            nextBtn.addEventListener('click', this.moveNext.bind(this));
            closeBtn.addEventListener('click', this.hide.bind(this));
            this.content.addEventListener('click', this.hide.bind(this));

            this.root.addEventListener('transitionend', this.setTransitionendClass.bind(this));
        }
        /**
         * 画像をセットする
         * @param items 詳細用画像郡
         */
        setItems(items:NodeListOf<HTMLImageElement>|null):void {
            this.items = items;
        }
        /**
         * 要素を表示する
         */
        show():void {
            this.visibility = true;
            this.moveDetailContent();
            this.switchMoveBtns();
            this.setCaption();
        }
        /**
         * 要素を非表示にする
         */
        hide():void {
            if (this.transitionendClass) {
                this.visibility = false;
            }
        }
        /**
         * 前の詳細へ移動
         */
        movePrev():void {
            this.relationViewer.activeItemIdx--;
            this.setCaption();
        }
        /**
         * 次の詳細へ移動
         */
        moveNext():void {
            this.relationViewer.activeItemIdx++;
            this.setCaption();
        }
        /**
         * 本体要素でアクティブなアイテムの詳細へ移動
         */
        moveDetailContent():void {
            const pos = this.relationViewer.activeItemIdx * 100;

            this.content.style.transform = `translateX(-${pos}%)`;
        }
        /**
         * 左右の送りボタンの表示切替
         */
        switchMoveBtns():void {
            const activeItemIdx = this.relationViewer.activeItemIdx;
            const lastIdx = this.relationViewer.itemsLength - 1;

            this.prevBtn = 0 < activeItemIdx;
            this.nextBtn = activeItemIdx < lastIdx;
        }
        /**
         * キャプションをセットする
         */
        setCaption() {
            const activeItemIdx = this.relationViewer.activeItemIdx;
            const activeItem:HTMLImageElement = this.relationViewer.items[activeItemIdx] as HTMLImageElement;
            const caption = activeItem.alt;

            this.caption = caption;
        }
        /**
         * 表示非表示切替時の処理
         * @param e transitionendイベントオブジェクト
         */
        setTransitionendClass(e):void {
            if (e.propertyName === 'opacity') {
                if (this.transitionendClass) {
                    this.transitionendClass = false;
                } else {
                    this.transitionendClass = true;
                }
            }
        }
    }

    /**@TODO タッチ操作の追加, a11y, focus管理, options追加 */
    window.TLImageViewer = TLImageViewer;
})();