import React from 'react';
import _ from 'lodash'


const item_checked= 'checked';
const item_unchecked = 'unChecked';
const item_intermidate = 'indeterminate';

class CheckboxItem extends React.Component {

  render() {
    var imgSrc = require("./empty.svg");
    if(this.props.checkboxState === item_checked){
      imgSrc = require("./check1.svg");
    }
    if(this.props.checkboxState === item_intermidate){
      imgSrc = require("./square1.svg");
    }
    //console.log(imgSrc);

    return (
      <div className="CheckboxItem">
        <div className="CheckboxItem_box" onClick={ () => this.props.onClick() }  > 
          <img className="CheckboxItem_icon" src={imgSrc} alt=""/>
        </div>
        <span className="CheckboxItem_value">{this.props.value}</span>
      </div>
    );
  }
}

class MultiSelect extends React.Component{

  // should get the list of groups, and default select items;

  constructor(props) {
    super(props);
    this.state = {
      group_and_option: this.props.group_and_option,
    };

    this.selectItemValueList = [];
    this.selectItem=[];
    this.mapOptionValueName ={};
  }

  /************** set select *****************************/

    setSelect(){
      const next_group_and_option = _.cloneDeep(this.state.group_and_option);

      //this.selectItemValueList = [];
      _.each(next_group_and_option,function(group){
            _.each(group, function(option){
                if(this.props.selectItem.indexOf(option.optionValue)<0){
                    this.selectOption(option);
                }else{
                    this.clearOption(option);
                }
            });
        });     



    }

  /************** return result *************************/
    triggerCallback(){
      //console.log(this.selectItemValueList);
      this.props.callback(this.selectItemValueList, this.all_select === item_checked);
    }

    // selectItemCallback(){
    //     if(this.noneIsAll && this.all_select === checkbox_unchecked){
    //         selectAll();
    //     }
        
    //     this.selectItemCallback({
    //         "callbackItems" : angular.copy(ctrl.selectItemValueList),
    //         "isSelectAll" : ctrl.selectAll === checkbox_checked
    //     });
    // }


  /***************** select result **************/
    addOption(optionValue){
        let i = this.selectItemValueList.indexOf(optionValue);
        if(i >= 0){
            return;
        }
        this.selectItemValueList.push(optionValue);
    }
    removeOption(optionValue){
        let i = this.selectItemValueList.indexOf(optionValue);
        if(i<0){
            return;
        }
        this.selectItemValueList.splice(i,1);  
    }
    
  /********************* handle click ************************/
    selectOption(option){
      option.select = item_checked;
      this.addOption(option.optionValue);
      this.mapOptionValueName[option.optionValue]=option.optionName;
    }
    clearOption(option){
      option.select = item_unchecked;
      this.removeOption(option.optionValue);
    }

    selectGroup(group){
        group.select = item_checked;
        //console.log('selectGroup:',group);
        _.each(group.groupOptions,(option) =>{
            this.selectOption(option);
        });
    }
    clearGroup(group){
        group.select = item_unchecked;
        _.each(group.groupOptions,(option)=>{
            this.clearOption(option);
        });    
    }

    selectAll(next_group_and_option){
        this.all_select= item_checked;
        _.each(next_group_and_option, (group)=>{
            this.selectGroup(group);
        });
    }
    clearAll(next_group_and_option){
        this.all_select= item_unchecked;
        this.selectItemValueList = [];
        
        _.each(next_group_and_option, (group)=>{
            this.clearGroup(group);
        });
    }

    updateAll(next_group_and_option){ // for option click or group click
        let selectAll=true;
        let hasSelect=false;

        _.each(next_group_and_option, function(group){

            if(group.select === item_checked){
                hasSelect = true;
            }else if(group.select === item_intermidate){
                hasSelect = true;
                selectAll = false;
            }else{//if(group.select === item_unchecked)
                selectAll = false;
            }
        });

        if(selectAll){
            this.all_select= item_checked;
        }else if(hasSelect){
            this.all_select= item_intermidate;
        }else{
            this.all_select= item_unchecked;
        }
        
    }

    updateGroup( group, next_group_and_option){ // for option click
        //console.log('updateGroup:',group);
        let selectAll=true;
        let hasSelect=false;

        _.each(group.groupOptions,function(option){
            if(option.select === item_checked){
                hasSelect = true;
            }else{
                selectAll = false;
            }
        });

        var newSelect = item_unchecked;
        if(selectAll){
            newSelect = item_checked;
        }else if(hasSelect){
            newSelect = item_intermidate;
        }

        if(newSelect !== group.select){
            group.select = newSelect;
            this.updateAll(next_group_and_option);
        }
        
    }
    
    /*************  click recive    ***************/
    optionToggle(option_index, group_index){
      const next_group_and_option = _.cloneDeep(this.state.group_and_option);

      const group = next_group_and_option[group_index];
      const option = group.groupOptions[option_index];

      //console.log('group: ', group.groupName,' option：',option.optionName);

      if( option.select === item_checked){
          this.clearOption(option); // next_state unchecked
      }else{
          this.selectOption(option);
      }
    
      this.updateGroup(group, next_group_and_option); // call updateAll() in the updateGroup
      this.setState({
        group_and_option : next_group_and_option,
      });
        
      this.triggerCallback();
    }

    groupToggle(group_index){
      //console.log('group: ', group.groupName,'click');
      const next_group_and_option = _.cloneDeep(this.state.group_and_option);
      const group = next_group_and_option[group_index];

      if(group.select === item_checked){
          this.clearGroup(group);
      }else{ 
          this.selectGroup(group);
      }
      this.updateAll(next_group_and_option);

      this.setState({
        group_and_option : next_group_and_option,
      });
      this.triggerCallback();
    }

    allToggle(){
      //console.log('click all select');
      const next_group_and_option = _.cloneDeep(this.state.group_and_option);

      if(this.all_select === item_checked){
          this.clearAll(next_group_and_option);
      }else {
          this.selectAll(next_group_and_option);
      }

      this.setState({
        group_and_option : next_group_and_option,
      });

      this.triggerCallback();
    }

  render(){
    console.log('render: MultiSelectGroup_dropdown');

    const groupsRander = this.state.group_and_option.map((group,group_index)=>{ // loop each group
      
      const optionsRander = group.groupOptions.map((option,option_index)=>{ // loop each option
        return ( // this is an option
          <CheckboxItem 
            key={option.optionName}
            value={option.optionName}
            checkboxState={option.select}
            onClick={()=> this.optionToggle(option_index,group_index)}
          /> 
        );
      });

      return ( // this is a group
        <div className="MultiSelectGroup_selectGroup" key={group.groupName}>
          <div className="MultiSelectGroup_groupItem">  
            <CheckboxItem 
              value={group.groupName} 
              checkboxState={group.select}
              onClick={()=>this.groupToggle(group_index)}
            />  
          </div>
          <div className="MultiSelectGroup_groupOptions">{optionsRander}</div>
        </div>
      ); // end of option loop

    });  // end of group loop

    return(
      <div className="MultiSelectGroup_dropdown">
        <div className="MultiSelectGroup_filterInput">
          filter input 
        </div>
        <div className="MultiSelectGroup_selectAllItem"> 
          <CheckboxItem value="select All" checkboxState={this.all_select} onClick={() => this.allToggle()}/> 
        </div>

        <div className="MultiSelectGroup_groups">
          {groupsRander}
        </div>
      </div>
    );
  }
}


export default MultiSelect;

