import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ShowEvent from './components/ShowEvent';
import AddEvent from './components/AddEvent';
import ViewDetail from './components/ViewDetail'
import OuterHeader from './components/OuterHeader'
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';
ReactDOM.render(
	<Provider store={store}>
		<OuterHeader/>
		<Router>
			<div>
				<Route exact path="/" component={ShowEvent} />
				<Route path="/add-event/:date/:id" component={AddEvent} />
        <Route path="/view-detail/:id" component={ViewDetail}/>
			</div>
		</Router>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
