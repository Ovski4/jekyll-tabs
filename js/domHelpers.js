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
module.exports.getChildPosition = (element) => {
    const parent = element.parentNode;

    for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i] === element) {
            return i;
        }
    }
}

/**
 * Returns a list of elements of the given tag that contains the given text.
 */
module.exports.findElementsContaining = (elementTag, text) => {
    const elements = document.querySelectorAll(elementTag);
    const elementsThatContainText = [];

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        if (element.textContent.includes(text)) {
            elementsThatContainText.push(element);
        }
    }

    return elementsThatContainText;
}

/**
 * Create a javascript element from html markup.
 */
module.exports.createElementFromHtml = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    return template.content.firstChild;
}
