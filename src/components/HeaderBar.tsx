import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

interface HState {
	currentDate: string;
}
interface HProps {
	setCurrentDate: any;
}

class HeaderBar extends React.Component<HProps, HState> {
	constructor(props: any) {
		super(props);

		this.state = {
			currentDate: new Date().toDateString()
		};
	}
	componentDidMount() {}
	previousDate = () => {
		var date = new Date(this.state.currentDate);
		date.setDate(date.getDate() - 1);
		this.setState({
			currentDate: date.toDateString()
		});
		this.props.setCurrentDate(date.toDateString());
	};
	nextDate = () => {
		var date = new Date(this.state.currentDate);
		date.setDate(date.getDate() + 1);
		this.setState({
			currentDate: date.toDateString()
		});
		this.props.setCurrentDate(date.toDateString());
  };
  setToday = () =>{
		this.setState({
			currentDate: new Date().toDateString()
		});
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
					<Moment format="MMM DD YYYY">{this.state.currentDate}</Moment>
				</div>

				<div className="next-button">
					<button type="button" onClick={this.nextDate}>
						Next
					</button>
					<Link style={{marginLeft: 10}} to={`/add-event/${this.state.currentDate}/0`}>
						<button style={{padding: 6}}>Add Event</button>
					</Link>
				</div>
			</div>
		);
	}
}

export default HeaderBar;
