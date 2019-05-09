angular.module('app')
    .component('fqlComponent', {
        templateUrl: 'app/fql/fqlComponent.html',
        bindings: {
            type:'<'
        },
        controller:['$scope','$stateParams' ,function($scope,$stateParams){

            //var ctrl = this;
            var appName = $stateParams.appName;
            $scope.fqlInput="ALERT WHERE ";
            $scope.autoCompleteList=['WHERE','IN','AND','OR'];

            /*

            this.$onChanges = function () {
                appName = $stateParams.appName;
            };
            */

            /*****************************get cursor Position to start evalue*************************************/
            $scope.currentWordPosVal = -1;

            $scope.inputChange = function($event) {
                disableTooltip();
                var myEl = $event.target;

                //TODO: if up, down, enter

                var cursorPosVal= doGetCaretPosition(myEl);
                updateAutoComplete(cursorPosVal);
                showTooltip();

            };

            function doGetCaretPosition(oField) {

                // Initialize
                var iCaretPos = 0;

                // IE Support
                if (document.selection) {

                    // Set focus on the element
                    oField.focus ();

                    // To get cursor position, get empty selection range
                    var oSel = document.selection.createRange ();

                    // Move selection start to 0 position
                    oSel.moveStart ('character', -oField.value.length);

                    // The caret position is selection length
                    iCaretPos = oSel.text.length;
                }

                // Firefox support
                else if (oField.selectionStart || oField.selectionStart === '0')
                    iCaretPos = oField.selectionStart;

                // Return results
                $scope.cursorPosVal = iCaretPos;
                return iCaretPos;
            }


            /******************************** tooltip **********************************/
            function disableTooltip() {
                $scope.showAutoComplete = false;
            }

            $scope.disableTooltip = function () {
                disableTooltip();
            };

            function showTooltip() {
                $scope.showAutoComplete = true;
            }


            $scope.addtoInput = function () {

            };


            /******************************* predict ***********************************/
            
            function updateAutoComplete(cursorPosVal) {
                var beforeCursor= $scope.fqlInput.substring(0,cursorPosVal);
                $scope.currentWordPosVal = beforeCursor.lastIndexOf(' ')+1;

                if (beforeCursor.endsWith(' ')) { // cusor is at the end and right after a space, it can not be detect!
                    console.log('endwithSpace');
                    $scope.currentWordPosVal = beforeCursor.length;
                }
                console.log($scope.currentWordPosVal);

                var currWord = $scope.fqlInput.substring($scope.currentWordPosVal,cursorPosVal);
                var beforeWord = $scope.fqlInput.substring(0, $scope.currentWordPosVal);
                console.log('before: ', beforeWord.split(/(\s+)/).filter( e => e.trim().length > 0)  );
                //var afterWord = $scope.fqlInput.substring(cursorPosVal);

                console.log('curr: ', currWord, currWord.length);
                //console.log('after:', afterWord);
            }

        }]
    });