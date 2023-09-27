import {afterEach, expect, test} from 'vitest';
import {CountUp} from '../src/index';

document.documentElement.lang = 'en';

const delay = (delay: number) => new Promise(resolve => setTimeout(resolve, delay)),
      value = () => (document.body.textContent as string).trim();

afterEach(() => {
    document.body.textContent = '';
});

test('create component', () => {
    const countUp = CountUp.create(document.body, {
        from: 0,
        to: 1
    });

    expect(countUp).instanceOf(CountUp);
});

test('callback functions', () => {
    new CountUp(document.body, {
        from: 0,
        to: 1,
        begin: () => expect(value()).toBe('0'),
        update: (progress: number) => expect(progress).toBeTypeOf('number'),
        complete: () => expect(value()).toBe('1')
    });
});

test('custom formatter', () => {
    new CountUp(document.body, {
        from: 0,
        to: 1,
        formatter: new Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'usd'
        }),
        begin: () => expect(value()).toBe('$0.00'),
        complete: () => expect(value()).toBe('$1.00')
    });
});

test('methods', async () => {
    const countUp = new CountUp(document.body, {
        from: 0,
        to: 10,
        duration: 20
    });

    await delay(20);
    countUp.pause();
    expect(value()).not.toBe('0');
    countUp.play();
    await delay(20);
    expect(value()).toBe('10');
    countUp.cancel();
    expect(value()).toBe('0');
});