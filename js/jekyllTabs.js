const {
    activateTabFromUrl,
    updateUrlWithActiveTab,
    handleTabClicked,
    addCopyToClipboardButtons,
    syncTabsWithSameLabels,
    appendToastMessageHTML,
} = require('./tabsHelpers');

const init = (overriddenConfiguration = {}) => {
    const defaultConfiguration = {
        syncTabsWithSameLabels: false,
        activateTabFromUrl: false,
        addCopyToClipboardButtons: false,
        copyToClipboardSettings: {
            buttonHTML: '<button>Copy</button>',
            showToastMessageOnCopy: false,
            toastMessage: 'Code copied to clipboard',
            toastDuration: 3000,
        }
    };

    const configuration = {
        ...defaultConfiguration,
        ...overriddenConfiguration,
        copyToClipboardSettings: {
            ...defaultConfiguration.copyToClipboardSettings,
            ...overriddenConfiguration.copyToClipboardSettings,
        }
    };

    const tabLinks = document.querySelectorAll('ul.tab > li > a');

    Array.prototype.forEach.call(tabLinks, (link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            handleTabClicked(link);

            if (configuration.activateTabFromUrl) {
                updateUrlWithActiveTab(link);
            }

            if (configuration.syncTabsWithSameLabels) {
                syncTabsWithSameLabels(link);
            }
        }, false);
    });

    if (configuration.addCopyToClipboardButtons) {
        const settings = configuration.copyToClipboardSettings;

        addCopyToClipboardButtons(settings);

        if (settings.showToastMessageOnCopy) {
            appendToastMessageHTML(settings.toastMessage);
        }
    }

    if (configuration.activateTabFromUrl) {
        activateTabFromUrl();
    }
};

module.exports = {
    init,
}
