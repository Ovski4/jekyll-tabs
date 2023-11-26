const { findElementsContaining } = require('../js/domHelpers');

document.body.innerHTML = `
    <div class="class-1">My text</div>
    <div class="class-2">This is some text</div>
    <ul>
        <li class="class-3">Another text</li>
        <li class="class-4">Some text</li>
        <li class="class-5">My text</li>
        <li class="class-6">Text test</li>
    </ul>
    <div class="class-7">My text</div>`
;

describe('Get elements containing text', () => {
    it('Should find all the element containing "My text"', () => {
        expect(findElementsContaining('li', 'My text').length).toBe(1);
        expect(findElementsContaining('div', 'My text').length).toBe(2);
    });
});
