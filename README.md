# Count up

<p>
    <a href="https://www.npmjs.com/package/@js4y/count-up"><img src="https://img.shields.io/badge/dependencies-none-green.svg" alt="none dependencies"></a>
    <a href="https://www.npmjs.com/package/@js4y/count-up"><img src="https://img.shields.io/npm/v/%40js4y%2Fcount-up" alt="npm"></a>
    <a href="https://www.npmjs.com/package/@js4y/count-up"><img src="https://img.shields.io/bundlephobia/minzip/%40js4y%2Fcount-up" alt="npm bundle size"></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/%40js4y%2Fcount-up" alt="license"></a>
</p>

A tiny dependency-free JavaSript library for animating numeric values.

Live Demo: https://bukacekd.github.io/count-up

## Features

- [easy to use](#usage)
- rich formatting using [Intl.NumberFormat](#formatter)
- possibility to define a [custom easing function](#easing)
- simple [configuration](#configuration) and [api](#methods)

## Installation

Npm

```bash
npm install @js4y/count-up
```

CDN

```bash
<script src="https://unpkg.com/@js4y/count-up/dist/index.js"></script>
```

## Usage

Npm

```javascript
import {CountUp} from '@js4y/count-up';

new CountUp(document.body, {
    from: 1,
    to: 10
});
```

CDN

```javascript
<script src="https://unpkg.com/@js4y/count-up/dist/index.js"></script>

<script>
    new js4y.components.CountUp(document.body, {
    from: 1000,
    to: -1000
});
<script>
```

## Configuration

The component offers a set of configuration items. Below is an overview of them.

```javascript
new CountUp(element: HTMLElement | string, {
    begin?: Function,
    complete?: Function,
    duration?: number,
    easing?: Function,
    formattter?: Intl.NumberFormat,
    from: number,
    to: number,
    update?: Function
});
```

### begin

required: `false`, type: `Function`

The callback function is triggered when the animation starts playing.

```javascript
new CountUp(document.body, {
    begin: () => {
        console.log('start of animation');
    },
});
```

### complete

required: `false`, type: `Function`

The callback function is triggered when the animation is completed.

```javascript
new CountUp(document.body, {
    complete: () => {
        console.log('end of animation');
    },
});
```

### duration

required: `false`, type: `Function`

Animation duration in milliseconds.

```javascript
new CountUp(document.body, {
    duration: 1000
});
```

### easing

required: `false`, type: `Function`

A custom easing function of the animation. The function argument represents the animation progress between 0 (start of animation) and 1 (end of animation).

```javascript
new CountUp(document.body, {
    easing: progress => Math.sin((progress * Math.PI) / 2),
});
```

Tip: Try one of the easing functions from the https://easings.net/.

### formatter

required: `false`, type: `Function`

The number formatter. Allows wide formatting of numbers by locale. By default the formatting follows the [html language](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) of the page.

```
new Intl.NumberFormat(document.documentElement.lang, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
});
```

To set up your own formatter follow the [Intl.NumberFormatter documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).

### from

required: `false`, type: `number`

The beginning of the animation range.

```javascript
new CountUp(document.body, {
    from: 10,
});
```

For numbers greater than [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) (2<sup>53</sup> - 1) use [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

### to

required: `false`, type: `number`

The end of animation range.

```javascript
new CountUp(document.body, {
    to: 100,
});
```

For numbers greater than [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) (2<sup>53</sup> - 1) use [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

### update

required: `false`, type: `Function`

Callback function triggered on every frame as soon as the animation starts playing. The function argument represents the animation progress between 0 (start of animation) and 1 (end of animation).

```javascript
new CountUp(document.body, {
    update: progress => {
        console.log('animation progress', progress.toFixed(2));
    },
});
```

## Methods

### create(element, options): CountUp

Creates the component, but without running the animation.

```javascript
const countUp = CountUp.create(document.body, {
    duration: 1000,
    from: 1,
    to: 10
});
```

To start the animation, use the constructor.

```javascript
const countUp = new CountUp(document.body, {
    duration: 1000,
    from: 1,
    to: 10
});
```

### play(): void

The method starts playing the animation.

```javascript
countUp.play();
```

### pause(): void

The method pauses the animation.

```javascript
countUp.pause();
```

### cancel(): void

The method cancels the animation.

```javascript
countUp.cancel();
```

## Browser support

| ![alt chrome](images/chrome.png) | ![alt edge](images/edge.png)  | ![alt firefox](images/firefox.png)  | ![alt opera](images/opera.png) | ![alt safari](images/safari.png) |
| :-: | :-: | :-: | :-: | :-: |
| Chrome 24+ | Edge 12+ | Firefox 29+ | Opera 15+ | Safari 10+ |

## License

The project is licensed under [MIT license](https://opensource.org/license/mit/).

## Related

- [Dialog](https://github.com/bukacekd/Dialog) - A tiny dependency-free JavaSript ES6 library built on a dialog element with minimal configuration.
- [lock-scroll](https://github.com/bukacekd/lock-scroll) - A set of methods to lock scrolling within an element or an entire page.
- [Loader](https://github.com/bukacekd/Loader) - A tiny dependency-free javascript loading spinner component with minimal configuration.