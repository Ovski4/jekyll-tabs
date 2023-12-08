const { syncTabsWithSameLabels } = require('../js/tabsHelpers');

document.body.innerHTML = `
    <h3 id="first-tabs">First tabs</h3>

    <ul id="log" class="tab" data-tab="979a08d4-f68c-4aa6-8799-0fe03b5a0129" data-name="log">
        <li id="php-log">
            <a href="#">php</a>
        </li>
        <li id="js-log">
            <a href="#">js</a>
        </li>
        <li id="ruby-log" class="active">
            <a href="#">ruby</a>
        </li>
    </ul>
    <ul class="tab-content" id="979a08d4-f68c-4aa6-8799-0fe03b5a0129" data-name="log">
        <li id="php-log-tab-content">
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
        <li id="ruby-log-tab-content" class="active">
            <pre>
                <code class="language-ruby">
                    pputs 'hello'
                </code>
            </pre>
        </li>
    </ul>

    Some links (<a href="http://some.site.com">Golang</a> and <a href="http://some-other.site.com">ruby</a>)

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

describe('Toggle active classes for all tabs with the same labels', () => {

    it('Should sync the ruby tabs', () => {
        const rubyLink = document.querySelector('ul.tab > li#ruby-log > a');

        const initialHTML = document.body.innerHTML;

        syncTabsWithSameLabels(rubyLink);

        expect(document.body.innerHTML).not.toBe(initialHTML);

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

});
