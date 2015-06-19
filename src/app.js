angular
    .module('jrApp', ['jrPanel', 'jrContainer'])
    .controller('demoController', function($scope) {
        $scope.config = {
            east: [
                {title: 'test 1', content: 'hello world 1'},
                {title: 'test 2', content: 'hello world 2'},
            ],
            south: [
                {title: 'test 3', content: 'hello world 3'},
                {title: 'test 4', content: 'hello world 4'},
            ],
            west: [
                {title: 'test 5', content: 'hello world 5'},
                {title: 'test 6', content: 'hello world 6'},
            ]
        }
    });