const { handleTabClicked } = require('../js/tabsHelpers');

document.body.innerHTML = `
    <ul id="log" class="tab" data-tab="979a08d4-f68c-4aa6-8799-0fe03b5a0129" data-name="log">
        <li class="some-class active another-class" id="php">
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
        <li id="js-tab-content" class="my-class">
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

describe('Add or remove active classes on tab list items.', () => {

    it('Shouldn\'t change anything if the tab is already active', () => {
        const phpLink = document.querySelector('ul.tab > li#php > a');

        const initialHTML = document.body.innerHTML;

        handleTabClicked(phpLink);

        expect(document.body.innerHTML).toBe(initialHTML);
    });

    it('Should set classes when the js tab is clicked on', () => {
        const jsLink = document.querySelector('ul.tab > li#js > a');

        const initialHTML = document.body.innerHTML;

        handleTabClicked(jsLink);

        expect(document.body.innerHTML).not.toBe(initialHTML);

        expect(document.getElementById('js').className).toBe('active');
        expect(document.getElementById('php').className).toBe('some-class another-class');
        expect(document.getElementById('ruby').className).toBe('');

        expect(document.getElementById('js-tab-content').className).toBe('my-class active');
        expect(document.getElementById('php-tab-content').className).toBe('');
        expect(document.getElementById('ruby-tab-content').className).toBe('');
    });

    it('Should set classes when the ruby tab is clicked on', () => {
        const rubyLink = document.querySelector('ul.tab > li#ruby > a');

        const initialHTML = document.body.innerHTML;

        handleTabClicked(rubyLink);

        expect(document.body.innerHTML).not.toBe(initialHTML);

        expect(document.getElementById('js').className).toBe('');
        expect(document.getElementById('php').className).toBe('some-class another-class');
        expect(document.getElementById('ruby').className).toBe('active');

        expect(document.getElementById('js-tab-content').className).toBe('my-class');
        expect(document.getElementById('php-tab-content').className).toBe('');
        expect(document.getElementById('ruby-tab-content').className).toBe('active');
    });

});
