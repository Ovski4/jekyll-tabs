const { getChildPosition, createElementFromHtml } = require('../js/domHelpers');

const listMarkup = `
    <ul>
        <li id="alpha"></li>
        <li id="omega"></li>
        <li id="lambda"></li>
        <li id="beta"></li>
    </ul>`
;

const listElement = createElementFromHtml(listMarkup);

describe('Get the child position from the point of view of its parent element', () => {
    it('Should return the right li positions in a ul element', () => {
        expect(getChildPosition(listElement.querySelector('[id="alpha"]'))).toBe(0);
        expect(getChildPosition(listElement.querySelector('[id="omega"]'))).toBe(1);
        expect(getChildPosition(listElement.querySelector('[id="lambda"]'))).toBe(2);
        expect(getChildPosition(listElement.querySelector('[id="beta"]'))).toBe(3);
    });
});
