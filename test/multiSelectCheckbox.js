angular.module('myApp')
//communicate with outside. Main controller functions provider
// group and option just provide display and trigger.
.component('warperLevel', {
    templateUrl: 'multiSelectCheckbox.html',
    transclude: true,
    bindings: {
        groupAndOption:'<',
        setItem:'<',
        readyToSet:'<',
        noneIsAll: '<',
        selectItemCallback: '&',
        unit: '@'
    },
    controller: selectController
})


.component('groupLevel', {
    transclude: true,
    require: {
        multiSelectCtrl: '^warperLevel'
    },
    bindings: {
        groupObj : '<',
        //groupName: '<',
        //groupSelect:'<'
    },
    controller: selectGroupController,
    templateUrl: 'multiSelectGroup.html'
})


.component('optionLevel', {
    transclude: true,
    require: {
        multiSelectCtrl: '^groupLevel',
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



function selectController(){
    this.$onInit = function () {
        console.log('wapperLevel');
    };
    
    
    this.$onChanges =function(changeObj){
        console.log(changeObj.groupAndOption);
    };
   
}


function selectGroupController() {
    
    
}

function selectOptionController(){
    
}

