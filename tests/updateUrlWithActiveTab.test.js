const { updateUrlWithActiveTab } = require('../js/tabsHelpers');
const { mockWindowLocationProperties } = require('./testHelper');

const initialHTML = `
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

document.body.innerHTML = initialHTML;

describe('Update the url when clicking on a tab', () => {

    it('Should update the url to set the "js" tab as active', () => {
        const replaceStateMock = jest.fn();

        mockWindowLocationProperties(
            {
                href: 'http://my-jekyll-website.com',
                pathname: '/article/my-test',
                search: '?existing_param=2',
            },
            replaceStateMock
        );

        const jsLink = document.querySelector('ul.tab > li#js > a');

        updateUrlWithActiveTab(jsLink);

        expect(replaceStateMock).toHaveBeenCalledWith(null, '', '/article/my-test?existing_param=2&active_tab=js#log');
    });

});
