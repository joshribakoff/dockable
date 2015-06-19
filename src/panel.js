angular.module('jrPanel', [])
    .directive('jrPanel', function() {
        function link(scope, element, attrs) {

        }

        function controller($scope, $element) {
            var panelElement = jQuery($element);
            var containerElement = panelElement.parents('.jr-container');

            var isDocked = false;
            var lastUndockedPosition = positions(panelElement);

            function positions(el) {
                var o = el.offset();
                var w = el.width();
                var h = el.height();

                return {
                    left: o.left,
                    right: o.left + w,
                    top: o.top,
                    bottom: o.top + h,
                    width: w,
                    height: h
                };
            }

            function dockTo(edge) {
                panelElement.find('.jr-collapse-up').hide();
                panelElement.find('.jr-collapse-down').hide();
                panelElement.find('.jr-collapse-left').hide();
                panelElement.find('.jr-collapse-right').hide();

                switch(edge) {
                    case 'left':
                        panelElement.find('.jr-collapse-left').show();
                        isDocked = 'left';
                        panelElement.css({
                            width: 'auto',
                            height: 'auto',
                            left: 0,
                            right: '80%',
                            top: 0,
                            bottom: 0
                        });
                        break;
                    case 'right':
                        panelElement.find('.jr-collapse-right').show();
                        isDocked = 'right';
                        panelElement.css({
                            width: 'auto',
                            height: 'auto',
                            left: '80%',
                            right: 0,
                            top: 0,
                            bottom: 0
                        });
                        break;
                    case 'top':
                        panelElement.find('.jr-collapse-up').show();
                        isDocked = 'top';
                        panelElement.css({
                            width: 'auto',
                            height: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: '80%'
                        });
                        break;
                    case 'bottom':
                        panelElement.find('.jr-collapse-down').show();
                        isDocked = 'bottom';
                        panelElement.css({
                            width: 'auto',
                            height: 'auto',
                            left: 0,
                            right: 0,
                            top: '80%',
                            bottom: 0
                        });
                        break;
                }
            }

            function onStart(event, ui) {
                //console.log('start', event, ui);
            }

            var dockThreshold = 0.2;

            function onStop(event, ui) {
                $scope.$emit('onStop');

                
                var area = areaPanelIsOver();
                if('float' != area) {
                    dockTo(area);
                } else {
                    if(false !== isDocked) {
                        console.log('restore width/height from last known positions ', lastUndockedPosition);
                        panelElement.css({
                            width: lastUndockedPosition.width,
                            height: lastUndockedPosition.height
                        });
                    } else {
                        lastUndockedPosition = positions(panelElement);
                        console.log('set positions to ', lastUndockedPosition);
                    }
                }
            }

            function onDrag(event, ui) {
                switch(areaPanelIsOver()) {
                    case 'left':
                        $scope.$emit('dockLeft');
                        break;
                    case 'right':
                        $scope.$emit('dockRight');
                        break;
                    case 'top':
                        $scope.$emit('dockTop');
                        break;
                    case 'bottom':
                        $scope.$emit('dockBottom');
                        break;
                    case 'float':
                        $scope.$emit('float');
                        break;
                }
            }

            function areaPanelIsOver() {
                var panelOffset = panelElement.offset();
                var containerPosition = positions(containerElement);

                if(panelOffset.left <= containerPosition.left + dockThreshold * containerPosition.width) {
                    return('left');
                } else if(panelOffset.left >= containerPosition.right - dockThreshold * containerPosition.width) {
                    return('right');
                } else if(panelOffset.top <= containerPosition.top + dockThreshold * containerPosition.height) {
                    return('top');
                } else if(panelOffset.top >= containerPosition.bottom - dockThreshold * containerPosition.height) {
                    return('bottom');
                } else {
                    return('float');
                }
            }

            var isCollapsed = false;
            var unCollapsedRight, unCollapsedLeft;

            $scope.collapse = function() {
                panelElement.find('.jr-expand-up').hide();
                panelElement.find('.jr-expand-down').hide();
                panelElement.find('.jr-expand-left').hide();
                panelElement.find('.jr-expand-right').hide();

                unCollapsedRight = panelElement.css('right');
                unCollapsedLeft = panelElement.css('left');

                panelElement.addClass('jr-collapsed');
                switch(isDocked) {
                    case 'left':
                        panelElement.find('.jr-expand-right').show();
                        panelElement.css({
                            right: '',
                            width: '10px'
                        });
                        break;
                    case 'right':
                        panelElement.find('.jr-expand-left').show();
                        panelElement.css({
                            left: '',
                            width: '10px'
                        });
                        break;
                }
                isCollapsed = true;
            };

            $scope.expand = function() {
                panelElement.removeClass('jr-collapsed');
                switch(isDocked) {
                    case 'left':
                        panelElement.css({
                            right: unCollapsedRight,
                            width: ''
                        });
                        break;
                    case 'right':
                        panelElement.css({
                            left: unCollapsedLeft,
                            width: ''
                        });
                        break;
                }
                isCollapsed = false;
            };

            panelElement.draggable({
                handle: '.jr-panel-draggable-handle-js',
                start: onStart,
                stop: onStop,
                drag: onDrag
            });

            panelElement.find('.jr-collapse-up').hide();
            panelElement.find('.jr-collapse-down').hide();
            panelElement.find('.jr-collapse-left').hide();
            panelElement.find('.jr-collapse-right').hide();

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