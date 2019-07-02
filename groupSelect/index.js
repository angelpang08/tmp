import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import LeftMenu from './leftBar/leftBar.js';
import FilterTmp from'./multiSelect/filterTmp.js';
//import MiniDrawer from './drawer/MiniDrawer.js'


class AppMain extends React.Component{

  
	render(){
		
		return (
			<div> 
				<div className='topBar'><div className='leftMenu'>FortiOne</div></div>
				<LeftMenu/>
				<div className= 'content'>
					<div>
						<FilterTmp/>
						<FilterTmp/>
					</div>
					<div>
						<p>here should be many many many things</p>
						<p>here should be many many many things</p>
						<p>here should be many many many things</p>
						<p>here should be many many many things</p>
						<p>here should be many many many things</p>
						<p>here should be many many many things</p>
					</div>

				</div>
			</div>
		);
	}
}



// ========================================

ReactDOM.render(
	<AppMain/>,
	document.getElementById('root')
);

