const { handleTabClicked } = require('../js/tabsHelpers');

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

// document.body.innerHTML = `
//     <h3 id="first-tabs">First tabs</h3>

//     <ul id="log" class="tab" data-tab="979a08d4-f68c-4aa6-8799-0fe03b5a0129" data-name="log">
//         <li class="active" id="php">
//             <a href="#">php</a>
//         </li>
//         <li id="js">
//             <a href="#">js</a>
//         </li>
//         <li id="ruby">
//             <a href="#">ruby</a>
//         </li>
//     </ul>
//     <ul class="tab-content" id="979a08d4-f68c-4aa6-8799-0fe03b5a0129" data-name="log">
//         <li class="active">
//             <pre>
//                 <code class="language-php">
//                     var_dump('hello');
//                 </code>
//             </pre>
//         </li>
//         <li>
//             <pre>
//                 <code class="language-javascript">
//                     console.log('hello');
//                 </code>
//             </pre>
//         </li>
//         <li>
//             <pre>
//                 <code class="language-javascript">
//                     pputs 'hello'
//                 </code>
//             </pre>
//         </li>
//     </ul>

//     <h3 id="second-tabs">Second tabs</h3>

//     <ul id="data-struct" class="tab" data-tab="9ff55bfd-c8b5-4312-a397-eee3ad2cb372" data-name="data-struct">
//         <li class="active" id="yaml">
//             <a href="#">yaml</a>
//         </li>
//         <li id="json">
//             <a href="#">json</a>
//         </li>
//     </ul>
//     <ul class="tab-content" id="9ff55bfd-c8b5-4312-a397-eee3ad2cb372" data-name="data-struct">
//         <li class="active">
//             <pre>
//                 <code class="language-yaml">
//                     hello:
//                         - 'whatsup'
//                         - 'hi'
//                 </code>
//             </pre>
//         </li>
//         <li>
//             <pre>
//                 <code class="language-json">
//                     {
//                         "hello": [
//                             "whatsup",
//                             "hi"
//                         ]
//                     }
//                 </code>
//             </pre>
//         </li>
//     </ul>`
// ;

describe('Add or remove active classes on tab list items.', () => {

    it('Shouldn\'t change anything if the tab is already active', () => {
        const phpLink = document.querySelector('ul.tab > li#php > a');

        const initialHtml = document.body.innerHTML;

        handleTabClicked(phpLink);

        expect(document.body.innerHTML).toBe(initialHtml);
    });

    it('Should set classes when the js tab is clicked on', () => {
        const jsLink = document.querySelector('ul.tab > li#js > a');

        const initialHtml = document.body.innerHTML;

        handleTabClicked(jsLink);

        expect(document.body.innerHTML).not.toBe(initialHtml);

        expect(document.getElementById('js').className).toBe('active');
        expect(document.getElementById('php').className).toBe('');
        expect(document.getElementById('ruby').className).toBe('');

        expect(document.getElementById('js-tab-content').className).toBe('active');
        expect(document.getElementById('php-tab-content').className).toBe('');
        expect(document.getElementById('ruby-tab-content').className).toBe('');
    });

    it('Should set classes when the ruby tab is clicked on', () => {
        const rubyLink = document.querySelector('ul.tab > li#ruby > a');

        const initialHtml = document.body.innerHTML;

        handleTabClicked(rubyLink);

        expect(document.body.innerHTML).not.toBe(initialHtml);

        expect(document.getElementById('js').className).toBe('');
        expect(document.getElementById('php').className).toBe('');
        expect(document.getElementById('ruby').className).toBe('active');

        expect(document.getElementById('js-tab-content').className).toBe('');
        expect(document.getElementById('php-tab-content').className).toBe('');
        expect(document.getElementById('ruby-tab-content').className).toBe('active');
    });

});
