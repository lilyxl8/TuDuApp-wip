import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import SessionUtil from './utils/session_util';
import SessionStore from './stores/session_store';

import NavBar from './components/navbar';
import SignupForm from './components/signup_form';
import SigninForm from './components/signin_form';

import Landing from './components/landing';
import ListIndex from './components/list_index';

const TuDuApp = React.createClass({
	getInitialState () {
		return {
			currentUser: SessionStore.currentUser()
		};
	},

	componentDidMount () {
		SessionUtil.fetchCurrentUser();
		this.sessionStoreToken = SessionStore.addListener(this._updateSession);
	},

	_updateSession () {
		this.setState({ currentUser: SessionStore.currentUser() });
	},

  render () {
    return (
      <div>
				<NavBar />
				{ this.props.children }
      </div>
    );
  }
});

document.addEventListener('DOMContentLoaded', () => {
  render(
		<Router history={browserHistory}>
			<Route path= '/' component={TuDuApp}>
				<IndexRoute component={Landing} />
				<Route path= '/app' component={ListIndex} />
				<Route path= '/signup' component={SignupForm} />
				<Route path='/signin' component={SigninForm}/>
			</Route>
		</Router>,
		document.getElementById('main')
	);
});
