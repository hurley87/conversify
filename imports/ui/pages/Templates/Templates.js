import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import TemplatesCollection from '../../../api/Templates/Templates';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';

import './Templates.scss';

const handleRemove = (templateId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('templates.remove', templateId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Template deleted!', 'success');
      }
    });
  }
};

const Templates = ({
  loading, templates, match, history,
}) => (!loading ? (
  <div className="Templates">
    <div className="page-header clearfix">
      <h4 className="pull-left">Templates</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Template</Link>
    </div>
    {templates.length ?
        <Row>
          {templates.map(({
            _id, title, createdAt, updatedAt, request, followup,
          }) => (
            <Col xs ={12} sm={6} key={_id}>
              <div style={{height: "250px", overflow: "scroll"}} className='well'>
                <h4><a href={`${match.url}/${_id}`}>{title}</a></h4>
                <h5>Connection Request</h5>
                <p>{request}</p>
                <h5>Follow Up</h5>
                <p>{followup}</p>
              </div>

            </Col>
          ))} </Row> : <Alert bsStyle="warning">No templates yet!</Alert>}
  </div>
) : <Loading />);

Templates.propTypes = {
  loading: PropTypes.bool.isRequired,
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('templates');
  console.log('hey')
  return {
    loading: !subscription.ready(),
    templates: TemplatesCollection.find().fetch(),
  };
})(Templates);
