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
    /***
    * assume 
    ***/
    var chechbox_checked= 'checked';
    var chechbox_unchecked = 'unChecked';
    var chechbox_intermidate = 'indeterminate';




    var ctrl = this;

    
    function setvValue(choseItemList){
        
    }
    
    function prepareData(){
        
        
    }
    
    ctrl.allToggle = function(newState){
        //console.log('click all select');
        if(newState === checkbox_checked){
            clearAll();
        }else if(newState === checkbox_unchecked){
            selectAll();
        }else{
            console.log('error: allToggle to wrong state');
        }
    };
    
    ctrl.groupToggle = function(group, newState){
        //console.log('group: ',group.groupName);
        //console.log(group.select);
        if(newState === checkbox_checked){
            selectGroup(group);
        }else if(newState === checkbox_unchecked){ 
            clearGroup(group);
        }else{
            console.log('error: groupToggle to wrong state');
        }
        updateAll();
    };
    
    ctrl.optionToggle = function(option, newState, groupName){
        console.log('group: ',groupName,' option：',option.optionName);
        console.log(option.select);
        
        option.select = newState;
        
        var group = findGroup(groupName);
        updateGroup(group); // call updateAll() in the updateGroup
        
    };
    
    function findGroup(groupName){
        var groupObj={};
        _.each(ctrl.groupAndOption,function(group){
            if(group.groupName === groupName){
                groupObj = group;
                return;
            }
        });
        return groupObj;
    }
    
    function updateGroup(group){ // for option click

        var selectAll=true;
        var hasSelect=false;

        _.each(group.groupOptions,function(option){``
            if(option.select === chechbox_checked){
                hasSelect = true;
            } else{
                selectAll = false;
            }
        });

        var newSelect = checkbox_unchecked;
        if(selectAll){
            newSelect = chechbox_checked;
        }else if(hasSelect){
            newSelect = chechbox_intermidate;
        }

        if(newSelect !== group.select){
            group.select = newSelect;
            updateAll();
        }
        
    }
    
    function selectGroup(group){
        group.select = checkbox_checked;
        _.each(group.groupOptions,function(option){
            option.select = checkbox_checked;
        });
    }
    
    function clearGroup(group){
        group.select = checkbox_unchecked;
        _.each(group.groupOptions,function(option){
            option.select = checkbox_unchecked;
        });    
    }
    
    function updateAll(){ // for option click or group click
        
        var selectAll=true;
        var hasSelect=false;

        _.each($ctrl.groupAndOption, function(group){

            if(group.select === checkbox_checked){
                hasSelect = true;
            }else if(group.select === chechbox_intermidate){
                selectAll = false;
            }else if(group.select === chechbox_unchecked){
                selectAll = false;
            }
        });

        if(selectAll){
            ctrl.selectAll = chechbox_checked;
        }else if(hasSelect){
            ctrl.selectAll = chechbox_intermidate;
        }else{
            ctrl.selectAll = chechbox_unchecked;
        }
        
    }
    
    function selectAll(){
        ctrl.selectAll = checkbox_checked;
        _.each(ctrl.groupAndOption, function(group){
            selectGroup(group);
        });
        
    }
    
    function clearAll(){
        ctrl.selectAll = checkbox_unchecked;
        _.each(ctrl.groupAndOption, function(group){
            clearGroup(group);
        });
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