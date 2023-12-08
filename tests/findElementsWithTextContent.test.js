const { findElementsWithTextContent } = require('../js/domHelpers');

document.body.innerHTML = `
    <div class="class-1">My text</div>
    <div class="class-2">This is some text</div>
    <ul>
        <li class="class-3">Another text</li>
        <li class="class-4">Some text</li>
        <li class="class-5">Some text</li>
        <li class="class-6">My text</li>
        <li class="class-7">Text test</li>
    </ul>
    <div class="class-8">My text</div>`
;

describe('Find the elements that match the given selector and have the given text', () => {

    it('Should find the correct li elements', () => {
        const liElementsWithMyText = findElementsWithTextContent('li', 'My text');

        expect(liElementsWithMyText.length).toBe(1);
        expect(liElementsWithMyText[0].className).toBe('class-6');

        const divElementsWithMyText = findElementsWithTextContent('div', 'My text');

        expect(divElementsWithMyText.length).toBe(2);
        expect(divElementsWithMyText[0].className).toBe('class-1');
        expect(divElementsWithMyText[1].className).toBe('class-8');

        const liElementsWithSomeText = findElementsWithTextContent('li', 'Some text');

        expect(liElementsWithSomeText.length).toBe(2);
        expect(liElementsWithSomeText[0].className).toBe('class-4');
        expect(liElementsWithSomeText[1].className).toBe('class-5');
    });

});
