const mockWindowLocationProperties = (value, replaceStateMock = jest.fn()) => {
    window = Object.create(window);

    Object.defineProperty(window, 'location', {
        value,
        writable: true,
    });

    Object.defineProperty(window, 'history', {
        value: {
            replaceState: replaceStateMock,
        },
        writable: false,
    });
}

const removeAllWhitespaces = (string) => {
    return string.replace(/\s/g, '');
}

module.exports = {
    mockWindowLocationProperties,
    removeAllWhitespaces
}