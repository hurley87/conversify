import React from 'react';


class Card extends React.Component {
  constructor(props){
    super(props);
    this.nextFunction = this.nextFunction.bind(this);
  }
  nextFunction(event){
  	console.log(event.keyCode)
    if(event.keyCode === 39) {
      console.log('NEXT')
	  Meteor.call('chats.add', this.props.first.Email, (error) => {
	    if (error) {
	      console.log(error.reason, 'success');
	    } else {
	      console.log('Added', 'success');
	    }
	  });
    } else if(event.keyCode === 81) {
      console.log('LINK')
      window.open(this.props.first['Person Linkedin Url'], '_blank');
    } else if(event.keyCode === 32) {
      console.log('WEBSITE')
      window.open('http://www.' + this.props.first.Website, '_blank');
    } else if(event.keyCode === 37) {
    	console.log("PASS")
	  Meteor.call('chats.remove', this.props.first.Email, (error) => {
	    if (error) {
	      console.log(error.reason, 'success');
	    } else {
	      console.log('Removed', 'success');
	    }
	  });
    } else {
    	console.log('ESCAPE')
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.nextFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.nextFunction, false);
  }
  render() {

    return (
        <div>
	        <p> {this.props.first['First Name'] + " " + this.props.first['Last Name'] } - {this.props.first.Title}</p>
	        <p><a target='_blank' href={'http://www.' + this.props.first.Website}>{this.props.first.Website}</a></p>
	        <p>{this.props.first['Company']} ({this.props.first['# Employees']} emloyees) is located in {this.props.first.City}</p>
	        <p>{this.props.first['SEO Description']}</p>
        </div>
    );
  }
}

export default Card;