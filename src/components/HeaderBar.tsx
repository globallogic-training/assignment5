import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { getCurrentDate, editCurrentDate } from '../actions/currentDate';
import { State } from '../reducers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface HState {
	currentDate: string;
}
interface HProps {
	setCurrentDate: any;
	currentDate: string;
	getCurrentDate: () => void;
	editCurrentDate: (date: string) => void;
}

class HeaderBar extends React.Component<HProps, HState> {
	constructor(props: any) {
		super(props);

		this.state = {
			currentDate: new Date().toDateString()
		};
	}
	componentDidMount() {
		this.props.getCurrentDate();
		this.setState({
			currentDate: this.props.currentDate
		});
		this.props.setCurrentDate(this.props.currentDate);
	}

	componentDidUpdate(previousProps: HProps){
		if(previousProps.currentDate !== this.props.currentDate){
			this.setState({
				currentDate: this.props.currentDate
			});
			this.props.setCurrentDate(this.props.currentDate);
		}
	}
	handleChange = (value: Date) =>{
		this.props.editCurrentDate(value.toDateString());
		this.props.setCurrentDate(value.toDateString());
		
	}

	previousDate = () => {
		var date = new Date(this.state.currentDate);
		date.setDate(date.getDate() - 1);
		this.props.editCurrentDate(date.toDateString());
		this.props.setCurrentDate(date.toDateString());
	};

	nextDate = () => {
		var date = new Date(this.state.currentDate);
		date.setDate(date.getDate() + 1);
		this.props.editCurrentDate(date.toDateString());
		this.props.setCurrentDate(date.toDateString());
	};
	
  setToday = () =>{
		this.props.editCurrentDate(new Date().toDateString());
		this.props.setCurrentDate(new Date().toDateString());
	}
	
	render() {
		return (
			<div className="header-bar-column">
				<div className="previous-button">
          <button type="button" onClick={this.setToday}>
						Today
					</button>
					<button style={{marginLeft: 10}}type="button" onClick={this.previousDate}>
						Previous
					</button>
				</div>
				<div className="current-date">
					{/* <Moment format="MMM DD YYYY">{this.state.currentDate}</Moment> */}
					<DatePicker
							
							selected={new Date(this.state.currentDate)}
							dateFormat="MMM dd, yyyy"
							onChange={this.handleChange}
					/>
				</div>

				<div className="next-button">
					<button type="button" onClick={this.nextDate}>
						Next
					</button>
					<Link style={{marginLeft: 10}} to={`/add-event/${this.state.currentDate}/0`}>
						<button style={{padding: 4}}>Add Event</button>
					</Link>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state: State) => {
	return { currentDate: state.date.currentDate };
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators({ getCurrentDate, editCurrentDate }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
