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
