const {
    activateTabFromUrl,
    updateUrlWithActiveTab,
    handleTabClicked,
    addCopyToClipboardButtons,
    syncTabsWithSameLabels,
} = require('./tabsHelpers');

const init = (overridenConfiguration = {}) => {
    const defaultConfiguration = {
        syncTabsWithSameLabels: false,
        activateTabFromUrl: false,
        addCopyToClipboardButtons: false,
        copyToClipboardButtonHtml: '<button>Copy</button>',
    };
    const configuration = Object.assign(defaultConfiguration, overridenConfiguration);

    window.addEventListener('load', function () {
        const tabLinks = document.querySelectorAll('ul.tab > li > a');

        Array.prototype.forEach.call(tabLinks, function(link) {
            link.addEventListener('click', function (event) {
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