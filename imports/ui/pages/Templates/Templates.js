import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import TemplatesCollection from '../../../api/Templates/Templates';
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
  <div className="Templates container">
    <div className="clearfix">
      <h1 className="pull-left">Templates</h1>
      <Link className="second-btn pull-right" to={`${match.url}/new`}>New Template</Link>
    </div>
    <br />
    {templates.length ?
        <Row>
          {templates.map(({
            _id, title, createdAt, updatedAt, request, followup,
          }) => (
            <Col xs ={12} sm={6} key={_id}>
              <div className='template-card'>
                <h4>{title} <a href={`/templates/${_id}/edit`}><img className="edit" height="12px" src="Edit.svg"/></a>  <span onClick={() => handleRemove(_id)} className='delete'><img height="15px" src="Delete.svg"/></span></h4>
                <div className='inner-card'>
                  <h5>Connection Request</h5>
                  <p>{request}</p>
                  <br />
                  <h5>Follow Up</h5>
                  <p>{followup}</p>
                </div>
              </div>

            </Col>
          ))} </Row> : 
          <div className='empty-state'>
            <h1>Your template library is empty</h1>
            <p>Make sure you add a template before you upload prospects.</p>
            <p><img height="280px" src="/1.png"/></p>
          </div>
          
  }
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

  return {
    loading: !subscription.ready(),
    templates: TemplatesCollection.find().fetch(),
  };
})(Templates);
