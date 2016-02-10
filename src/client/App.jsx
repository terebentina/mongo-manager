import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { fetchDatabasesIfNeeded, hideMessage } from './actions';
import Dashboard from './components/app/Dashboard.jsx';
import DBDashboard from './components/app/DBDashboard.jsx';
import Collection from './components/app/Collection.jsx';
import SideNav from './components/app/SideNav.jsx';
import PageMessage from './components/app/PageMessage.jsx';
import Confirm from './components/app/Confirm.jsx';
import ModalManager from './components/app/ModalManager.jsx';
import { PopoverWrapper } from '@terebentina/react-popover';

import './app.scss';

// named export here so we can test App output without redux
export class App extends React.Component {
	static propTypes = {
		modalToShow: React.PropTypes.object,
		message: React.PropTypes.object,
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.dispatch(fetchDatabasesIfNeeded());
	}

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		let content;
		if (!this.props.selectedDb) {
			content = <Dashboard />;
		} else if (!this.props.selectedCollection) {
			content = <DBDashboard db={this.props.selectedDb} />;
		} else {
			content = <Collection />;
		}

		return (
			<PopoverWrapper className="app">
				<PageMessage message={this.props.message} onHide={() => this.props.dispatch(hideMessage())} />
				<Confirm />
				<header>
					<span className="title">Mongo Syllabus</span>
				</header>
				<main>
					<SideNav />
					{content}
				</main>
				<footer>footer</footer>
				{this.props.modalToShow ? <ModalManager modal={this.props.modalToShow.modal} payload={this.props.modalToShow.payload} /> : null}
			</PopoverWrapper>
		);
	}
}

function mapStateToProps(state) {
	return {
		modalToShow: state.modalToShow || null,
		message: state.message || null,
		selectedDb: state.selectedDb || '',
		selectedCollection: state.selectedCollection || '',
	};
}

export default connect(mapStateToProps)(App);
