function throttle(func, wait) {
  let timeout = null;

  return function wrapper(...args) {
    if (timeout) return;

    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(this, args);
        timeout = null;
      }, wait);
    }
  };
}

let instance;

class MediaBreakpoints {
  constructor(breakpoints) {
    if (instance) return instance;

    if (!instance) {
      instance = this;
    }

    const keys = Object.keys(breakpoints);

    this.matched = [];
    this.current = null;
    this.breakpoints = keys.reduce((acc, key) => {
      acc[key] = key;
      return acc;
    }, {});
    this.$flow = keys
      .map(key => ({ name: key, minWidth: breakpoints[key] }))
      .sort((a, b) => a.minWidth - b.minWidth);

    this.$listeners = [];

    this.onResize();
    this.emit();

    this.throttledOnResize = throttle(() => this.onResize(), 300);

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.throttledOnResize);
    }

    return instance;
  }

  destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.throttledOnResize);
    }
    instance = null;
  }

  onResize() {
    if (typeof window === 'undefined') return;

    const matched = [];
    this.$flow.forEach((bp) => {
      if (window.matchMedia(`(min-width: ${bp.minWidth}px)`).matches) {
        matched.push(bp.name);
      }
    });

    if (matched.join(',') !== this.matched.join(',')) {
      this.matched = matched;
      this.current = this.matched[this.matched.length - 1];
      this.emit();
    }
  }

  getBpFlowIndex(bp) {
    return this.$flow.findIndex(item => item.name === bp);
  }

  is(bp) {
    return bp === this.current;
  }

  isUp(bp) {
    if (!bp) return false;
    return this.matched.indexOf(bp) !== -1;
  }

  isDown(bp) {
    if (!bp) return false;
    const lastMatched = this.matched[this.matched.length - 1];
    if (!lastMatched) return false;

    const bpIndex = this.getBpFlowIndex(bp);
    if (bpIndex === -1) return false;

    const lastMatchedIndex = this.getBpFlowIndex(lastMatched);

    return lastMatchedIndex - bpIndex < 0;
  }

  isBetween(from, to) {
    return this.isUp(from) && this.isDown(to);
  }

  getState() {
    const {
      current,
      matched,
    } = this;

    return { current, matched };
  }

  emit() {
    this.$listeners.forEach(handler => handler(this.getState()));
  }

  subscribe(handler) {
    if (typeof handler !== 'function') {
      throw new TypeError('Handler must be function');
    }

    if (!this.$listeners.includes(handler)) {
      this.$listeners.push(handler);
    }

    return () => this.unsubscribe(handler);
  }

  unsubscribe(handler) {
    const index = this.$listeners.indexOf(handler);
    if (index > -1) {
      this.$listeners.splice(index, 1);
    }
  }
}

export default MediaBreakpoints;
