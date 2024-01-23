/**
 * Get the element position looking from the perspective of the parent element.
 *
 * Considering the following HTML:
 *
 * <ul>
 *   <li class="zero">0</li>
 *   <li class="one">1</li>
 *   <li class="two">2</li>
 * </ul>
 *
 * Then getChildPosition(document.querySelector('.one')) would return 1.
 */
const getChildPosition = (element: HTMLElement) => {
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
const findElementsWithTextContent = (selector: string, text: string) => {
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
 * Create a javascript element from HTML markup.
 */
const createElementFromHTML = (html: string) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.firstChild;
}

/**
 * Add the class on the given element for the duration of the timeout.
 */
const addClass = (element: HTMLElement, addedClass: string, timeout: number) => {
    element.className = element.className
        ? `${element.className} ${addedClass}`
        : addedClass;

    // After the timeout in milliseconds, remove the class.
    setTimeout(() => {
        element.className = element.className.replace(addedClass, '').trim();
    }, timeout);
}

export {
    getChildPosition,
    findElementsWithTextContent,
    createElementFromHTML,
    addClass,
};
