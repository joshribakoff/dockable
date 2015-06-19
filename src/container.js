angular.module('jrContainer', [])
    .directive('jrContainer', function() {
        function link(scope, element, attrs) {

        }

        function controller($scope, $element) {
            var containerElement = jQuery($element);

            containerElement.find('.jrTabs').sortable({
                connectWith: '.jrTabs'
            });
        }

        return {
            link: link,
            controller: controller,
            templateUrl: 'template/container.html',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                jrContainer: '='
            }
        }
    });