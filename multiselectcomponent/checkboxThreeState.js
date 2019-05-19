angular.module('myApp')
//communicate with outside. Main controller functions provider
// group and option just provide display and trigger.
.component('checkboxThreeState', {
    templateUrl: 'checkboxThreeState.html',
    bindings: {
        checkboxState:'<',
        changeStateTo: '&'
    },
    controller: checkboxThreeStateController
})

function checkboxThreeStateController(){
    var ctrl = this;
    ctrl.checkboxClickHandle = function(){
        console.log('changeState');
        if(ctrl.checkBoxState === 'checkedd'){
            ctrl.changeStateTo({newState: 'unChecked'});
        }else{
            ctrl.changeStateTo({newState: 'checked'});
        }
    }
}