var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var TLImageViewer = /** @class */ (function () {
    function TLImageViewer() {
    }
    return TLImageViewer;
}());
(function () {
    var utils = {
        getIndex: function (el) {
            var parent = el.parentElement;
            return __spreadArrays(parent.children).indexOf(el);
        },
        getUserAgent: function () {
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('msie') >= 0) {
                return 'ie';
            }
            else if (userAgent.indexOf('edge') >= 0 || userAgent.indexOf('edg') >= 0) {
                return 'edge';
            }
            else if (userAgent.indexOf('chrome') >= 0) {
                return 'chrome';
            }
            else if (userAgent.indexOf('safari') >= 0) {
                return 'safari';
            }
            else if (userAgent.indexOf('firefox') >= 0) {
                return 'firefox';
            }
            else if (userAgent.indexOf('opera') >= 0) {
                return 'opera';
            }
            else {
                return 'others';
            }
        }
    };
    /**
     * 画像ビューアー本体
     */
    var TLImageViewer = /** @class */ (function () {
        function TLImageViewer(root) {
            this._root = root;
            this._items = null;
            this._itemsLength = 0;
            this._activeItemIdx = -1;
            this._detail = new TLImageViewerDetail(this);
            this.init();
        }
        Object.defineProperty(TLImageViewer.prototype, "root", {
            get: function () {
                return this._root;
            },
            set: function (el) {
                this._root = el;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewer.prototype, "items", {
            get: function () {
                return this._items;
            },
            set: function (items) {
                this._items = items;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewer.prototype, "itemsLength", {
            get: function () {
                return this._itemsLength;
            },
            set: function (number) {
                this._itemsLength = number;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewer.prototype, "activeItemIdx", {
            get: function () {
                return this._activeItemIdx;
            },
            set: function (number) {
                this._activeItemIdx = number;
                if (number > -1) {
                    this.detail.moveDetailContent();
                    this.detail.switchMoveBtns();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewer.prototype, "detail", {
            get: function () {
                return this._detail;
            },
            set: function (detail) {
                this._detail = detail;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初期化
         */
        TLImageViewer.prototype.init = function () {
            this.insertContentElement();
            this.activate();
            this.setEvent();
            if (utils.getUserAgent() === 'safari') {
                this.adjustGridTemplateRow();
            }
        };
        /**
         * 画像を格納するためのインナー要素を生成する
         */
        TLImageViewer.prototype.insertContentElement = function () {
            var template = "\n                <div class=\"TLImageViewer-content\"></div>\n            ";
            this.root.insertAdjacentHTML('afterbegin', template);
        };
        /**
         * 要素を利用可能な状態にする
         */
        TLImageViewer.prototype.activate = function () {
            var content = this.root.querySelector('.TLImageViewer-content');
            var items = this.root.querySelectorAll('img');
            var itemsLength = items.length;
            var notExistItems = itemsLength === 0;
            items.forEach(function (item) {
                item.classList.add('TLImageViewer-content-item');
                content.insertAdjacentElement('beforeend', item);
            });
            this.items = items;
            this.itemsLength = itemsLength;
            this.root.classList.add('TLImageViewer');
            this.root.dataset.item = String(itemsLength);
            this.detail.setItems(this.items);
            if (notExistItems) {
                console.error('Probably the wrong construction.\nCorrect construction is "* > * > img"');
            }
        };
        /**
         * 各要素にイベントを設定する
         */
        TLImageViewer.prototype.setEvent = function () {
            var _this = this;
            Array.prototype.forEach.call(this.items, function (item) {
                item.addEventListener('click', _this.itemClick.bind(_this));
            });
        };
        /**
         * アイテムクリック時の処理
         */
        TLImageViewer.prototype.itemClick = function (e) {
            var target = e.target;
            this.activeItemIdx = utils.getIndex(target);
            this.detail.show();
        };
        /**
         * grid（1fr）の仕様が異なっているブラウザのためのpolyfill
         */
        TLImageViewer.prototype.adjustGridTemplateRow = function () {
            var resizeObserver = new ResizeObserver(function (entries) {
                for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                    var entrie = entries_1[_i];
                    var content = entrie.target;
                    var contentHeight = content.offsetHeight;
                    content.style.gridTemplateRows = contentHeight / 2 + "px " + contentHeight / 2 + "px";
                }
            });
            resizeObserver.observe(this.root.querySelector('.TLImageViewer-content'));
        };
        return TLImageViewer;
    }());
    /**
     * 画像ビューアーの詳細
     */
    var TLImageViewerDetail = /** @class */ (function () {
        function TLImageViewerDetail(relationViewer) {
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
            this._touchPoint = { x: 0, y: 0 };
            this.init();
        }
        Object.defineProperty(TLImageViewerDetail.prototype, "root", {
            get: function () {
                return this._root;
            },
            set: function (el) {
                this._root = el;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewerDetail.prototype, "content", {
            get: function () {
                return this._content;
            },
            set: function (el) {
                this._content = el;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewerDetail.prototype, "template", {
            get: function () {
                return this._template;
            },
            set: function (string) {
                this._template = string;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewerDetail.prototype, "visibility", {
            get: function () {
                return this._visibility;
            },
            set: function (boolean) {
                this._visibility = boolean;
                if (boolean) {
                    this.root.classList.add('is-visible');
                }
                else {
                    this.root.classList.remove('is-visible');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewerDetail.prototype, "items", {
            get: function () {
                return this._items;
            },
            set: function (items) {
                var detailContent = this.root.querySelector('.TLImageViewerDetail-content');
                if (items) {
                    items.forEach(function (item) {
                        var detailContentList = document.createElement('li');
                        var cloneItem = item.cloneNode();
                        cloneItem.classList.remove('TLImageViewer-content-item');
                        cloneItem.classList.add('TLImageViewerDetail-content-list-item');
                        detailContentList.classList.add('TLImageViewerDetail-content-list');
                        detailContentList.append(cloneItem);
                        detailContent.append(detailContentList);
                    });
                }
                else {
                    var detailContentList = detailContent.querySelectorAll('.TLImageViewerDetail-content-list');
                    detailContentList.forEach(function (item) {
                        item.remove();
                    });
                }
                this._items = items;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewerDetail.prototype, "relationViewer", {
            get: function () {
                return this._relationViewer;
            },
            set: function (relationViewer) {
                this._relationViewer = relationViewer;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewerDetail.prototype, "prevBtn", {
            get: function () {
                return this._prevBtn;
            },
            set: function (boolean) {
                var prevBtn = this.root.querySelector('.TLImageViewerDetail-prev');
                if (boolean) {
                    prevBtn.classList.add('is-visible');
                }
                else {
                    prevBtn.classList.remove('is-visible');
                }
                this._prevBtn = boolean;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewerDetail.prototype, "nextBtn", {
            get: function () {
                return this._nextBtn;
            },
            set: function (boolean) {
                var nextBtn = this.root.querySelector('.TLImageViewerDetail-next');
                if (boolean) {
                    nextBtn.classList.add('is-visible');
                }
                else {
                    nextBtn.classList.remove('is-visible');
                }
                this._nextBtn = boolean;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewerDetail.prototype, "transitionendClass", {
            get: function () {
                return this._transitionendClass;
            },
            set: function (boolean) {
                if (boolean) {
                    this.root.classList.add('is-transitionend');
                }
                else {
                    this.root.classList.remove('is-transitionend');
                }
                this._transitionendClass = boolean;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewerDetail.prototype, "caption", {
            get: function () {
                return this._caption;
            },
            set: function (string) {
                var captionEl = this.root.querySelector('.TLImageViewerDetail-caption');
                captionEl.innerText = string;
                this._caption = string;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TLImageViewerDetail.prototype, "touchPoint", {
            get: function () {
                return this._touchPoint;
            },
            set: function (obj) {
                this._touchPoint = obj;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 初期化
         */
        TLImageViewerDetail.prototype.init = function () {
            this.insertTemplate();
            this.setEvent();
        };
        /**
         * 詳細表示用のコンテナ要素を追加する
         */
        TLImageViewerDetail.prototype.insertTemplate = function () {
            var template = "\n                <div class=\"TLImageViewerDetail\">\n                    <ul class=\"TLImageViewerDetail-content\"></ul>\n                    <p class=\"TLImageViewerDetail-caption\"></p>\n                    <button type=\"button\" class=\"TLImageViewerDetail-prev\"><span>prev</span></button>\n                    <button type=\"button\" class=\"TLImageViewerDetail-next\"><span>next</span></button>\n                    <button type=\"button\" class=\"TLImageViewerDetail-close\"><span>close</span></button>\n                </div>\n            ";
            this.relationViewer.root.insertAdjacentHTML('beforeend', template);
            this.template = template;
            this.root = this.relationViewer.root.querySelector('.TLImageViewerDetail');
            this.content = this.relationViewer.root.querySelector('.TLImageViewerDetail-content');
        };
        /**
         * 各要素にイベントを設定する
         */
        TLImageViewerDetail.prototype.setEvent = function () {
            var prevBtn = this.root.querySelector('.TLImageViewerDetail-prev');
            var nextBtn = this.root.querySelector('.TLImageViewerDetail-next');
            var closeBtn = this.root.querySelector('.TLImageViewerDetail-close');
            prevBtn.addEventListener('click', this.movePrev.bind(this));
            nextBtn.addEventListener('click', this.moveNext.bind(this));
            closeBtn.addEventListener('click', this.hide.bind(this));
            this.content.addEventListener('click', this.hide.bind(this));
            this.root.addEventListener('transitionend', this.setTransitionendClass.bind(this));
        };
        /**
         * 画像をセットする
         * @param items 詳細用画像郡
         */
        TLImageViewerDetail.prototype.setItems = function (items) {
            this.items = items;
        };
        /**
         * 要素を表示する
         */
        TLImageViewerDetail.prototype.show = function () {
            this.visibility = true;
            this.moveDetailContent();
            this.switchMoveBtns();
            this.setCaption();
        };
        /**
         * 要素を非表示にする
         */
        TLImageViewerDetail.prototype.hide = function () {
            if (this.transitionendClass) {
                this.visibility = false;
            }
        };
        /**
         * 前の詳細へ移動
         */
        TLImageViewerDetail.prototype.movePrev = function () {
            this.relationViewer.activeItemIdx--;
            this.setCaption();
        };
        /**
         * 次の詳細へ移動
         */
        TLImageViewerDetail.prototype.moveNext = function () {
            this.relationViewer.activeItemIdx++;
            this.setCaption();
        };
        /**
         * 本体要素でアクティブなアイテムの詳細へ移動
         */
        TLImageViewerDetail.prototype.moveDetailContent = function () {
            var pos = this.relationViewer.activeItemIdx * 100;
            this.content.style.transform = "translateX(-" + pos + "%)";
        };
        /**
         * 左右の送りボタンの表示切替
         */
        TLImageViewerDetail.prototype.switchMoveBtns = function () {
            var activeItemIdx = this.relationViewer.activeItemIdx;
            var lastIdx = this.relationViewer.itemsLength - 1;
            this.prevBtn = 0 < activeItemIdx;
            this.nextBtn = activeItemIdx < lastIdx;
        };
        /**
         * キャプションをセットする
         */
        TLImageViewerDetail.prototype.setCaption = function () {
            var activeItemIdx = this.relationViewer.activeItemIdx;
            var activeItem = this.relationViewer.items[activeItemIdx];
            var caption = activeItem.alt;
            this.caption = caption;
        };
        /**
         * 表示非表示切替時の処理
         * @param e transitionendイベントオブジェクト
         */
        TLImageViewerDetail.prototype.setTransitionendClass = function (e) {
            if (e.propertyName === 'opacity') {
                if (this.transitionendClass) {
                    this.transitionendClass = false;
                }
                else {
                    this.transitionendClass = true;
                }
            }
        };
        return TLImageViewerDetail;
    }());
    /**@TODO タッチ操作の追加, a11y, focus管理, options追加 */
    window.TLImageViewer = TLImageViewer;
})();
