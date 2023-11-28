const { createElementFromHtml } = require('../js/domHelpers');

describe('Create a JS DOM element from html', () => {

    it('Should create the DOM element as expected', () => {
        const buttonElement = createElementFromHtml('<button>Copy</button>');

        expect(buttonElement.constructor.name).toBe('HTMLButtonElement');
    });

});
