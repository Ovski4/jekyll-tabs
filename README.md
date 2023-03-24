Jekyll Tabs
===========

This Jekyll plugin provides tags used to add tabs in your content. It is heavily inspired from https://github.com/clustergarage/jekyll-code-tabs.
  * It works with multiple tab panels on the same page
  * It does not require a specific javascript framework

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

Which is why in the above example, we have to groups of tabs: `data-struct` and `log`.

Additional configuration
------------------------

### Sync tabs with similar names

If you wish to get all tabs with the same label synced, set the `syncTabsWithSameLabels` value to **true** in the `jekyllTabsConfiguration` object ([link to related line of code](https://github.com/Ovski4/jekyll-tabs/blob/master/docs/tabs.js#L5)).
