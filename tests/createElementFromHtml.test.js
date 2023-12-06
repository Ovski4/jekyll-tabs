const { createElementFromHTML } = require('../js/domHelpers');

describe('Create a JS DOM element from HTML', () => {

    it('Should create the DOM element as expected', () => {
        const buttonElement = createElementFromHTML('<button>Copy</button>');

        expect(buttonElement.constructor.name).toBe('HTMLButtonElement');
    });

});
