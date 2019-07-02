import React from 'react';
import _ from 'lodash'

const STATE={ 
  SELECT : 'select',
  UN_SELECT :'unselect',
  INDETERMINATE :'indeterminate',
}


class MultiSelectComponent extends React.Component{
  constructor(props){
    super(props);
    //this.state = {filterInput: ''};
    //this.handleInputChange = this.handleInputChange.bind(this);
  }

  /********************** filter *****************************/

  // handleInputChange(event){
  //   this.setState({filterInput:event.target.value});
  // }


  /********************** select logic ***********************/


  check_groupState(selected_group, groupKey){
    if(this.props.select.selectAll){
      return STATE.SELECT;
    }

    if(!selected_group[groupKey]){
      return STATE.UN_SELECT;
    }
    if(this.selected_group[groupKey].length === 1 && (!this.selected_group[groupKey][0].itemKey || 0 === this.selected_group[groupKey][0].itemKey.length)){
      return STATE.SELECT;
    }

    if(!this.props.autoSelect){
      return STATE.INDETERMINATE;
    }
    return STATE.UN_SELECT;
  }

  check_selectAllState(){
    if(this.props.select.selectAll){
      return STATE.SELECT;
    }
    if(!this.props.autoSelect){
      return STATE.UN_SELECT;
    }

    if(this.props.select.options.length === 0){
      return STATE.UN_SELECT;
    }
    return STATE.INDETERMINATE;
  }

  optionToggle(itemKey, groupKey,optionState){
    //console.log( 'optionToggle, group:',groupKey,', itemKey: ',itemKey,', optionState: ',optionState);
    var select_option = this.props.select.options.slice();

    if(optionState === STATE.SELECT){ // ->unselect item
      const index = _.findIndex(this.props.select.options,{groupKey:groupKey, itemKey:itemKey});
      //console.log('option index is ',index);

      if(index<0){// group selected -> other items select
        //make sure selectAll in right formate
        if(this.props.select.selectAll){
          select_option = Object.keys(this.group_option).map(each_group=>({groupKey:each_group}) );
        }

        _.remove(select_option,{groupKey: groupKey});

        const newItems = this.group_option[groupKey].filter(optionVal=>(
          optionVal !== itemKey
        )).map(optionKey=>(
          {
            groupKey:groupKey,
            itemKey:optionKey
          }
        ));
        //console.log(newItems);
        this.props.updateSelect({selectAll: false, options:select_option.concat(newItems)});
        return;

      }else{// single item select -> remove item
        _.remove(select_option,{groupKey:groupKey, itemKey:itemKey});
        
        this.props.updateSelect({selectAll: false, options:select_option});
        return;
      }

    }else { // has group -> check if group should be select

      if(this.props.autoSelect){

        var group_selectValues = !this.selected_group[groupKey]?[]:this.selected_group[groupKey].map(item=> item.itemKey);
        group_selectValues.push(itemKey);
        //console.log({group_selectValues});

        const group_unselect = _.difference(this.group_option[groupKey], group_selectValues);
        //console.log({group_unselect});

        if(group_unselect.length === 0){ // all item select
          _.remove(select_option,{groupKey:groupKey});
          select_option.push({groupKey:groupKey});
          //console.log('auto select group: ',select);

          
          const selectAll = !(Object.keys(this.group_option)).some((each_group)=>{
            return (each_group !== groupKey) && ( !this.selected_group[each_group] || this.selected_group[each_group][0].itemKey );
          });

          console.log('selectAll ',selectAll);
          this.props.updateSelect({
            selectAll: selectAll, 
            options:select_option
          });
           return;
        }
      }

      // not all item select
      
      select_option.push({groupKey:groupKey, itemKey:itemKey});
      //console.log(select_option);

      this.props.updateSelect({selectAll: false, options:select_option});
      return;
      
    }
  }

