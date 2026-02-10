/**
 * Note that upgrading to jsdom >= 30 causes the following error: "TypeError: Cannot redefine property: location"
 * Here are some nice workarounds suggested in the related issue: https://github.com/jsdom/jsdom/issues/3492
 * Decided to not upgrade jsdom for now since it's only impacting the tests.
 */
const mockWindowLocationProperties = (value, replaceStateMock = jest.fn()) => {
    Object.defineProperties(window, {
        location: {
            value,
            writable: true,
        },
        history: {
            value: {
                replaceState: replaceStateMock,
            },
            writable: false,
        },
    });
};

const removeAllWhitespaces = (string) => {
    return string.replace(/\s/g, '');
};

module.exports = {
    mockWindowLocationProperties,
    removeAllWhitespaces,
};
