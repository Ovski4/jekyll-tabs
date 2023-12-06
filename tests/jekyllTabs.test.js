const jekyllTabs = require('../js/jekyllTabs');
const { mockWindowLocationProperties } = require('./testHelper');

const initialHTML = `
    <h3 id="first-tabs">First tabs</h3>

    <ul id="log" class="tab" data-tab="979a08d4-f68c-4aa6-8799-0fe03b5a0129" data-name="log">
        <li id="php-log" class="active">
            <a href="#">php</a>
        </li>
        <li id="js-log">
            <a href="#">js</a>
        </li>
        <li id="ruby-log">
            <a href="#"> ruby </a>
        </li>
    </ul>
    <ul class="tab-content" id="979a08d4-f68c-4aa6-8799-0fe03b5a0129" data-name="log">
        <li id="php-log-tab-content" class="active">
            <pre>
                <code class="language-php">
                    var_dump('hello');
                </code>
            </pre>
        </li>
        <li id="js-log-tab-content">
            <pre>
                <code class="language-javascript">
                    console.log('hello');
                </code>
            </pre>
        </li>
        <li id="ruby-log-tab-content">
            <pre>
                <code class="language-ruby">
                    pputs 'hello'
                </code>
            </pre>
        </li>
    </ul>

    <h3 id="second-tabs">Second tabs</h3>

    <ul id="hello-world" class="tab" data-tab="9ff55bfd-c8b5-4312-a397-eee3ad2cb372" data-name="hello-world">
        <li id="golang-hello-world" class="active">
            <a href="#">golang</a>
        </li>
        <li id="ruby-hello-world">
            <a href="#">ruby</a>
        </li>
    </ul>
    <ul class="tab-content" id="9ff55bfd-c8b5-4312-a397-eee3ad2cb372" data-name="hello-world">
        <li id="golang-hello-world-tab-content" class="active">
            <pre>
                <code class="language-golang">
                    func main() {
                        fmt.Println("hello world")
                    }
                </code>
            </pre>
        </li>
        <li id="ruby-hello-world-tab-content">
            <pre>
                <code class="language-ruby">
                    pputs 'hello'
                </code>
            </pre>
        </li>
    </ul>`
;

const replaceStateMock = jest.fn();

mockWindowLocationProperties(
    {
        href: 'http://my-jekyll-website.com',
        pathname: '/article/my-test',
        search: '?active_tab=ruby-log',
        hash: '#log',
    },
    replaceStateMock
);

describe('Module behaviour can be configured', () => {

    it('Should not set any aditional behaviours', () => {
        document.body.innerHTML = initialHTML;

        jekyllTabs.init();

        window.dispatchEvent(new Event('load'));

        const rubyLink = document.querySelector('ul.tab > li#ruby-log > a');
        rubyLink.click();

        // Tabs should be activated, but not synced.
        expect(document.getElementById('php-log').className).toBe('');
        expect(document.getElementById('js-log').className).toBe('');
        expect(document.getElementById('ruby-log').className).toBe('active');

        expect(document.getElementById('golang-hello-world').className).toBe('active');
        expect(document.getElementById('ruby-hello-world').className).toBe('');

        expect(document.getElementById('php-log-tab-content').className).toBe('');
        expect(document.getElementById('js-log-tab-content').className).toBe('');
        expect(document.getElementById('ruby-log-tab-content').className).toBe('active');

        expect(document.getElementById('golang-hello-world-tab-content').className).toBe('active');
        expect(document.getElementById('ruby-hello-world-tab-content').className).toBe('');

        // Copy buttons should not be added
        const buttons = document.querySelectorAll('button');
        expect(buttons.length).toBe(0);

        // Url shouldn't be updated
        expect(replaceStateMock).not.toHaveBeenCalled();
    });

    it('Should set behaviour to sync the tabs', () => {
        document.body.innerHTML = initialHTML;

        jekyllTabs.init({
            syncTabsWithSameLabels: true,
        });

        window.dispatchEvent(new Event('load'));

        // Should activate tabs on click
        document.querySelector('ul.tab > li#ruby-log > a').click();

        expect(document.getElementById('php-log').className).toBe('');
        expect(document.getElementById('js-log').className).toBe('');
        expect(document.getElementById('ruby-log').className).toBe('active');

        expect(document.getElementById('golang-hello-world').className).toBe('');
        expect(document.getElementById('ruby-hello-world').className).toBe('active');

        expect(document.getElementById('php-log-tab-content').className).toBe('');
        expect(document.getElementById('js-log-tab-content').className).toBe('');
        expect(document.getElementById('ruby-log-tab-content').className).toBe('active');

        expect(document.getElementById('golang-hello-world-tab-content').className).toBe('');
        expect(document.getElementById('ruby-hello-world-tab-content').className).toBe('active');
    });

    it('Should add copy buttons with the default button markup', () => {
        document.body.innerHTML = initialHTML;

        jekyllTabs.init({
            addCopyToClipboardButtons: true,
        });

        window.dispatchEvent(new Event('load'));

        const buttons = document.querySelectorAll('button');

        expect(buttons.length).toBe(5);
        expect(buttons[0].textContent).toBe('Copy');
    });

    it('Should add copy buttons with the configured button markup', () => {
        document.body.innerHTML = initialHTML;

        jekyllTabs.init({
            addCopyToClipboardButtons: true,
            copyToClipboardSettings: {
                buttonHTML: '<button><span class="btn">Copy me!</span></button>',
            },
        });

        window.dispatchEvent(new Event('load'));

        const buttons = document.querySelectorAll('.btn');

        expect(buttons.length).toBe(5);
        expect(buttons[0].textContent).toBe('Copy me!');
    });

    it('Should activate the tab from the URL, and update the URL on tab clicks if activateTabFromUrl is enabled', () => {
        document.body.innerHTML = initialHTML;

        jekyllTabs.init({
            activateTabFromUrl: true,
        });

        window.dispatchEvent(new Event('load'));

        expect(document.getElementById('php-log').className).toBe('');
        expect(document.getElementById('js-log').className).toBe('');
        expect(document.getElementById('ruby-log').className).toBe('active');

        expect(document.getElementById('golang-hello-world').className).toBe('active');
        expect(document.getElementById('ruby-hello-world').className).toBe('');

        expect(document.getElementById('php-log-tab-content').className).toBe('');
        expect(document.getElementById('js-log-tab-content').className).toBe('');
        expect(document.getElementById('ruby-log-tab-content').className).toBe('active');

        expect(document.getElementById('golang-hello-world-tab-content').className).toBe('active');
        expect(document.getElementById('ruby-hello-world-tab-content').className).toBe('');

        document.querySelector('ul.tab > li#php-log > a').click();

        expect(replaceStateMock).toHaveBeenCalledWith(null, '', '/article/my-test?active_tab=php-log#log');
    });
});