  groupToggle(groupKey, currState){
    //console.log('groupToggle: ',groupKey);
    if(currState === STATE.SELECT){// ->un_select group
      if(this.props.select.selectAll){
        const select_options = Object.keys(this.group_option).map(each_group=>({groupKey:each_group}) );
        _.remove(select_options,{groupKey:groupKey});
        this.props.updateSelect({
          selectAll:false,
          options: select_options,
        });
        return;
      }else{
        const select_options = this.props.select.options.slice();
        _.remove(select_options,{groupKey:groupKey});
        this.props.updateSelect({
          selectAll:false,
          options: select_options,
        });
        return;
      }

    }else{
      const select_options = this.props.select.options.slice();
      _.remove(select_options,{groupKey:groupKey});
      select_options.push( {groupKey:groupKey} );
      var selectAll =false;

      if(this.props.autoSelect){

        selectAll = !(Object.keys(this.group_option)).some((each_group)=>{
            return (each_group !== groupKey) && ( this.check_groupState(each_group) === STATE.SELECT );
        });
      }
      this.props.updateSelect({
          selectAll:selectAll,
          options: select_options,
      });
      return;
    }
  }

  selectAllToggle(currState){
    //console.log('selectAllToggle');
    if(currState === STATE.SELECT){
      this.props.updateSelect({
        selectAll:false,
        options: [],
      });
    }else{
      const select_options = Object.keys(this.group_option).map(each_group=>({groupKey:each_group}) );
      this.props.updateSelect({
        selectAll:true,
        options: select_options,
      });
    }

  }


  render(){
    //console.log('render: MultiSelectComponent');
    //console.log(this.props.select.options);
    var inputValue = this.props.filterInput; 

    //console.log('inputValue is',inputValue);

    if(!this.props.select.selectAll){ //build selected object
      this.selected_group = _.groupBy(this.props.select.options, (item_objct)=>{
        return item_objct.groupKey;
      });
      //console.log('slected_group',this.selected_group);
    }

    const group_option = {}; //build group_option tree
    //loop each group
    const groups = React.Children.map(this.props.children, (child, index )=> {
      const groupKey = child.props.value;

      // check group state
      var groupState = this.check_groupState(this.selected_group,groupKey);
    


      var optList=[];
      //loop options in the group
      const options = React.Children.map(child.props.children, (grandChild,grandChild_index)=>{
        const itemKey = grandChild.props.value;
        optList.push(grandChild.props.value);

        //option state

        var optionState = STATE.UN_SELECT;
        switch (groupState){
          case STATE.SELECT:
            optionState = STATE.SELECT;
            break;
          case STATE.UN_SELECT:
            //break;
          case STATE.INDETERMINATE:
            //console.log('find value: ',grandChild.props.value,' ,result is: ',findValue);
            
            if( this.selected_group[groupKey] && _.find(this.selected_group[groupKey],{itemKey: grandChild.props.value})){
              optionState = STATE.SELECT;
            }
            //console.log('optionState: ',optionState);
            break;
          default:
            console.log('groupState is wrong: ',groupState);
        }

        //console.log(grandChild.props.name,' includes ',inputValue,' is: ',grandChild.props.name.includes(inputValue));
        return React.cloneElement(grandChild, {
          option_index: grandChild_index,
          group_index: index,
          state: optionState,
          hidden: !grandChild.props.name.includes(inputValue),
          clickCallback: ()=>this.optionToggle(itemKey,groupKey,optionState),
        });
      });

      group_option[groupKey]= optList;

      // {
      //   groupKey: child.props.value,
      //   options: optList,
      // };

      // decide group state
      if(!this.props.autoSelect){
        if(groupState === STATE.INDETERMINATE){
          groupState = STATE.UN_SELECT;
        }
      }

      //console.log(child.props.name,' includes ',inputValue,' is: ',child.props.name.includes(inputValue));
      
      return React.cloneElement(child, {
        state: groupState,
        hidden: !child.props.name.includes(inputValue),
        clickCallback: ()=>this.groupToggle(groupKey, groupState),
      }, options);
    });



    //creat selectAll label
    const selectAllLabel = React.cloneElement(this.props.selectAllTmp,{
      hidden: inputValue.length > 0,
      state: this.check_selectAllState(),
      clickCallback:()=>this.selectAllToggle(this.check_selectAllState()),
    });

    this.group_option = group_option;
    //console.log('object tree: ',this.group_option);


    return (
      <div className='MultiSelect'> 
        <div className='MultiSelect-SelectAll'>{selectAllLabel}</div>
        <div className='MultiSelect-Groups'>{groups} </div>
      </div>
    );

  }
}

export default MultiSelectComponent;



