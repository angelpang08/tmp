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
        groupObj:'<',
        //groupName: '<',
        //groupSelect:'<'
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
        optionObj:'<',
        //optionName: '<',
        groupName: '<',
        //optionSelect:'<'
        
    },
    controller: selectOptionController,
    templateUrl: 'multiSelectOption.html'
})

;

function selectController(){
    
    var chechbox_checked= 'checked';
    var chechbox_unchecked = 'unChecked';
    var chechbox_intermidate = 'indeterminate';
    var ctrl = this;

    
    function setvValue(choseItemList){
        
    }
    
    function prepareData(){
        
        
    }
    
    ctrl.allToggle = function(){
        console.log('click all select');
        
    };
    
    ctrl.groupToggle = function(group, newState){
        console.log('group: ',group.groupName);
        console.log(group.select);
    };
    
    ctrl.optionToggle = function(option, newState, groupName){
        console.log('group: ',groupName,' option：',option.optionName);
        console.log(option.select);
        
        option.select = newState;
        
        var group = findGroup(groupName);
        updateGroup(group);
        
    };
    
    function findGroup(groupName){
        
        _.each(ctrl.groupAndOption,function(group){
            console.log(group.groupName);
        });
    }
    
    function updateGroup(group){
        
    }
    
    function selectGroup(group){
        
    }
    
    function clearGroup(group){
        
    }
    
    function updateAll(){
        
    }
    
    function selectAll(){
        
    }
    
    function clearAll(){
        
        
    }
    
   
}


function selectGroupController() {
    this.groupClickHandle = function(newState){
        console.log('call groupToggle');
        this.multiSelectCtrl.groupToggle(this.groupObj,newState);
    };
    
}

function selectOptionController(){
    this.optionClickHandle = function(newState){
        console.log('call optionToggle');
        this.multiSelectCtrl.optionToggle(this.optionObj, newState, this.groupName);
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