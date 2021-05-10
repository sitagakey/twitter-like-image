import { style } from './style';
import { styleObjectToStyleString, styleStringToStyleElement } from './utils';

const styleElement = styleStringToStyleElement(styleObjectToStyleString(style));

class TwitterLikeImageViewer extends HTMLDivElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        
    }
}
customElements.define('tliv', TwitterLikeImageViewer);