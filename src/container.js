angular.module('jrContainer', [])
    .directive('jrContainer', function() {
        function link(scope, element, attrs) {

        }

        function controller($scope, $element, $compile) {
            var containerElement = jQuery($element);

            function zoneFor(tabsEl) {
                var whichZone;
                if(tabsEl.hasClass('jrSouthTabs')) {
                    whichZone = 'South';
                } else if(tabsEl.hasClass('jrWestTabs')) {
                    whichZone = 'West';
                } else if(tabsEl.hasClass('jrEastTabs')) {
                    whichZone = 'East';
                }
                return whichZone;
            }

            var previousTabIndex = false;
            var panelToMove = false;

            var draggingGuid = false;

            containerElement.find('.jrPanelSouth').resizable({handles: 'n'});
            containerElement.find('.jrPanelEast').resizable({handles: 'w'});
            containerElement.find('.jrPanelWest').resizable({handles: 'e'});

            containerElement.find('.jrTabs')
                .sortable({
                    connectWith: '.jrTabs',
                    start: function(event, ui) {
                        var sender = jQuery(event.target);
                        var item = ui.item;
                        previousTabIndex = item.index();

                        var zone = zoneFor(sender);

                        draggingGuid = item.data('guid');
                        if(item.index() == currentlyOpen[zone.toLowerCase()]) {
                            panelToMove = containerElement.find('.jrPanel'+zone);
                            console.log('moving a tab for a panel thats currently open!');
                        }

                    },
                    stop: function(event, ui) {
                        var sender = jQuery(event.target);
                        var to = jQuery(event.toElement);
                        if(!to.hasClass('jrTabs')) {
                            to = to.parents('.jrTabs');
                        }
                        var item = ui.item;

                        senderZone = zoneFor(sender);
                        toZone = zoneFor(to);

                        console.log('moved ', draggingGuid);
                        draggingGuid = false;

                        updateConfig();

                        if(panelToMove) {
                            console.log('moved an open panel!');

                            panelToMove.removeClass('jrPanelOpen');
                            panelToMove = false;
                        }

                        updateHorizontalHeight();
                    }
                });

            function updateConfig() {
                var prevTabConfigs = [];
                angular.forEach($scope.jrContainer, function(zone) {
                    angular.forEach(zone, function(tab) {
                        prevTabConfigs.push(tab);
                    });
                });

                $scope.jrContainer = {east: [], west: [], south: []};

                angular.forEach($scope.jrContainer, function(tabs, zoneName) {
                    containerElement.find('.jr'+ucfirst(zoneName)+'Tabs li').each(function() {
                        var tab = jQuery(this);
                        var id = tab.data('guid');
                        angular.forEach(prevTabConfigs, function(prevTab) {
                            if(id === prevTab.guid) {
                                $scope.jrContainer[zoneName].push(prevTab);
                            }
                        });
                    });
                });

                $scope.$apply();
            }

            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }

            var config = $scope.jrContainer;

            angular.forEach($scope.jrContainer, function(tabs, zoneName) {
                angular.forEach(config[zoneName], function (tabConfig, indx) {
                    var id = guid();
                    config[zoneName][indx].guid = id;
                    var newTab = jQuery("<li data-guid=\"" + id + "\"><a href=\"\">" + tabConfig.title + "</a></li>");
                    containerElement.find('.jr'+ucfirst(zoneName)+'Tabs').append(newTab);
                });
            });

            var currentlyOpen = {
                east: '',
                west: '',
                south: ''
            };

            containerElement.on('click', '.jrTabs a', function(event) {
                event.preventDefault();
                event.stopPropagation();
                var item = jQuery(this).parents('li');
                var parentTabs = item.parents('.jrTabs');
                var zone = zoneFor(parentTabs);
                var panel = containerElement.find('.jrPanel' + zone);

                // set the flag for all panels to not expanded in the config
                angular.forEach($scope.jrContainer[zone.toLowerCase()], function(tabConfig) {
                    tabConfig.isExpanded = false;
                });

                if(!panel.hasClass('jrPanelOpen')) {
                    panel.addClass('jrPanelOpen');
                    panel.data('guid', item.data('guid'));

                    // flag the panel as expanded in the config
                    angular.forEach($scope.jrContainer[zone.toLowerCase()], function(tabConfig) {
                        if(tabConfig.guid === item.data('guid')) {
                            tabConfig.isExpanded = true;
                            $scope.$apply();
                        }
                    });

                } else if(panel.data('guid') === item.data('guid')) {
                    panel.removeClass('jrPanelOpen');

                    // flag the panel as NOT expanded in the config
                    angular.forEach($scope.jrContainer[zone.toLowerCase()], function(tabConfig) {
                        if(tabConfig.guid === item.data('guid')) {
                            tabConfig.isExpanded = false;
                            $scope.$apply();
                        }
                    });
                } else {
                    panel.data('guid', item.data('guid'));

                    // flag the panel as expanded in the config
                    angular.forEach($scope.jrContainer[zone.toLowerCase()], function(tabConfig) {
                        if(tabConfig.guid === item.data('guid')) {
                            tabConfig.isExpanded = true;
                            $scope.$apply();
                        }
                    });
                }

                var itemConfig = $scope.jrContainer[zone.toLowerCase()][item.index()];
                if(itemConfig.compile) {
                    var newScope = $scope.$new();
                    panel.find('.jrPanelContents').html($compile(itemConfig.content)(newScope));
                    newScope.$apply();
                } else {
                    panel.find('.jrPanelContents').html(itemConfig.content);
                }

                currentlyOpen[zone.toLowerCase()] = item.index();
                console.log(currentlyOpen);

                if('South' == zone) {
                    updateHorizontalHeight();
                }
            });

            function updateHorizontalHeight() {
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

            function ucfirst(str) {
                str += '';
                var f = str.charAt(0)
                    .toUpperCase();
                return f + str.substr(1);
            }

        }

        return {
            link: link,
            controller: controller,
            templateUrl: 'template/container.html',
            restrict: 'A',
            scope: {
                jrContainer: '='
            }
        }
    });