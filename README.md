# Expanding textareas

This is a plugin for jQuery that makes textareas expand as you type, with an emphasis on speed/responsiveness. Also, it handles textareas with percentage widths that might change size for whatever reason. This might be handy for responsive design, when the browser window is resized, or if there is an orientation change on a phone or tablet.

<a href="http://textarea.andrewfiorillo.com/" target="_blank">View the demo &raquo;</a>

## Usage

Include jQuery and expander.js

```html
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="expander.js"></script>
```

Call expander on whatever element or elements you'd like:

```javascript
// A single 
$('#expander').expander();

// All texareas
$('textarea').expander();
```
