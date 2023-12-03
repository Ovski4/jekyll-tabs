const { getChildPosition } = require('../js/domHelpers');

document.body.innerHTML = `
    <ul>
        <li class="alpha"></li>
        <li class="omega"></li>
        <li class="lambda"></li>
        <li class="beta"></li>
    </ul>`
;

describe('Get the child position from the point of view of its parent element', () => {

    it('Should return the right li positions in a ul element', () => {
        expect(getChildPosition(document.querySelector('.alpha'))).toBe(0);
        expect(getChildPosition(document.querySelector('.omega'))).toBe(1);
        expect(getChildPosition(document.querySelector('.lambda'))).toBe(2);
        expect(getChildPosition(document.querySelector('.beta'))).toBe(3);
    });

});
