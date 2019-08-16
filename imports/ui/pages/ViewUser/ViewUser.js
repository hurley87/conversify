import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';

import './ViewUser.scss';

const renderUser = (user, match, history) => (user ? (
  <div className="ViewUser container">
    <Row>
        <Col sm={8} smOffset={2}>
            <p><img src="/landinglogo.png"/></p>
            <h1>You'll say goodbye to all your HR & Payroll headaches</h1>
            <p>I'll help you  focus on what's most important – your employees.</p>
            <br/>
            <a className='add-btn' href={user.profile.meetingLink}>Schedule a call with {user.profile.name.first} {user.profile.name.last}</a>
            <br />
            <br />
            <iframe width="420" height="315" src="https://www.youtube.com/embed/0nzzP9xh03U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Col>
    </Row>
  </div>
) : <NotFound />);

const ViewUser = ({
  loading, user, match, history,
}) => (
  !loading ? renderUser(user, match, history) : <Loading />
);

ViewUser.defaultProps = {
  user: null,
};

ViewUser.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const userId = match.params._id;
  const subscription = Meteor.subscribe('users.view', userId);

  const user = Meteor.users.findOne(userId);

  console.log(user)

  return {
    loading: !subscription.ready(),
    user,
  };
})(ViewUser);
