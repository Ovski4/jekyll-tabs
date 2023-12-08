const { activateTabFromUrl } = require('../js/tabsHelpers');
const { mockWindowLocationProperties } = require('./testHelper');

document.body.innerHTML = `
    <ul id="log" class="tab" data-tab="979a08d4-f68c-4aa6-8799-0fe03b5a0129" data-name="log">
        <li class="active" id="php">
            <a href="#">php</a>
        </li>
        <li id="js">
            <a href="#">js</a>
        </li>
        <li id="ruby">
            <a href="#">ruby</a>
        </li>
    </ul>
    <ul class="tab-content" id="979a08d4-f68c-4aa6-8799-0fe03b5a0129" data-name="log">
        <li id="php-tab-content" class="active">
            <pre>
                <code class="language-php">
                    var_dump('hello');
                </code>
            </pre>
        </li>
        <li id="js-tab-content">
            <pre>
                <code class="language-javascript">
                    console.log('hello');
                </code>
            </pre>
        </li>
        <li id="ruby-tab-content">
            <pre>
                <code class="language-javascript">
                    pputs 'hello'
                </code>
            </pre>
        </li>
    </ul>`
;

describe('Add or remove active classes depending on the url', () => {

    it('Should set classes when the js tab is specified in the url', () => {
        mockWindowLocationProperties({
            href: 'http://my-jekyll-website.com',
            search: '?active_tab=js',
            hash: '#log'
        });

        window.location.pathname = '?active_tab=js#log'

        const initialHTML = document.body.innerHTML;

        activateTabFromUrl();

        expect(document.body.innerHTML).not.toBe(initialHTML);

        expect(document.getElementById('js').className).toBe('active');
        expect(document.getElementById('php').className).toBe('');
        expect(document.getElementById('ruby').className).toBe('');

        expect(document.getElementById('js-tab-content').className).toBe('active');
        expect(document.getElementById('php-tab-content').className).toBe('');
        expect(document.getElementById('ruby-tab-content').className).toBe('');
    });

    it('Should set classes when the ruby tab is specified in the url', () => {
        mockWindowLocationProperties({
            href: 'http://my-jekyll-website.com',
            search: '?active_tab=ruby',
            hash: '#log',
        });

        const initialHTML = document.body.innerHTML;

        activateTabFromUrl();

        expect(document.body.innerHTML).not.toBe(initialHTML);

        expect(document.getElementById('js').className).toBe('');
        expect(document.getElementById('php').className).toBe('');
        expect(document.getElementById('ruby').className).toBe('active');

        expect(document.getElementById('js-tab-content').className).toBe('');
        expect(document.getElementById('php-tab-content').className).toBe('');
        expect(document.getElementById('ruby-tab-content').className).toBe('active');
    });

    it('Shouldn\'t set any classes when the hash is missing from the url', () => {
        mockWindowLocationProperties({
            href: 'http://my-jekyll-website.com',
            search: '?active_tab=ruby'
        });

        const initialHTML = document.body.innerHTML;

        activateTabFromUrl();

        expect(document.body.innerHTML).toBe(initialHTML);
    });

    it('Shouldn\'t set any classes when the hash is referencing an unexisting id', () => {
        mockWindowLocationProperties({
            href: 'http://my-jekyll-website.com',
            search: '?active_tab=ruby',
            hash: '#missing',
        });

        const initialHTML = document.body.innerHTML;

        activateTabFromUrl();

        expect(document.body.innerHTML).toBe(initialHTML);
    });

    it('Shouldn\'t set any classes when the active_tab query param is missing from the url', () => {
        mockWindowLocationProperties({
            href: 'http://my-jekyll-website.com',
            search: '?some_param=ruby',
            hash: '#log',
        });

        const initialHTML = document.body.innerHTML;

        activateTabFromUrl();

        expect(document.body.innerHTML).toBe(initialHTML);
    });

    it('Shouldn\'t set any classes when the active_tab query param is referencing an unexisting id', () => {
        mockWindowLocationProperties({
            href: 'http://my-jekyll-website.com',
            search: '?active_tab=missing',
            hash: '#log',
        });

        const initialHTML = document.body.innerHTML;

        activateTabFromUrl();

        expect(document.body.innerHTML).toBe(initialHTML);
    });
});
