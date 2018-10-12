import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import VotesCollection from '../../../api/Votes/Votes';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import _ from 'lodash';
import './Votes.scss';
import moment from 'moment'

const handleRemove = (documentId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('chats.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
      }
    });
  }
};

const Votes = ({
  loading, votes, match, history,
}) => (!loading ? (
  <div className="Votes">
	  {votes.reverse().map((vote, i) => (
	    <div className='bubble' key={i}>
	    	<p>{vote.text} <span className='pull-right'>{vote.date}</span></p>
	    </div>
	  ))}
  </div>
) : <Loading />);


export default withTracker(() => {
  const subscription = Meteor.subscribe('votes');

  let votes = VotesCollection.find().fetch();

  votes.map((vote) => {

  	let text = "Chat's are coming in!"
  	// const name = vote['first name'] + " " + vote['last name']
    const name = 'Someone'
  	const date = moment(vote['signed up']).subtract(4, 'h').fromNow()

  	if('InititalLike' in vote){
  		text = name + " just voted for " + vote['InititalLike'] + "."
  	}

  	if("MostImportant" in vote){
  		text = name + " indicated " + vote['MostImportant'].toLowerCase() + " is the most important issue."
  	}

  	if('Viaducts' in vote) {
  		if(vote['Viaducts'] == "Keep them") {
  			text = name + " wants to keep the viaducts."
  		} else {
  			text = name + " wants to scrap the viaducts."
  		}
  	}

  	if('FreshIdeas' in vote) {
  		if(vote['FreshIdeas'] == 'Fresh Ideas') {
  			text = name + " prefers fresh ideas over political experience."
  		} else {
  			text = name + " prefers political experience over fresh ideas."
  		}
  	}

  	if("Gregor" in vote) {
  		if(vote['Gregor'] == "Good job") {
  			text = name + " believes Mayor Gregor Robertson has done a good job."
  		} else {
  			text = name + " believes Mayor Gregor Robertson has not done a good job."
  		}
  	}

  	if("HomeOwner" in vote) {
  		if(vote['HomeOwner'] == "Yes") {
  			text = name + " is a home owner."
  		} else {
  			text = name + " is not a home owner."
  		}
  	}

  	if("Vote2014" in vote) {
  		if(vote['Vote2014'] == "Yes") {
  			text = name + " voted in the last municipal election."
  		} else {
  			text = name + " did not vote in the last municipal election."
  		}
  	}

  	if("LikeNPA" in vote) {
  		if(vote['LikeNPA'] == "It is bad") {
  			text = name + " is not a fan of the NPA."
  		} else {
  			text = name + " is a fan of the NPA."
  		}
  	}

  	if("VanFinRightTrack" in vote) {
  		if(vote['VanFinRightTrack'] == "No") {
  			text = name + " feels the city is not on the right track financially." 
  		} else {
  			text = name + " feels the city is on the right track financially."
  		}
  	}

  	if("VanEnvironment" in vote) {
  		if(vote['VanEnvironment'] == "Yes") {
  			text = name + " feels the city is on the right track in regards to the environment." 
  		} else {
  			text = name + " feels the city is not on the right track in regards to the environment."
  		}
  	}

  	if("VanDebt" in vote) {
  		if(vote['VanDebt'] == "Yes") {
  			text = name + " is worried about the city's debt." 
  		} else {
  			text = name + " is not worried about the city's debt."
  		}
  	}

  	if("VanDebt" in vote) {
  		if(vote['VanDebt'] == "Yes") {
  			text = name + " is worried about the city's debt." 
  		} else {
  			text = name + " is not worried about the city's debt."
  		}
  	}

  	if("EconConservative" in vote) {
  		if(vote['EconConservative'] == "Yes") {
  			text = name + " has Conservative values when it comes to the economy." 
  		} else {
  			text = name + " does not have conservative values when it comes to the economy."
  		}
  	}

  	if("SocialLiberal" in vote) {
  		if(vote['SocialLiberal'] == "Yes") {
  			text = name + " has Liberal values when it comes to the social issues." 
  		} else {
  			text = name + " does not have Liberal values when it comes to the social issues."
  		}
  	}

  	if("VoteWomen" in vote) {
  		if(vote['VoteWomen'] == "Positive") {
  			text = name + " wouldn't mind voting for a female candidate." 
  		} else {
  			text = name + " won't vote for a female candidate."
  		}
  	}

  	if("VisionNPAReflectViews" in vote) {
  		if(vote['VisionNPAReflectViews'] == "Yes") {
  			text = name + " is in favour of Vision or the NPA." 
  		} else {
  			text = name + " is not in favour of Vision or the NPA."
  		}
  	}

  	if("CityHallTransparent" in vote) {
  		if(vote['CityHallTransparent'] == "Yes") {
  			text = name + " believes city hall is transparent." 
  		} else {
  			text = name + " believes city hall is not transparent."
  		}
  	}

  	if("Vote4noCivic" in vote) {
  		if(vote['Vote4noCivic'] == "Yes") {
  			text = name + " is willing to vote for a candidate who is not affiliated with a political party." 
  		} else {
  			text = name + " is not willing to vote for a candidate who is not affiliated with a political party."
  		}
  	}

  	if("CarePolParty" in vote) {
  		if(vote['CarePolParty'] == "Yes") {
  			text = name + " cares about the political party the candidate is associated with." 
  		} else {
  			text = name + " does not care about the political party the candidate is associated with."
  		}
  	}

  	if("AreMPPsGood" in vote) {
  		if(vote['AreMPPsGood'] == "Yes") {
  			text = "MPPs are important to " + name + "." 
  		} else {
  			text = "MPPs are not important to " + name + "." 
  		}
  	}

  	if("DonatedBefore" in vote) {
  		if(vote['DonatedBefore'] == "Yes") {
  			text = name + " has donated before." 
  		} else {
  			text = name + " has never donated before." 
  		}
  	}


  	if("VisionGoodBad" in vote) {
  		if(vote['VisionGoodBad'] == "It is good") {
  			text = name + " feel's good about Vision Vancouver." 
  		} else {
  			text = name + " does not feel good about Vision Vancouver."
  		}
  	}

  	vote['text'] = text
  	vote['date'] = date
  	vote['name'] = name
  })


  return {
    loading: !subscription.ready(),
    votes: votes
  };
})(Votes);

function returnTotal(chats, name){
	return chats.filter((chat) => { return chat.InititalLike == name }).length
}
