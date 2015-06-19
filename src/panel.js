angular.module('jrPanel', [])
    .directive('jrPanel', function() {
        function link(scope, element, attrs) {

        }

        function controller($scope, $element) {
            var panelElement = jQuery($element);
            var containerElement = panelElement.parents('.jr-container');

        }

        return {
            link: link,
            controller: controller,
            templateUrl: 'template/panel.html',
            restrict: 'E',
            replace: true,
            scope: {
                jrPanel: '='
            }
        }
    });