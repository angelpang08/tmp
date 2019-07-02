import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import MultiSelectComponent from './multiSelec.js';
import MultiSelectGroup from './multiSelectGroup.js';
import CheckboxItem from './checkboxItem.js';
import _ from 'lodash';


//export default class FilterTmp extends React.Component{
	
export default function FilterTmp(props){

	const useStyles = makeStyles(theme => ({
	  	typography: {
	    	padding: theme.spacing(2),
	  	},
	}));

	
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	
	function handleClick(event) {
	    setAnchorEl(anchorEl ? null : event.currentTarget);
	}

	const handleClickAway=()=>{
		//console.log('ClickAwayListener');
        setAnchorEl(null);
	}
	const open = Boolean(anchorEl);

	const [filterInput,setFilterInput] = React.useState('');
	function handleInputChange(event){
    	setFilterInput(event.target.value);
  	}
  	//console.log(filterInput);

	/*************************** handle select part ******************/

	// constructor(props){
	// 	super(props);
	// 	this.state={
	// 	  selected: { selectAll:true, options: [], }
	// 	}
	// 	this.groupItem =  React.createElement(CheckboxItem,null,'something');
	// }
	const [selected, setSelected] = React.useState({ 
		selectAll:true, 
		options: [], 
	});

	function updateSelect(nextSelect){
		console.log('\n\n\n\n\n\n\n\n');
		console.log('nextSelect is: ',nextSelect);

		setSelected(nextSelect);
		//this.setState({selected: nextSelect});
	};

	/****************** update place holder  ********************/


	function updatePlaceholder(){
		if(selected.selectAll){
			return 'All '+ props.groupUnits;
		}
		let [num_group, num_option] = [0,0];

		let group_last = {};
		let option_last = {};

		selected.options.forEach((item_objct)=>{
			if(item_objct.itemKey){
				num_option++;
				option_last = item_objct;
			}else{
				num_group++;
				group_last = item_objct;
			}
		});

		let placeHolder='';

		if(num_group === 1){
			const last_Group = _.find(groupOption,{groupKey:group_last.groupKey});
			placeHolder = last_Group.groupName;
		}
		if(num_group > 1){
			placeHolder = num_group + ' ' + props.groupUnit;
		}

		if(num_option === 0){
			return placeHolder.length === 0 ? 'no item select': placeHolder;
		}

		if(num_option === 1){
			let last_Option_Group = _.find(groupOption,{groupKey:option_last.groupKey});
			let last_Option = _.find(last_Option_Group.options,{key:option_last.itemKey});
			placeHolder = placeHolder + ' & '+ last_Option.name;
		}
		if(num_option > 1){
			placeHolder = placeHolder + ' & '+ num_option + ' ' + props.optionUnit;
		}

		return placeHolder;

	}

	//console.log(updatePlaceholder());










	const groupOption = props.groupOption || [
	{
		groupKey:'groupkey1', 
		groupName:'group1',
		options:[
		{
			'name':'option1',
			key:'opt1',
		},{
			'name':'option2',
			key:'opt2',	
		}]
	},{
		groupKey:'groupkey2', 
		groupName:'group2',
		options:[
		{
			'name':'option3',
			key:'opt3'
		},{
			'name':'option2',
			key:'opt2'
		}]
	}];

	

  
	//render(){
	const selectAllTmp = <CheckboxItem name='selectAll' value='selectAll'/>
	const groupItemTmp =  React.createElement(CheckboxItem,null,'something');


	const MultiSelectGroup_option = groupOption.map(group=>{

		const MultiSelectOption = group.options.map(option=>{
			return (
				<CheckboxItem value={option.key} name={option.name} key={option.key} />
			);
		});

		return (
			<MultiSelectGroup value={group.groupKey} name={group.groupName} key={group.groupKey} labelTmp={groupItemTmp}>
				{MultiSelectOption}
			</MultiSelectGroup>
		);

	});

	
	return (
		 
		 <>
			<Button variant="contained" onClick={handleClick}>
		        place holder
		    </Button>
		    <ClickAwayListener onClickAway={handleClickAway}>
			    <Popper open={open} anchorEl={anchorEl} transition>
			        {({ TransitionProps }) => (
			          	<Fade {...TransitionProps} timeout={350}>
				            <Paper>
        						<div className='MultiSelect-Filter'> 
        							<input type="text" value={filterInput} onChange={handleInputChange} /> 
        						</div>
				            	<div className= 'dropDownContent'>
									<MultiSelectComponent 
									select={selected} 
									updateSelect={(nextSelect) => updateSelect(nextSelect)}
									autoSelect = {false}
									selectAllTmp = {selectAllTmp}
									filterInput = {filterInput}
									>
										{MultiSelectGroup_option}
									</MultiSelectComponent>
								</div>
				            </Paper>
			          </Fade>
			        )}
			    </Popper>
		    </ClickAwayListener>
		</>
		
	);
	//}
}