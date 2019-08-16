import React from 'react';
import PropTypes from 'prop-types';
import TemplateEditor from '../../components/TemplateEditor/TemplateEditor';

const NewTemplate = ({ history }) => (
  <div className="NewTemplate container">
    <h1>New Template</h1>
    <TemplateEditor history={history} />
  </div>
);

NewTemplate.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewTemplate;
