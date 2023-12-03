/**
 * Get the element position looking from the perspective of the parent element.
 *
 * Considering the following html:
 *
 * <ul>
 *   <li class="zero">0</li>
 *   <li class="one">1</li>
 *   <li class="two">2</li>
 * </ul>
 *
 * Then getChildPosition(document.querySelector('.one')) would return 1.
 */
const getChildPosition = (element) => {
    const parent = element.parentNode;

    for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i] === element) {
            return i;
        }
    }
}

/**
 * Returns a list of elements that match the given selector and text content.
 */
const findElementsWithTextContent = (selector, text) => {
    const elementsMatchingSelector = document.querySelectorAll(selector);
    const elementsWithTextContent = [];

    for (let i = 0; i < elementsMatchingSelector.length; i++) {
        const element = elementsMatchingSelector[i];

        if (element.textContent.trim() === text.trim()) {
            elementsWithTextContent.push(element);
        }
    }

    return elementsWithTextContent;
}

/**
 * Create a javascript element from html markup.
 */
const createElementFromHtml = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.firstChild;
}

/**
 * Set the class className on the given element for the duration of the timeout.
 */
const setClass = (element, className, timeout) => {
    element.className = className;

    // After the timeout in milliseconds, remove the class.
    setTimeout(() => {
        element.className = element.className.replace(className, '');
    }, timeout);
}

module.exports = {
    getChildPosition,
    findElementsWithTextContent,
    createElementFromHtml,
    setClass,
};
