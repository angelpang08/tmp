angular.module('myApp')
//communicate with outside. Main controller functions provider
// group and option just provide display and trigger.
.component('multiSelectWithCheckbox', {
    templateUrl: 'multiSelectCheckbox.html',
    bindings: {
        groupAndOption:'<',
        setItem:'<',
        readyToSet:'<',
        selectItemCallback: '&'
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

function selectController($window,$scope){
    var ctrl = this;
    
    
    /*************** dropdown control ********************/
    
    function addCloseDropdownEventListener() {
        console.log('add listener');
        $window.addEventListener('click',closeDropdown);
    } 
    function removeCloseDropdownEventListener() {
        console.log('remove listener');
        $window.removeEventListener('click', closeDropdown);
    }
    function closeDropdown(){
        console.log('closeDropdown');
        $scope.showDropdown = false;
        $scope.$apply();
        removeCloseDropdownEventListener();
    }
    
    $scope.toggleDropdown = function($event){
        //console.log('toggleDropdown, now is ',$scope.showDropdown);
        $scope.showDropdown = !$scope.showDropdown;
        if($scope.showDropdown){
            addCloseDropdownEventListener();
        }else{
            removeCloseDropdownEventListener();
        }
        $event.stopPropagation();
    }
    
    $scope.dropdownClick = function($event){
        //console.log('showDropdown now is ',$scope.showDropdown);
        //console.log('dropdown',$event.target);
        $event.stopPropagation();
        
    }
    
    $scope.$on('$destroy', function() {
        console.log("destroy");
        if($scope.showDropdown){
            removeCloseDropdownEventListener();
        }
      });
    
    
    
    /**************************** select checkbox handle *********************/
    
    /***
    * assume 
    ***/

    var checkbox_checked= 'checked';
    var checkbox_unchecked = 'unChecked';
    var checkbox_intermidate = 'indeterminate';
    
    ctrl.selectItemValueList = [];

    ctrl.allToggle = function(newState){
        console.log('click all select, newState: ',newState);
        
        if(newState === checkbox_checked){
            selectAll();
        }else if(newState === checkbox_unchecked){
            clearAll();
        }else{
            console.log('error: allToggle to wrong state');
        }
        ctrl.selectAll = newState;
        
        selectItemCallback();
    };
    
    ctrl.groupToggle = function(group, newState){
        console.log('group new state:',newState);
        if(newState === checkbox_checked){
            selectGroup(group);
        }else if(newState === checkbox_unchecked){ 
            clearGroup(group);
        }else{
            console.log('error: groupToggle to wrong state: ',newState);
        }
        updateAll();
        
        selectItemCallback();
    };
    
    ctrl.optionToggle = function(option, newState, groupName){
        //console.log('group: ',groupName,' option：',option.optionName);
        //console.log("option old select",option.select);
        console.log('option newState',newState);
        
        option.select = newState;
        if(option.select === checkbox_checked){
            addOption(option.optionValue);
        }else{
            removeOption(option.optionValue);
        }
        
        var group = findGroup(groupName);
        updateGroup(group); // call updateAll() in the updateGroup
        
        selectItemCallback();
        
    };
    
    function selectOption(option){
        option.select = checkbox_checked;
        addOption(option.optionValue);
    }
    function clearOption(option){
        option.select = checkbox_unchecked;
        removeOption(option.optionValue);
    }
    
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
            if(option.select === checkbox_checked){
                hasSelect = true;
            } else{
                selectAll = false;
            }
        });

        var newSelect = checkbox_unchecked;
        if(selectAll){
            newSelect = checkbox_checked;
        }else if(hasSelect){
            newSelect = checkbox_intermidate;
        }

        if(newSelect !== group.select){
            group.select = newSelect;
            updateAll();
        }
        
    }
    
    function selectGroup(group){
        group.select = checkbox_checked;
        _.each(group.groupOptions,function(option){
            selectOption(option);
        });
    }
    
    function clearGroup(group){
        group.select = checkbox_unchecked;
        _.each(group.groupOptions,function(option){
            clearOption(option);
        });    
    }
    
    function updateAll(){ // for option click or group click
        
        var selectAll=true;
        var hasSelect=false;

        _.each(ctrl.groupAndOption, function(group){

            if(group.select === checkbox_checked){
                hasSelect = true;
            }else if(group.select === checkbox_intermidate){
                hasSelect = true;
                selectAll = false;
            }else //if(group.select === checkbox_unchecked)
            {
                selectAll = false;
            }
        });

        if(selectAll){
            ctrl.selectAll = checkbox_checked;
        }else if(hasSelect){
            ctrl.selectAll = checkbox_intermidate;
        }else{
            ctrl.selectAll = checkbox_unchecked;
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
        ctrl.selectItemValueList = [];
        
        _.each(ctrl.groupAndOption, function(group){
            clearGroup(group);
        });
    }
    
    /***************** select result **************/
    function addOption(optionValue){
        var i = ctrl.selectItemValueList.indexOf(optionValue);
        if(i>= 0){
            return;
        }
        ctrl.selectItemValueList.push(optionValue);
    }
    function removeOption(optionValue){
        var i = ctrl.selectItemValueList.indexOf(optionValue);
        if(i<0){
            return;
        }
        ctrl.selectItemValueList.splice(i,1);  
    }
    function selectItemCallback(){
        ctrl.selectItemCallback({"callbackItems" : angular.copy(ctrl.selectItemValueList)});
    }
    
        
    /******************* init ********************/
            
    function setvValue(choseItemList){
        
    }
    
    function prepareData( selsectAll ){
        _.each(ctrl.groupAndOption,function(group){
            
            
        });
            
    }
    
   
}


function selectGroupController() {
    this.groupClickHandle = function(newState){
        console.log('call groupToggle, newState',newState);
        this.multiSelectCtrl.groupToggle(this.groupObj, newState);
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