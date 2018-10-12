import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ChatsCollection from '../../../api/Chats/Chats';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import Card from "../Card/Card";
import _ from 'lodash';
import './Chats.scss';
import moment from 'moment'
import Votes from '../Votes/Votes'

const handleRemove = (email) => {
  Meteor.call('chats.remove', email, (error) => {
    if (error) {
      console.log(error.reason, 'danger');
    } else {
      console.log('Pass', 'success');
    }
  });
};

const handleAdd = (email) => {
  Meteor.call('chats.add', email, (error) => {
    if (error) {
      console.log(error.reason, 'success');
    } else {
      console.log('Added', 'success');
    }
  });
};


const Chats = ({
  loading, chats, first
}) => (!loading ?  (
  <div className="Chats">
    <br />
    <br />
    <br />
    {
      chats.length == 0 ? 
      <h1>TODO: GET MORE LEADS CTA</h1>
       : 
      <Row>
        <Col md={4} mdOffset={4} smOffset={3} sm={6} xs={12}>
          <h3>{chats.length}</h3>
          <Card first={first} />
          <br />
          <Button onClick={handleAdd.bind(this, first.Email)} className='poll-btn text-center'>Add To Sequence</Button>
          <Button onClick={handleRemove.bind(this, first.Email)} className='poll-btn clear' type="submit">Pass</Button>
        </Col>
      </Row>
    }
  </div>
) : <Loading />);

Chats.propTypes = {
  loading: PropTypes.bool.isRequired,
  chats: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('chats');

  let chats = ChatsCollection.find().fetch();

  const first = chats[0]

  return {
    loading: !subscription.ready(),
    chats: chats,
    first: first
  };
})(Chats);

