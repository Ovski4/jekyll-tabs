const { appendToastMessageHTML } = require('../js/tabsHelpers');
const { removeAllWhitespaces } = require('./testHelper');

document.body.innerHTML = `
    <li class="alpha"></li>
    <li class="omega lambda"></li>`
;

describe('Append the toast message HTML to the body tag', () => {

    it('Should append the HTML as expected', () => {
        appendToastMessageHTML('Code copied with success');

        const expectedHTML = `
            <li class="alpha"></li>
            <li class="omega lambda"></li>
            <div id="jekyll-tabs-copy-to-clipboard-message">Code copied with success</div>`
        ;

        expect(removeAllWhitespaces(document.body.innerHTML)).toBe(removeAllWhitespaces(expectedHTML));
    });

});
