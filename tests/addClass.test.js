const { addClass } = require('../js/domHelpers');

document.body.innerHTML = `
    <ul>
        <li class="alpha"></li>
        <li class="omega lambda"></li>
        <li></li>
    </ul>`
;

jest.useFakeTimers();

describe('Set a class for a specific duration', () => {

    it('Should add the class and remove it after 500ms', () => {
        const getLiWithoutClass = () => document.querySelector('ul  > li:nth-child(3)');

        expect(getLiWithoutClass().className).toBe('');

        addClass(getLiWithoutClass(), 'other-class', 500);

        expect(getLiWithoutClass().className).toBe('other-class');

        jest.advanceTimersByTime(200);

        expect(getLiWithoutClass().className).toBe('other-class');

        jest.advanceTimersByTime(600);

        expect(getLiWithoutClass().className).toBe('');
    });

    it('Should add the class without removing the existing classes and remove it after 200ms', () => {
        const getOmegaLi = () => document.querySelector('.omega');

        expect(getOmegaLi().className).toBe('omega lambda');

        addClass(getOmegaLi(), 'other-class', 200);

        jest.advanceTimersByTime(100);

        expect(getOmegaLi().className).toBe('omega lambda other-class');

        jest.advanceTimersByTime(200);

        expect(getOmegaLi().className).toBe('omega lambda');
    });

});
