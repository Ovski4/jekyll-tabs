const { getChildPosition, createElementFromHtml, findElementsContaining } = require('../js/domHelpers');

/**
 * Remove all "active" classes on li elements that belong to the given ul element.
 */
const removeActiveClasses = (ulElement) => {
    const liElements = ulElement.querySelectorAll('ul > li');

    Array.prototype.forEach.call(liElements, function(liElement) {
        liElement.classList.remove('active');
    });
}

/**
 * Handle adding or removing active classes on tab list items.
 */
const handleTabClicked = (link) => {
    const liTab = link.parentNode;
    const ulTab = liTab.parentNode;
    const liPositionInUl = getChildPosition(liTab);

    if (liTab.className.includes('active')) {
        return;
    }

    const tabContentId = ulTab.getAttribute('data-tab');
    const tabContentElement = document.getElementById(tabContentId);

    // Remove all "active" classes first.
    removeActiveClasses(ulTab);
    removeActiveClasses(tabContentElement);

    // Then add back active classes depending on the tab (ul element) that was clicked on.
    tabContentElement.querySelectorAll('ul.tab-content > li')[liPositionInUl].classList.add('active');
    liTab.classList.add('active');
}

/**
 * Copy the given text in the clipboard.
 *
 * See https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
 */
const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Move textarea out of the viewport so it's not visible
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (error) {
            console.error(error);
        } finally {
            textArea.remove();
        }
    };
}

/**
 * Open the tab specified by a combination of url anchor (#) and query param (?active_tab).
 *
 * For example, considering url http://your-jekyll-website.com/some-page/?active_tab=tab-2#my_tabs
 * Then the tabs with name 'my_tabs' would see tab with label 'tab 2' automatically open.
 */
const activateTabFromUrl = () => {
    const tabsAnchor = window.location.hash?.substring(1);

    if (!tabsAnchor) {
        return;
    }

    const targetedTabs = document.getElementById(tabsAnchor);

    if (!targetedTabs) {
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const tabIdToActivate = urlParams.get('active_tab');

    if (!tabIdToActivate) {
        return;
    }

    const tabLink = targetedTabs.querySelector('li#' + tabIdToActivate + ' > a');

    if (!tabLink) {
        return;
    }

    handleTabClicked(tabLink);
}

/**
 * Update the url when clicking on a tab. See method activateTabFromUrl above.
 */
const updateUrlWithActiveTab = (link) => {
    const liTab = link.parentNode;
    const ulTab = liTab.parentNode;

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('active_tab', liTab.id);

    const updatedUrl = window.location.pathname + '?' + searchParams.toString() + '#' + ulTab.id;
    history.replaceState(null, '', updatedUrl);
};

const addCopyToClipboardButtons = (buttonHTML) => {
    const preElements = document.querySelectorAll('ul.tab-content > li pre');

    for(let i = 0; i < preElements.length; i++) {
        const preElement = preElements[i];
        const preParentNode = preElement.parentNode;
        const button = createElementFromHtml(buttonHTML);

        preParentNode.style.position = 'relative';
        button.style.position = 'absolute';
        button.style.top = '0px';
        button.style.right = '0px';

        preParentNode.appendChild(button);

        button.addEventListener('click', function () {
            copyToClipboard(preElement.innerText);
        });
    }
};

const syncTabsWithSameLabels = (activeLink) => {
    const linksWithSameName = findElementsContaining('a', activeLink.textContent);

    for(let i = 0; i < linksWithSameName.length; i++) {
        if (linksWithSameName[i] !== activeLink) {
            handleTabClicked(linksWithSameName[i]);
        }
    }
}

module.exports = {
    removeActiveClasses,
    handleTabClicked,
    copyToClipboard,
    addCopyToClipboardButtons,
    activateTabFromUrl,
    updateUrlWithActiveTab,
    syncTabsWithSameLabels,
};
