# Twitter like image viewer

This is Twitter like image viewer Web components.

## installation

### Script

Download code [here](https://raw.githubusercontent.com/hikiroom/twitter-like-image/master/dist/twitterLikeImage.js)

### ESM

```
$ npm install twitter-like-image
```

## Usage

```
<style>
tl-img::part(container) {
    width: 200px;
}
</style>

<tl-img
    src="
        https://placehold.jp/150x150.png,
        https://placehold.jp/200x150.png,
        https://placehold.jp/250x150.png,
        https://placehold.jp/300x150.png
    "
    alt="
        alt1,
        alt2,
        alt3,
        alt4
    "
></tl-img>
```

src and alt attribute can be set from 1 to 4.

## CSS Shadow Parts

| Name | Description |
| :--- | :--- |
| `container` | container element that includes all child elements. |