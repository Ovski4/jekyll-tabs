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
        copyToClipoardSettings: {
            buttonHTML: '<button>Copy</button>',
            showToastMessageOnCopy: false,
            toastMessage: 'Code copied to clipboard',
            toastDuration: 3000,
        }
    };

    const configuration = Object.assign(
        defaultConfiguration,
        overriddenConfiguration
    );

    if (typeof overriddenConfiguration.copyToClipoardSettings === 'object') {
        configuration.copyToClipoardSettings = Object.assign(
            defaultConfiguration.copyToClipoardSettings,
            overriddenConfiguration.copyToClipoardSettings
        );
    }

    window.addEventListener('load', () => {
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
            addCopyToClipboardButtons(configuration.copyToClipoardSettings);

            if (configuration.copyToClipoardSettings.showToastMessageOnCopy) {
                appendToastMessageHTML(configuration.copyToClipoardSettings);
            }
        }

        if (configuration.activateTabFromUrl) {
            activateTabFromUrl();
        }
    });
};

module.exports = {
    init,
}
