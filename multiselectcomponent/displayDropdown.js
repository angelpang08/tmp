import React from 'react';
import PropTypes from 'prop-types';

import MultiSelectGroupDropdown from './multiSelectComponent';



class DisplayDropdown extends React.Component{
  // control display or not display dropdown
  // change placeholder 
  // decide when to give callback to filter

  constructor(props){
    super(props);

    this.state={
      showDropdown:false,
      setSelectItem: this.props.selectItem ||[],
    };
//TODO: change to api
    this.group_option=[
      {// group level obj
          groupName : "group1",
          //select: checked;
          groupOptions:[
              {
                  optionName:'opt1',
                  optionValue:'chose 1',
                 // select: true
              },
              {
                  optionName: 'option 2',
                  optionValue : 'chose 2'
              }   
          ]
      },
      {
          groupName : "group2",
          groupOptions:[
              {
                  optionName:'option 3',
                  optionValue:'chose 3',
              },
              {
                  optionName: 'option 4',
                  optionValue : 'chose 4'
              }   
          ]
      }
    ];
    //this.dropdownClick = this.dropdownClick.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }


/********************************* select result ************************************************/
  updateParam(){
    this.props.callback(this.selectItemValueList);
  }
  
  dropdownCallbackHandle(selectItem, all_select){
    //console.log(selectItem);
    //console.log(all_select);
    if(all_select){
      this.setState({
        setSelectItem: [],
      });
    }else{
      this.setState({
        setSelectItem: [...selectItem],
      });
      //console.log(this.selectItemValueList);
    }

  }


/********************* update placeholder ************************************************/

  getPlaceholderInfor(){
    if(this.state.setSelectItem.length ===0){
      return 'All '+ this.props.itemUnit;
    }
    if(this.state.setSelectItem.length>1){
      return this.state.setSelectItem.length + ' '+ this.props.itemUnit;
    }
    if(this.state.setSelectItem.length === 1){
      return this.state.setSelectItem[0];
    }
    return 'chose your ' + this.props.itemUnit + ' ...';
  }

/***************************** click collapse handle ********************************************/

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  closeDropdown(event){
    //console.log('click event get in closeDropdown');
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      console.log('clicked outside of dropdown!');
      this.setState({showDropdown: false,});
    }
  }

  toggleDropdown(){
    this.setState({
      showDropdown: !this.state.showDropdown,
      selectItem: this.state.selectItem,
    });
  }

  componentDidUpdate(){
     //add and remove event listener every time
    if(this.state.showDropdown){
      //console.log('document click addEventListener');
      document.addEventListener('click', this.closeDropdown);
    }else{
      //console.log('document click removeEventListener');
      document.removeEventListener('click', this.closeDropdown);
    }
  }
  componentWillUnmount() {
    //console.log('document click removeEventListener');
    document.removeEventListener('click', this.closeDropdown);
  }


  render(){
    console.log('render: MultiSelectGroup');
    //const dropdownContainerClassName = "dropdownContainer "+(this.state.showDropdown? null:"hidden");
    const placeholderInfo = this.getPlaceholderInfor();
    return (
      <div className = "MultiSelectGroup">
        <div className = "MultiSelectGroup_display" onClick={()=> this.toggleDropdown()}>
          <span>{placeholderInfo}</span>
        </div>
        <div className = {"dropdownContainer "+(this.state.showDropdown? null:"hidden")} ref={this.setWrapperRef}  >
          <MultiSelectGroupDropdown  
            group_and_option={this.group_option} 
            callback={(selectItem, all_select)=>this.dropdownCallbackHandle(selectItem, all_select)}
          />
        </div>
        
      </div>
    );
  }

}

DisplayDropdown.defaultProps = {
  itemUnit: 'items',
};

DisplayDropdown.propTypes = {
  selectItem : PropTypes.arrayOf(PropTypes.string),
}

export default DisplayDropdown;

