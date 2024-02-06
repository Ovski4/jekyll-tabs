const {
    activateTabFromUrl,
    updateUrlWithActiveTab,
    handleTabClicked,
    addCopyToClipboardButtons,
    syncTabsWithSameLabels,
    appendToastMessageHTML,
} = require('./tabsHelpers');

interface CopyToClipboardSettings {
    buttonHTML: string,
    showToastMessageOnCopy: boolean,
    toastMessage: string,
    toastDuration: number,
}

interface Configuration {
    syncTabsWithSameLabels: boolean;
    activateTabFromUrl: boolean;
    addCopyToClipboardButtons: boolean;
    copyToClipboardSettings: CopyToClipboardSettings;
}

const init = (overriddenConfiguration: any = {}) => {

    const defaultConfiguration: Configuration = {
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

    const configuration: Configuration = {
        ...defaultConfiguration,
        ...overriddenConfiguration,
        copyToClipboardSettings: {
            ...defaultConfiguration.copyToClipboardSettings,
            ...overriddenConfiguration.copyToClipboardSettings,
        }
    };

    const tabLinks: NodeList = document.querySelectorAll('ul.tab > li > a');

    Array.prototype.forEach.call(tabLinks, (link: HTMLAnchorElement) => {
        link.addEventListener('click', (event: MouseEvent) => {
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

export {
    init,
}
