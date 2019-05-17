angular.module('myApp')
//communicate with outside. Main controller functions provider
// group and option just provide display and trigger.
.component('multiSelectWithCheckbox', {
    templateUrl: 'multiSelectCheckbox.html',
    bindings: {
        groupAndOption:'<',
        setItem:'<',
        checkItemsCallback: '&'
    },
    controller: selectController
})


.component('selectGroup', {
    transclude: true,
    require: {
        multiSelectCtrl: '^multiSelectWithCheckbox'
    },
    bindings: {
        groupName: '@',
        groupSelect:'<'
    },
    controller: selectGroupController,
    templateUrl: 'multiSelectGroup.html'
})


.component('selectOption', {
    transclude: true,
    require: {
        multiSelectCtrl: '^multiSelectWithCheckbox',
    },
    bindings: {
        optionName: '@',
        groupName: '@',
        optionSelect:'<'
        
    },
    controller: selectOptionController,
    templateUrl: 'multiSelectOption.html'
})

;

function selectController(){
    var ctrl = this;
    
    function prepareData(){
        
        
    }
    
    function setvValue(choseItemList){
        
    }
    
    ctrl.allToggle = function(){
        
    };
    
    ctrl.groupToggle = function(groupName){
        
    };
    
    ctrl.optionToggle = function(displayLable, groupName){
        
    };
    
    
   
}


function selectGroupController() {
    this.groupClickHandle = function(groupName){
        this.multiSelectCtrl.selectToggle(groupName);
    };
    
}


function selectOptionController(){
    this.optionClickHandle = function( displayLable, groupName){
        this.multiSelectCtrl.optionToggle(displayLable, groupName);
    }
}

/*
<select component>
    .....
    <group>
        <option>
            when check, 
                toggle change singgel state
        </option>
        toggle change select group
    </group>
    toggle change select all
<select>
*/