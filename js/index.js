import { findElementsContaining } from './domHelpers';
import {
    activateTabFromUrl,
    updateUrlWithActiveTab,
    handleTabClicked,
    addCopyToClipboardButtons,
} from './tabsHelpers';

/**
 * Configure the tabs behavior.
 */
const jekyllTabsConfiguration = {
    syncTabsWithSameLabels: false,
    activateTabFromUrl: false,
    addCopyToClipboardButtons: false,
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

        if (jekyllTabsConfiguration.addCopyToClipboardButtons) {
            addCopyToClipboardButtons(jekyllTabsConfiguration.copyToClipboardButtonHtml);
        }

        if (jekyllTabsConfiguration.activateTabFromUrl) {
            activateTabFromUrl();
        }
    });
};
