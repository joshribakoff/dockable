angular
    .module('jrApp', ['jrPanel', 'jrContainer'])
    .controller('demoController', function($scope) {
        $scope.config = {
            east: ['test 1', 'test 2'],
            south: ['test 3', 'test 4'],
            west: ['test 5', 'test 6']
        }
    });