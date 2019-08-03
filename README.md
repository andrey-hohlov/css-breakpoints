# MediaBreakpoints

JavaScript analog of [Bootstrap](https://getbootstrap.com/docs/4.3/layout/overview/#responsive-breakpoints) SCSS media breakpoints mixins.

```javascript
import MediaBreakpoints from 'media-breakpoints';

const mb = new MediaBreakpoints({
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
});

mb.is(mb.breakpoints.LG); // @include media-breakpoint-only(lg) { ... }
mb.isUp(mb.breakpoints.LG); // @include media-breakpoint-up(lg) { ... }
mb.isDown(mb.breakpoints.LG); // @include media-breakpoint-down(lg) { ... }
mb.isBetween(mb.breakpoints.SM, mb.breakpoints.LG); // @include media-breakpoint-between(sm, lg) { ... }
```

## Install

```
npm i -S media-breakpoints
```

## Usage

MediaBreakpoints is a singleton. 

```javascript
// MediaBreakpoints.js
import MediaBreakpoints from 'media-breakpoints';

export default new MediaBreakpoints({
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
});
```

Subscribe on breakpoint changes:

```javascript
// another-component.js
import mb from './MediaBreakpoints';

function handler(state) {
  console.log(state);
  // { current: 'MD', matched: ['XS', 'SM', 'MD'] }
}

mb.subscribe(handler);

// ...

mb.unsubscribe(handler);
``` 
