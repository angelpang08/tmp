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
    /*
    ctrl.$onChanges = function (changes) {
        console.log('parent change to: ', changes);
        console.log('parent change to: ', changes);
        console.log('I have: ',ctrl.checkboxState);
    }*/ 
    
    ctrl.checkbox_checked= 'checked';
    ctrl.checkbox_unchecked = 'unChecked';
    ctrl.checkbox_intermidate = 'indeterminate';
    
    ctrl.checkboxClickHandle = function(){
        console.log('click, current state:',ctrl.checkboxState);
        if(ctrl.checkboxState === ctrl.checkbox_unchecked|| !ctrl.checkboxState){
            ctrl.changeStateTo({newState: ctrl.checkbox_checked});
        }else{
            ctrl.changeStateTo({newState: ctrl.checkbox_unchecked});
        }
    }
}