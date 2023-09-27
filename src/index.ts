interface CountUpOptions {
    begin?: () => void;
    complete?: () => void;
    duration?: number;
    easing?: (value: number) => number;
    formatter?: Intl.NumberFormat;
    from?: number;
    to?: number;
    update?: (value: number) => void;
}

export class CountUp {

    #element;
    #isAnimated = false;
    #options;
    #pauseTime = 0;
    #raf = 0;
    #startTime = 0;

    static #autoPlay = true;

    static create(el: HTMLElement | string, options: CountUpOptions) {
        this.#autoPlay = false;
        const instance = new CountUp(el, options);
        this.#autoPlay = true;
        return instance;
    }

    constructor(el: HTMLElement | string, options: CountUpOptions) {
        this.#element = (el instanceof HTMLElement ? el : document.querySelector(el)) as HTMLElement;
        
        if (!(this.#element instanceof HTMLElement)) {
            throw TypeError('First argument must be HTMLElement');
        }

        this.#options = {
            duration: 0,
            formatter: new Intl.NumberFormat(document.documentElement.lang, {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0
            }),
            ...options
        };

        ['duration', 'from', 'to'].forEach((key) => {
            if (!Number.isFinite(this.#options[key as keyof CountUpOptions])) {
                throw TypeError(`Property "${key}" must be finite number`);
            }
        });

        if (this.#options.duration < 0) {
            throw TypeError('Property "duration" must be non-negative number');
        }

        if (!(this.#options.formatter instanceof Intl.NumberFormat)) {
            throw TypeError('Property "formatter" must be instance of Intl.NumberFormat');
        }

        if (CountUp.#autoPlay) {
            this.play();
        }
    }

    #animateFrame() {
        if (this.#options.from === undefined || this.#options.to === undefined) {
            return;
        }

        const elapsed   = Math.min(Math.max((Date.now() - this.#startTime + this.#pauseTime) / this.#options.duration || 0, 0), 1),
              currValue = typeof this.#options.easing === 'function' ? this.#options.easing(elapsed) : elapsed * ( 2 - elapsed),
              nextValue = this.#options.from + (this.#options.to - this.#options.from) * currValue;

        this.#updateValue(nextValue);

        if (elapsed === 0) {
            this.#isAnimated = true;

            if (typeof this.#options.begin === 'function') {
                this.#options.begin();
            }
        }

        if (typeof this.#options.update === 'function') {
            this.#options.update(elapsed);
        }

        if (elapsed !== 1) {
            this.#raf = requestAnimationFrame(() => this.#animateFrame());
        } else {
            if (typeof this.#options.complete === 'function') {
                this.#options.complete();
            }
            
            this.#isAnimated = false;
        }
    }

    #cancelFrame() {
        cancelAnimationFrame(this.#raf);
        this.#isAnimated = false;
    }

    #updateValue(value: number) {
        const val = this.#options.formatter.format(value);

        if ('value' in this.#element) {
            this.#element.value = val;
        } else {
            this.#element.textContent = val;
        }
    }

    cancel() {
        this.#cancelFrame();
        this.#pauseTime = 0;

        if (this.#options.from !== undefined) {
            this.#updateValue(this.#options.from);
        }
    }

    pause() {
        if (this.#isAnimated) {
            this.#cancelFrame();
            this.#pauseTime = Date.now() - this.#startTime;
        }
    }

    play() {
        if (!this.#isAnimated) {
            this.#cancelFrame();
            this.#startTime = Date.now();
            this.#animateFrame();
        }
    }
}