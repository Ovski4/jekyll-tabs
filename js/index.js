import {
    findElementsContaining,
    createElementFromHtml
} from './domHelpers';

import {
    activateTabFromUrl,
    updateUrlWithActiveTab,
    handleTabClicked,
    copyToClipboard
} from './tabsHelpers';

/**
 * Configure the tabs behavior.
 */
const jekyllTabsConfiguration = {
    syncTabsWithSameLabels: false,
    activateTabFromUrl: false,
    addCopyToClipboardButton: false,
    copyToClipboardButtonHtml: '<button>Copy</button>',
};

export function init() {
    window.addEventListener('load', function () {
        const tabLinks = document.querySelectorAll('ul.tab > li > a');

        Array.prototype.forEach.call(tabLinks, function(link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();

                handleTabClicked(link);

                if (jekyllTabsConfiguration.activateTabFromUrl) {
                    updateUrlWithActiveTab(link);
                }

                if (jekyllTabsConfiguration.syncTabsWithSameLabels) {
                    const linksWithSameName = findElementsContaining('a', link.textContent);

                    for(let i = 0; i < linksWithSameName.length; i++) {
                        if (linksWithSameName[i] !== link) {
                            handleTabClicked(linksWithSameName[i]);
                        }
                    }
                }
            }, false);
        });

        if (jekyllTabsConfiguration.addCopyToClipboardButton) {
            const preElements = document.querySelectorAll('ul.tab-content > li pre');

            for(let i = 0; i < preElements.length; i++) {
                const preElement = preElements[i];
                const preParentNode = preElement.parentNode;
                const button = createElementFromHtml(jekyllTabsConfiguration.copyToClipboardButtonHtml);

                preParentNode.style.position = 'relative';
                button.style.position = 'absolute';
                button.style.top = '0px';
                button.style.right = '0px';

                preParentNode.appendChild(button);

                button.addEventListener('click', function () {
                    copyToClipboard(preElement.innerText);
                });
            }
        }

        if (jekyllTabsConfiguration.activateTabFromUrl) {
            activateTabFromUrl();
        }
    });
};
