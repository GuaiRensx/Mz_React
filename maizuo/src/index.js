import React from 'react';
import {render} from 'react-dom';
import {HashRouter,Route} from 'react-router-dom'
import '../src/styles/base.css'

//import {HashRouter,Route} from 'react-router-dom';

import App from './App';

render(
	<HashRouter>
		<App/>
	  {/* <Route component={App}/> */}
	</HashRouter>
	,
 document.getElementById('root')
)