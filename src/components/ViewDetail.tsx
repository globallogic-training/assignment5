import * as React from 'react';
import { getEventById } from '../actions/event';
import { State } from '../reducers';
import { connect } from 'react-redux';
import Event from '../models/Event';

import { bindActionCreators } from 'redux';
import Moment from 'react-moment';

interface VApp {
	event: Event;
  match: any;
  getEventById: (id : number) => void;
}

interface VState {
  startTime: string,
  endTime: string,
  title: string
}


class ViewDetail extends React.Component<VApp, VState> {
	constructor(props: any) {
		super(props);
		this.state = {
      startTime: '',
      endTime: '',
      title: ''
		};
	}
  componentDidMount(){
    this.props.getEventById(this.props.match.params.id)
    this.setState({
      startTime: this.props.event.startTime || '',
      endTime: this.props.event.endTime || '',
      title: this.props.event.title || ''
    });
  }
  componentDidUpdate(prevProps: VApp) {
		if(prevProps.event !== this.props.event){
      this.setState({
				startTime: this.props.event.startTime,
				endTime: this.props.event.endTime,
				title: this.props.event.title
      });
      console.log('in if ');
      
    }
    console.log('out if ');
		
  }
	render() {

		return (
			<div>
				<div className="main-container">
					<h1>Event Details</h1>
					<div className="header-block">
						{/* <HeaderBar setCurrentDate={this.setCurrentDate} / */}
					</div>
					
            <div className='view-detail-item'>
            Event Title:{`  ${this.state.title}`}
            </div>
            <div className='view-detail-item'>
            Start Time:{'  '}<Moment format="HH mm">{this.state.startTime}</Moment>
            </div>
            <div className='view-detail-block'>
             End Time:{'  '}<Moment format="HH mm">{this.state.endTime}</Moment>
          </div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: State) => {
	return { event: state.data.editEvent };
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators({ getEventById }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDetail);
