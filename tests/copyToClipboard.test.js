const { copyToClipboard } = require('../js/tabsHelpers');

document.body.innerHTML = `<div>Some content</div>`;

describe('Add copy to clipboard buttons.', () => {

    it('Should call the execCommand method to copy when the clipboard.navigator object is undefined', () => {
        const execCommandMock = jest.fn();
        document.execCommand = execCommandMock;

        copyToClipboard('Some text being copied');

        // Making sure the DOM is reset to its original markup
        expect(document.body.innerHTML).toBe('<div>Some content</div>');
        expect(execCommandMock).toHaveBeenCalledWith('copy');
    });

    it('Should log the error if one is thrown', () => {
        const execCommandMock = jest.fn().mockImplementation(() => {
            throw new Error('Something went wrong');
        });
        document.execCommand = execCommandMock;

        const consoleErrorMock = jest.fn();
        console.error = consoleErrorMock;

        copyToClipboard('Some text being copied');

        expect(consoleErrorMock).toHaveBeenCalledTimes(1);
    });

    it('Should call the navigator.writeText method to copy when the clipboard.navigator object is defined in a secure context', () => {
        const writeTextMock = jest.fn();

        Object.defineProperty(window, 'navigator', {
            value: {
                clipboard: {
                    writeText: writeTextMock,
                },
            },
            writable: false,
        });

        Object.defineProperty(window, 'isSecureContext', {
            value: true,
            writable: false,
        });

        copyToClipboard('Some text being copied');

        expect(writeTextMock).toHaveBeenCalledWith('Some text being copied');
    });

    it('Should call the callback method after copying', () => {
        const execCommandMock = jest.fn();
        document.execCommand = execCommandMock;

        const callback = jest.fn();

        copyToClipboard('Some text being copied', callback);

        expect(callback).toHaveBeenCalled();
    });

});
