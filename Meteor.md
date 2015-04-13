## Meteor

Because of how meteor renders templates reactively you will need to initialize
manually for the templates you want to use vide in.

```js
Template.templateName.onRendered(function() {
  this.$('#elementName').vide('fileNameWithoutExtension');
});
```

Meteor integration by [zimme](https://github.com/zimme).
