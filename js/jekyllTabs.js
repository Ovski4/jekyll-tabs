const {
    activateTabFromUrl,
    updateUrlWithActiveTab,
    handleTabClicked,
    addCopyToClipboardButtons,
    syncTabsWithSameLabels,
} = require('./tabsHelpers');

const init = (overriddenConfiguration = {}) => {
    const defaultConfiguration = {
        syncTabsWithSameLabels: false,
        activateTabFromUrl: false,
        addCopyToClipboardButtons: false,
        copyToClipboardButtonHtml: '<button>Copy</button>',
    };
    const configuration = Object.assign(defaultConfiguration, overriddenConfiguration);

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
            addCopyToClipboardButtons(configuration.copyToClipboardButtonHtml);
        }

        if (configuration.activateTabFromUrl) {
            activateTabFromUrl();
        }
    });
};

module.exports = {
    init,
}
