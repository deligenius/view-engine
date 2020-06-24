# Denjucks

Denjucks is a powerful templating language and engine for Deno applications, and provides an easy syntax for making scalable web applications using Deno.

Internally, Denjucks is a fork of Mozilla's Nunjucks for NodeJS, with the following changes:

 * Uses ESM syntax instead of CommonJS syntax
 * Uses Deno file system APIs instead of NodeJS file system APIs
 * Wraps all NodeJS dependencies into ESM compatible syntax


## Installation

To install, simply import the raw module from the github repository in your Deno code:

```javascript
import denjucks from "https://deno.land/x/denjucks/mod.js";
```

When running the file the first time, the source code for denjucks will be downloaded and cached on your machine.


## Basic Usage

**Rendering a template from a string:**

```javascript
import denjucks from "https://deno.land/x/denjucks/mod.js";

console.log(
    denjucks.renderString("hello {{ txt }}", {txt: "world"})
);
```

will print to the console:

```javascript
hello world
```


**Rendering a template from a file:**

_Remember to include the --allow-read flag when running the deno command or an error will be thrown, as the deno sandbox prevents reads by default_

With the file **_base.html** as the parent template:

```html
<html>
    <head></head>
    <body>
        {% block content %}{% endblock content %}
    </body>
</html>
```

And the file **index.html** as the template that will extend the parent:

```html
{% extends "_base.html" %}

{% block content %}
    <p>Hello {{ txt }}</p>
{% endblock content %}
```

Calling render on **index.html**:

```javascript
import denjucks from "https://deno.land/x/denjucks/mod.js";

console.log(
    denjucks.render("index.html", {txt: "World"})
);
```

Will print to the console:

```html
<html>
    <head></head>
    <body>
        <p>Hello World</p>
    </body>
</html>
```


## Documentation

Since Denjucks is a port of Nunjucks, it uses the exact same syntax as Nunjucks. See [here](https://mozilla.github.io/nunjucks/) for full documentation on Nunjucks.


# References

[Nunjucks](https://mozilla.github.io/nunjucks/) is a full featured
templating engine for javascript. It is heavily inspired by
[jinja2](http://jinja.pocoo.org/). View the docs
[here](https://mozilla.github.io/nunjucks/).
