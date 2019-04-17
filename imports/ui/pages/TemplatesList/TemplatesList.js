import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Row, Col, Alert } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import Templates from '../../../api/Templates/Templates';
import Select from 'react-select';

import './TemplatesList.scss';

const TemplatesList = ({ loading, templates, select, handleChange, defaultValue,  match, history }) => (
  !loading ? 
    <div className="TemplatesList">
      {templates.length ?
          <Row>
            {templates.map(({
              _id, title, createdAt, updatedAt, request, followup,
            }) => (
              <Col xs ={12} sm={6} key={_id}>
                <div className='templateCard'>
                  <div className='content'>
                    <p><a href={`/templates/${_id}`}>{title}</a></p>
                    <h5>Connection Request</h5>
                    <p>{request}</p>
                    <h5>Follow Up</h5>
                    <p>{followup}</p>
                  </div>
                  <Button onClick={() => handleChange({
                    'label': title,
                    'request': request,
                    'followup': followup
                  })}>Choose Template</Button>
                </div>
              </Col>
            ))} </Row> : <Alert bsStyle="warning">No templates yet!</Alert>}
    </div> : <Loading />
);

TemplatesList.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object
};

export default createContainer((props) => {
  const subscription = Meteor.subscribe('templates');
  let templates = Templates.find().fetch();
  let select = []

  if(subscription.ready()){
	  for(let template in templates) {
        
        if(templates[template]._id) {
            select.push({
                value: templates[template]._id,
                label: templates[template].title,
                request: templates[template].request,
                followup: templates[template].followup,
            })
        }
	  }
  }

  console.log("HEY")
  console.log(select)
 
  return {
    loading: !subscription.ready(),
    templates: templates,
    select: select,
    handleChange: props.handleChange,
    defaultValue: props.defaultValue,
  };
}, TemplatesList);
