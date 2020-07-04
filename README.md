# Twitter風の画像ビューアー

## 使い方

```html
<div class="target">
    <img src="./img/img_01.png" alt="画像1">
    <img src="./img/img_02.png" alt="画像2">
    <img src="./img/img_03.png" alt="画像3">
    <img src="./img/img_04.png" alt="画像4">
</div>
```
```js
const targets = document.querySelectorAll('.target');

for (target of targets) {
    const tliv = new TLImageViewer(target);
}
```