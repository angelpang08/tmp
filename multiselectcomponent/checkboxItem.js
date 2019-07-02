import React from 'react';
import Typography from '@material-ui/core/Typography';


const STATE={ 
  SELECT : 'select',
  UN_SELECT :'unselect',
  INDETERMINATE :'indeterminate',
}

const item_checked= STATE.SELECT;
const item_unchecked = STATE.UN_SELECT;
const item_intermidate = STATE.INDETERMINATE;

class CheckboxItem extends React.Component {
  constructor(props){
    super(props);
    

    this.checkboxIcon_intermidate = require("./square1.svg");
    this.checkboxIcon_check = require("./check1.svg");
    this.checkboxIcon_uncheck = require("./empty.svg");


    //console.log('constructor: CheckboxItem');
    //console.log(this.props.value);

  }

  boxClick(){
    this.props.clickCallback([this.props.value], this.props.index);
  }

  render() {
    //console.log('rander: checkbox');
    var imgSrc = this.checkboxIcon_uncheck;
    if(this.props.state === item_checked){
      imgSrc = this.checkboxIcon_check;
    }
    if(this.props.state === item_intermidate){
      imgSrc = this.checkboxIcon_intermidate;
    }
    //console.log(imgSrc);

    return (
      <div className={"CheckboxItem"+ (this.props.hidden?' hidden':"") } >
        <div className="CheckboxItem_box" onClick={ ()=>this.boxClick()} > 
          <img className="CheckboxItem_icon" src={imgSrc} alt=""/>
        </div>
        <span className="CheckboxItem_name">{this.props.name}</span>
      </div>
    );
  }


  componentDidMount(){
    //console.log('componentDidMount: item')
  }
}

export default CheckboxItem;

