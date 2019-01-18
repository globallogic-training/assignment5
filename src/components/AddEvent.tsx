import * as React from 'react';
import Moment from 'react-moment';
import { State } from '../reducers';
import { addEvents, getEventById, editEvent } from '../actions/event';
import { connect } from 'react-redux';
import Event from '../models/Event';
import { bindActionCreators } from 'redux';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import * as moment from 'moment';

interface HState {
	endTime: any;
	startTime: any;
	title: string;
	id: number;
}

interface HProps {
	match: any;
	events: Event[];
	addEvents: (event: Event) => void;
	getEventById: (id: number) => void;
	editEvent: (event: Event) => void;
	history: any;
	editEventObject: Event;
}

class AddEvent extends React.Component<HProps, HState> {
  
  constructor(props: any) {
		super(props);

		this.state = {
			endTime: '',
			startTime: '',
			title: '',
			id: 0
		};
  }
  
	componentDidMount() {
		if (this.props.match.params.id > 0) {
			this.props.getEventById(this.props.match.params.id);
			this.setState({
				startTime: this.props.editEventObject.startTime || '',
				endTime: this.props.editEventObject.endTime || '',
				title: this.props.editEventObject.title || ''
			});
		} else {
			this.setState({
				startTime: new Date(this.props.match.params.date),
				endTime: new Date(this.props.match.params.date)
			});
		}
  }
  
	componentDidUpdate(prevProps: HProps) {
		if (
			this.props.match.params.id > 0 &&
			prevProps.editEventObject.startTime !== this.props.editEventObject.startTime
		) {
			this.setState({
				startTime: this.props.editEventObject.startTime,
				endTime: this.props.editEventObject.endTime,
				id: this.props.editEventObject.id,
				title: this.props.editEventObject.title
			});
		}
  }
  
	setStartTime = (value: any) => {
		console.log(JSON.stringify(value));
		this.setState({
			startTime: value
		});
  };
  
	setEndTime = (value: any) => {
		this.setState({
			endTime: value
		});
  };
  
	setTitle = (value: any) => {
		this.setState({
			title: value.target.value
		});
  };
  
	addEvent = () => {
		const a = moment(this.state.endTime);
		const b = moment(this.state.startTime);
		if (this.props.match.params.id > 0) {
			this.props.editEvent({
				id: this.state.id,
				startTime: new Date(this.state.startTime).toString(),
				endTime: new Date(this.state.endTime).toString(),
				title: this.state.title
			});
			this.props.history.push('/');
		} else if (a.diff(b, 'minutes') && a.diff(b, 'minutes') > 0 && this.state.title != '') {
			this.props.addEvents({
				id: new Date().getTime(),
				startTime: new Date(this.state.startTime).toString(),
				endTime: new Date(this.state.endTime).toString(),
				title: this.state.title
			});
			this.props.history.push('/');
		} else alert('Invalid Input');
  };
  
	render() {
		let date;
		if (this.props.match.params.id > 0) date = this.props.editEventObject.startTime;
		else date = this.props.match.params.date;

		return (
			<div>
				<div className="main-container">
					<h1>
						<Moment format="MMM DD YYYY">{date}</Moment>
					</h1>
					<div className="header-block">
             {this.props.match.params.id > 0 ? 'Update Events' : 'Add Event'}
          </div>
					<div className="input-block">
						<div className='input-field'>
						<div className='column-1'>Start Time</div>
							 <TimePicker className="column-2"
								value={moment(this.state.startTime)}
								onChange={this.setStartTime}
							/>{' '}
						</div>
						<div className='input-field' >
            <div className='column-1'>End Time</div><TimePicker className="column-2" value={moment(this.state.endTime)} onChange={this.setEndTime} />{' '}
						</div>
						<div className='input-field'>
            <div className='column-1'>Event Title</div>
							<input type="text" className="column-2" style={{ marginLeft: '74px'}} value={this.state.title} onChange={this.setTitle} />
						</div>
            <div className='input-field'>
            <button className= "save-button" type="button" onClick={this.addEvent}>
							Save
						</button>
            </div>
						
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: State) => {
	return { events: state.data.currentEvents, editEventObject: state.data.editEvent };
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators({ addEvents, getEventById, editEvent }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
