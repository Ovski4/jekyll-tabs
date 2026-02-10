Jekyll Tabs
===========

[![Jest tests](https://github.com/Ovski4/jekyll-tabs/actions/workflows/node.js.yml/badge.svg)](https://github.com/Ovski4/jekyll-tabs/actions/workflows/node.js.yml)

This Jekyll plugin provides tags used to add tabs in your content. It is heavily inspired from https://github.com/clustergarage/jekyll-code-tabs.
  * It works with multiple tab panels on the same page.
  * It does not require a specific javascript framework.

Additionally, you can:
  * Sync tabs with similar labels.
  * Have a specific tab automatically opened on page load.
  * Add a "copy to clipboard" button for tabs that contain code.

Table of contents
-----------------

- [Installation](#installation)
  - [Install the plugin](#install-the-plugin)
  - [Include the javascript](#include-the-javascript)
  - [Style the tabs](#style-the-tabs)
- [Usage](#usage)
  - [Create the markup](#create-the-markup)
- [Additional configuration](#additional-configuration)
  - [Sync tabs with similar labels](#sync-tabs-with-similar-labels)
  - [Open a specific tab on page load](#open-a-specific-tab-on-page-load)
  - [Add a copy to clipboard button](#add-a-copy-to-clipboard-button)
- [Development](#development)
  - [Building the script](#building-the-script)
  - [Building and pushing the gem](#building-and-pushing-the-gem)
  - [Run the tests](#run-the-tests)

Installation
------------

### Install the plugin

Add this line to your `Gemfile`:

```ruby
group :jekyll_plugins do
  # ... other gems
  gem "jekyll-tabs"
end
```

Install the gem by running:

```bash
bundle install
```

Then add the gem to the plugin list in your `_config.yml` file:

```yaml
plugins:
  - jekyll-tabs
```

### Include the javascript

Copy the content of [this file](https://raw.githubusercontent.com/Ovski4/jekyll-tabs/master/docs/tabs.js) in your public folder (for example **assets/js/tabs.js**), and include the script in your layout (such as **_layouts/default.html**).

```html
<!DOCTYPE html>
<html lang="en-us">
    <head>
        ...
    </head>
    <body>
        {{ content }}
        <script src="/assets/js/tabs.js"></script>
    </body>
</html>
```

### Style the tabs

Feel free to style it the way you want. You can use [this existing css file](https://raw.githubusercontent.com/Ovski4/jekyll-tabs/master/docs/tabs.css) to get started.

Paste the content in a file (for example **assets/css/custom.css**), and include it in the html <head> tag of your jekyll website.

```html
<!DOCTYPE html>
<html lang="en-us">
    <head>
        ...
        <link rel="stylesheet" href="/assets/css/custom.css">
    </head>
    <body>
        ....
```

You are all set! Let's see the markup.

Usage
-----

### Create the markup

````
### First tabs

{% tabs log %}

{% tab log php %}
```php
var_dump('hello');
```
{% endtab %}

{% tab log js %}
```javascript
console.log('hello');
```
{% endtab %}

{% tab log ruby %}
```javascript
pputs 'hello'
```
{% endtab %}

{% endtabs %}

### Second tabs

{% tabs data-struct %}

{% tab data-struct yaml %}
```yaml
hello:
  - 'whatsup'
  - 'hi'
```
{% endtab %}

{% tab data-struct json %}
```json
{
    "hello": ["whatsup", "hi"]
}
```
{% endtab %}

{% endtabs %}

````

Here is the result:

![Example to demo how tabs will render](docs/tabs-example.png)

In the following markup:

```
{% tab data-struct Some label here %}
```

* The first word after the `tab` keyword (`data-struct` here) is used to group tabs.
* All words after will be displayed as the tab label.

Which is why in the above example, we have 2 groups of tabs: `data-struct` and `log`.

Additional configuration
------------------------

Developers can configure specific tab behaviors by passing an object as an argument to the `jekyllTabs` module [init()](https://github.com/Ovski4/jekyll-tabs/blob/master/docs/tabs.js#L4) method. Without passing any object, the default configuration is equivalent to the following:

```js
jekyllTabs.init({
    syncTabsWithSameLabels: false,
    activateTabFromUrl: false,
    addCopyToClipboardButtons: false,
    copyToClipboardSettings: {
        buttonHTML: '<button>Copy</button>',
        showToastMessageOnCopy: false,
        toastMessage: 'Code copied to clipboard',
        toastDuration: 3000,
    }
});
```

### Sync tabs with similar labels

To get all tabs with the same label synced, set the `syncTabsWithSameLabels` property value to **true**.

```js
jekyllTabs.init({
    syncTabsWithSameLabels: true,
});
```

### Open a specific tab on page load

To link and open a specific tab on page load, set the `activateTabFromUrl` property value to **true**.

```js
jekyllTabs.init({
    activateTabFromUrl: true,
});
```

You will need to append a combination of url anchor (#) and query param (?active_tab) to the page URL.

* The anchor is used to target the tab group
* The query parameter `active_tab` is used to target the tab that will open

Clicking on a tab will automatically set the anchor and query parameter in the url.

### Add a copy to clipboard button

To get a button that will copy the code within a tab, set the `addCopyToClipboardButtons` property value to **true**.

This will apply only if `<pre>` tags can be found inside the tabs contents.

You can override the button HTML using the `copyToClipboardSettings.buttonHTML` property. The default value is `<button>Copy</button>`.

```js
jekyllTabs.init({
    addCopyToClipboardButtons: true,
    copyToClipboardSettings: {
        buttonHTML: '<button class="btn">Copy me!</button>',
    }
});
```

To give users a visual indicator that the code has been copied, you can display a toast message that will disappear after a short period of time.

Set `showToastMessageOnCopy` to `true` under the `copyToClipboardSettings` property to set it up. You can also update the message text as well as how long it will be displayed.

```js
jekyllTabs.init({
    addCopyToClipboardButtons: true,
    copyToClipboardSettings: {
        buttonHTML: '<button>Copy</button>',
        showToastMessageOnCopy: true,
        toastMessage: 'Code copied to clipboard',
        toastDuration: 3000, // duration in milliseconds
    }
});
```

Default styles for the toast message are present in the [css file](https://github.com/Ovski4/jekyll-tabs/blob/master/docs/tabs.css#L50-L70).

Development
-----------

### Building the script

Execute:

```bash
npm run build
```

The add the following content to the `tabs.js` file.

```js
window.addEventListener('load', function () {
    jekyllTabs.init();
});
```

### Building and pushing the gem

Update the version number in `jekyll-tabs/version.rb`, then execute:

```bash
gem build jekyll-tabs.gemspec
gem push jekyll-tabs-{version_here}.gem
```

### Run the tests

```bash
npm test
```