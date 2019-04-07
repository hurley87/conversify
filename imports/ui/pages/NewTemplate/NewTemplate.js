import React from 'react';
import PropTypes from 'prop-types';
import TemplateEditor from '../../components/TemplateEditor/TemplateEditor';

const NewTemplate = ({ history }) => (
  <div className="NewTemplate">
    <h4 className="page-header">Add Template</h4>
    <TemplateEditor history={history} />
  </div>
);

NewTemplate.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewTemplate;
