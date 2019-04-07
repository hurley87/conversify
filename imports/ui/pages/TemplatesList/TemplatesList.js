import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import Templates from '../../../api/Templates/Templates';
import Select from 'react-select';

const TemplatesList = ({ loading, templates, select, handleChange,  match, history }) => (
  !loading ? 
    <div className="TemplatesList">
      <Select
        name="template"
        onChange={handleChange}
        options={select}
      />
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
    handleChange: props.handleChange
  };
}, TemplatesList);