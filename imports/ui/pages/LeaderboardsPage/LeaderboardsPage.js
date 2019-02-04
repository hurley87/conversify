import React from 'react';
import Page from '../Page/Page';
import moment from 'moment';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import LeaderboardsContainer from '../LeaderboardsContainer/LeaderboardsContainer'
import ContactsContainer from '../ContactsContainer/ContactsContainer';


class HomePageDatePicker extends React.Component {
  constructor(props) {
    super(props);
		var dateObj = new Date();
		dateObj.setHours(dateObj.getHours() - 4);
		var month = dateObj.getUTCMonth();
		var month2 = dateObj.getUTCMonth() + 1;
		var day = dateObj.getUTCDate();
		var day2 = moment(dateObj).add(1, 'days').toDate().getUTCDate();
		var year = dateObj.getUTCFullYear();

		if(month.toString().length == 1){ month = '0' + month }
		if(month2.toString().length == 1){ month2 = '0' + month2 }
		if(day.toString().length == 1){ day = '0' + day }

		let today = year + "-" + month2 + '-' + day
		let tomorrow = year + "-" + month2 + '-' + day2

    this.state = {
      focusedInput: null,
      startDate: moment(today),
      endDate: moment(tomorrow),
      startDateString: today,
      endDateString: tomorrow
    };
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
  	if(startDate != null || endDate != null) {
	    this.setState({ 
	    	startDateString: startDate.format('YYYY-MM-DD'), 
	    	endDateString: endDate.format('YYYY-MM-DD'),
	    	startDate,
	    	endDate
	    });
  	} else {
	    this.setState({ 
	    	startDate,
	    	endDate
	    });
  	}

  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  isOutsideRangeFunc() {
  	return false
  }

  render() {
    const { focusedInput, startDate, endDate, startDateString, endDateString } = this.state;
    return (
        <div>
	    <Row>
	      <Col xs={12}>
          </Col>
          <br />
          <Col xs={12} sm={12}>
	          <DateRangePicker
	            {...this.props}
	            onDatesChange={this.onDatesChange}
	            onFocusChange={this.onFocusChange}
	            focusedInput={focusedInput}
	            startDate={startDate}
	            endDate={endDate}
	            startDateId="datepicker_start_home"
	            endDateId="datepicker_end_home"
	            startDatePlaceholderText="Start Date"
	            endDatePlaceholderText="End Date"
	            isOutsideRange={this.isOutsideRangeFunc} 
	            enableOutsideDays={true}
	            minimumNights={0}
	            />
	           <br />
	           <br />
	           <LeaderboardsContainer startDate={startDateString} endDate={endDateString} />
           </Col>
        </Row>   
        </div>
    );
  }
}

const LeaderboardsPage = () => (
  <div className="LeaderboardsPage">
  	<HomePageDatePicker />
  </div>
);

export default LeaderboardsPage;
