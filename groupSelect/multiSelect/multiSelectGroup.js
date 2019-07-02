import React from 'react';

class MultiSelectGroup extends React.Component{

  // should get the list of groups, and default select items;
  
  render(){
    const label=React.cloneElement(this.props.labelTmp, {...this.props});

    return(
      
      <div className="MultiSelectGroup">
        <div className={'MultiSelectGroup-Name'}>
         {label}
        </div>
        <div className='MultiSelectOptions'>
          {this.props.children}
        </div>
      </div>
      
    );
  }

  componentDidMount(){
    console.log('componentDidMount: MultiSelectGroup')
  }
}


export default MultiSelectGroup;

