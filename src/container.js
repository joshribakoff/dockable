angular.module('jrContainer', [])
    .directive('jrContainer', function() {
        function link(scope, element, attrs) {

        }

        function controller($scope, $element) {
            var containerElement = jQuery($element);

            $scope.showDropPlaceholder = false;

            $scope.$on('dockLeft', function() {
                $scope.showDropPlaceholder = 'left';
                $scope.$apply();
            });
            $scope.$on('dockRight', function() {
                $scope.showDropPlaceholder = 'right';
                $scope.$apply();
            });
            $scope.$on('dockTop', function() {
                $scope.showDropPlaceholder = 'top';
                $scope.$apply();
            });
            $scope.$on('dockBottom', function() {
                $scope.showDropPlaceholder = 'bottom';
                $scope.$apply();
            });
            $scope.$on('float', function() {
                $scope.showDropPlaceholder = 'float';
                $scope.$apply();
            });

            $scope.$on('onStop', function() {
                $scope.showDropPlaceholder = false;
                $scope.$apply();
            })
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