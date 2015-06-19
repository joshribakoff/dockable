# dockable

![demo gif](http://joshribakoff.github.io/dockable.gif)

Similar to "border layout" from Java, you've seen the UI pattern in your IDE. There have been numerous web based implementations such as:

- https://golden-layout.com
- http://layout.jquery-dev.com/
- http://dev.sencha.com/deploy/ext-4.0.0/examples/layout-browser/layout-browser.html (click on "Border" under "Basic Ext Layouts").

This "dockable" directive gives you the ability to have docked panels on the sides of your app. Panels can be collapsed or expanded by clicking on the associated tab. Tabs can be dragged & dropped to re-order them or move them from one edge of the screen to the other.

Depends on AngularJS, jQuery & jQuery-ui (sortable)

Usage:

HTML:
```html
<div ng-controller="demoController">
    <div jr-container="config"></div>
</div>
```

JS:
```js
.controller('demoController', function($scope) {
    $scope.config = {
        east: [
            {title: 'test 1', content: '<div><div example-directive></div></div>', compile: true},
            {title: 'test 2', content: 'hello world 2'}
        ],
        south: [
            {title: 'test 3', content: 'hello world 3'}
        ],
        west: [
            {title: 'test 5', content: 'hello world 5'}
        ]
    }
});
```

Simply define a layout config to start. The content will either be treated as raw HTML, or HTML containing a directive depending on the "compile" flag. Each time the panel is shown, the template will be re-compiled. If you want your directives to preserve state, you should do so yourself.