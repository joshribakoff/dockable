angular.module('jrContainer', [])
    .directive('jrContainer', function() {
        function link(scope, element, attrs) {

        }

        function controller($scope, $element) {
            var containerElement = jQuery($element);

            containerElement.find('.jrTabs')
                .sortable({
                    connectWith: '.jrTabs'
                });

            $scope.$watch('jrContainerConfig', function(config) {
                angular.forEach(config.east, function(name) {
                    var newTab = jQuery("<li><a href=\"\">" + name + "</a></li>");
                    containerElement.find('.jrEastTabs').append(newTab);
                });
                angular.forEach(config.west, function(name) {
                    var newTab = jQuery("<li><a href=\"\">" + name + "</a></li>");
                    containerElement.find('.jrWestTabs').append(newTab);
                });
                angular.forEach(config.south, function(name) {
                    var newTab = jQuery("<li><a href=\"\">" + name + "</a></li>");
                    containerElement.find('.jrSouthTabs').append(newTab);
                });
            });

            containerElement.on('click', '.jrTabs a', function(event) {
                event.preventDefault();
                event.stopPropagation();
                var clicked = jQuery(this);
                var parentTabs = clicked.parents('.jrTabs');
                var whichZone;
                if(parentTabs.hasClass('jrSouthTabs')) {
                    whichZone = 'South';
                } else if(parentTabs.hasClass('jrWestTabs')) {
                    whichZone = 'West';
                } else if(parentTabs.hasClass('jrEastTabs')) {
                    whichZone = 'East';
                }
                var panel = containerElement.find('.jrPanel' + whichZone);
                panel.toggleClass('jrPanelOpen');
                panel.html(clicked.text());
                console.log('clicked a tab in zone',whichZone);

                if('South' == whichZone) {
                    var sPanel = containerElement.find('.jrPanelSouth');
                    var sTabs = containerElement.find('.jrSouthTabs');
                    var top;
                    if(sPanel.hasClass('jrPanelOpen')) {
                        top = (sPanel.height() + sTabs.height()) / containerElement.height();
                    } else {
                        top = sTabs.height() / containerElement.height();
                    }
                    containerElement.find('.jr-horizontal').css('bottom', top*100+'%');
                }
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
                jrContainerConfig: '='
            }
        }
    });