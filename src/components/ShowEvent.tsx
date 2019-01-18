import * as React from 'react';
import { getEventsOnDate, deleteEvent } from '../actions/event';
import { State } from '../reducers';
import { connect } from 'react-redux';
import Event from '../models/Event';

import { bindActionCreators } from 'redux';
import HeaderBar from './HeaderBar';
import { Link } from 'react-router-dom';

interface PApp {
	events: Event[];
	getEventsOnDate: (date: string) => void;
	deleteEvent: (id: number) => void;
}

class ShowEvent extends React.Component<PApp, {}> {
	constructor(props: any) {
		super(props);
		this.state = {
			currentDate: ''
		};
	}
	componentDidMount() {
		this.setCurrentDate(new Date().toDateString());
	}
	setCurrentDate = (date: string) => {
		this.setState({
			currentDate: date
		});
		this.props.getEventsOnDate(date);
	};
	render() {
		let timeSheet: any = [];
		let timeLine: any = [];
		let dummyList: any = [];
		let lastEnd: number = 0;

		for (let i = 0; i < 24; i++) {
			timeLine.push(<div key={i} style={{ minHeight: '60px', display: 'flex', justifyContent: 'center' }}>{`${i}:00`}</div>);
			if(i == 0)
				dummyList.push(<div key={i} style={{ minHeight: '59px', borderBottom: '1px dotted green', borderTop: '1px dotted green' }} />);
			else
				dummyList.push(<div key={i} style={{ minHeight: '59px', borderBottom: '1px dotted green' }} />);
		}

		this.props.events.map((item, i) => {
			let hourEnd = new Date(item.endTime).getHours();
			let hourStart = new Date(item.startTime).getHours();
			let minStart = new Date(item.startTime).getMinutes();
			let minEnd = new Date(item.endTime).getMinutes();
			let difference = hourEnd * 60 + minEnd - (hourStart * 60 + minStart);
			timeSheet.push(
				<div
					key={i}
					className="time-sheet-inner"
					style={{
						top: hourStart * 60 + minStart,
						height: difference,
						backgroundColor: `#dede${i}${i}`,
						position: 'absolute',
            width: '100%',
            opacity: 0.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
					}}
				>
					{item.title}
					<Link style={{marginLeft: 10}} to={`/add-event/no/${item.id}`}><button>Edit</button></Link>
					<button style={{marginLeft: 10}} type='button' onClick={()=>this.props.deleteEvent(item.id)}>Delete</button>
					<Link style={{marginLeft: 10}} to={`/view-detail/${item.id}`}><button>View</button></Link>
				</div>
			);
			lastEnd = hourEnd * 60 + minEnd;
		});

		return (
			<div>
				<div className="main-container">
					<h1>Time Sheet</h1>
					<div className="header-block">
						<HeaderBar setCurrentDate={this.setCurrentDate} />
					</div>
					<div className="time-sheet-block">
						<div className="time-line-header"> {timeLine}</div>
						<div className="time-line-content">
							{dummyList}
							{timeSheet}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: State) => {
	return { events: state.data.currentEvents };
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators({ getEventsOnDate, deleteEvent }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowEvent);
