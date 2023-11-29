const { addCopyToClipboardButtons } = require('../js/tabsHelpers');

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
        <li id="no-code">
            <a href="#">No code</a>
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
        <li id="nocode-tab-content">
            This is just a string.
        </li>
    </ul>`
;

describe('Add copy to clipboard buttons.', () => {

    const removeAllWhitespaces = (string) => {
        return string.replace(/\s/g, '');
    }

    const expectedHtml = `
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
            <li id="no-code">
                <a href="#">No code</a>
            </li>
        </ul>
        <ul class="tab-content" id="979a08d4-f68c-4aa6-8799-0fe03b5a0129" data-name="log">
            <li id="php-tab-content" class="active" style="position: relative;">
                <pre>
                    <code class="language-php">
                        var_dump('hello');
                    </code>
                </pre>
                <button style="position: absolute; top: 0px; right: 0px;">
                    Copy me!
                </button>
            </li>
            <li id="js-tab-content" style="position: relative;">
                <pre>
                    <code class="language-javascript">
                        console.log('hello');
                    </code>
                </pre>
                <button style="position: absolute; top: 0px; right: 0px;">
                    Copy me!
                </button>
            </li>
            <li id="ruby-tab-content" style="position: relative;">
                <pre>
                    <code class="language-javascript">
                        pputs 'hello'
                    </code>
                </pre>
                <button style="position: absolute; top: 0px; right: 0px;">
                    Copy me!
                </button>
            </li>
            <li id="nocode-tab-content">
                This is just a string.
            </li>
        </ul>`
    ;

    it('Should add the buttons correctly', () => {
        addCopyToClipboardButtons('<button>Copy me!</button>');

        expect(removeAllWhitespaces(document.body.innerHTML)).toBe(removeAllWhitespaces(expectedHtml));
    });

});
