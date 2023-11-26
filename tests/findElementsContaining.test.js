const { findElementsContaining } = require('../js/domHelpers');

document.body.innerHTML = `
    <div class="class-1">My text here</div>
    <div class="class-2">This is some text</div>
    <ul>
        <li class="class-3">Another text</li>
        <li class="class-4">Some text</li>
        <li class="class-4">Some text again</li>
        <li class="class-5">My text</li>
        <li class="class-6">Text test</li>
    </ul>
    <div class="class-7">My text</div>`
;

describe('Get the right elements that contain the given text', () => {
    it('Should find all the element containing "My text"', () => {
        const liElements = findElementsContaining('li', 'My text');

        expect(liElements.length).toBe(1);
        expect(liElements[0].className).toBe('class-5');

        const divElements = findElementsContaining('div', 'My text');

        expect(divElements.length).toBe(2);
        expect(divElements[0].className).toBe('class-1');
        expect(divElements[1].className).toBe('class-7');

        const elementsWithClass4 = findElementsContaining('.class-4', 'Some text');

        expect(elementsWithClass4.length).toBe(2);
    });
});
