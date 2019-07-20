import React from 'react';
import PropTypes from 'prop-types';

import './PageHeader.scss';

const PageHeader = ({ title, subtitle }) => (
  <div className="PageHeader">
    <div className="PageHeader-container">
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : ''}
      <br />
      <p className='text-centers'><a className="add-btn" href="https://calendly.com/conversifyai">Get a Demo</a></p>
    </div>
  </div>
);

PageHeader.defaultProps = {
  subtitle: '',
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default PageHeader;
