import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Templates from '../../../api/Templates/Templates';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';

const handleRemove = (templateId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('templates.remove', templateId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Template deleted!', 'success');
        history.push('/templates');
      }
    });
  }
};

const renderTemplate = (doc, match, history) => (doc ? (
  <div className="ViewTemplate">
    <Row>
      <Col sm={6} smOffset={3}>
      <div className="page-header clearfix">
      <h4 className="pull-left">{ doc && doc.title }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
          <Button onClick={() => handleRemove(doc._id, history)} className="text-danger">
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    <h5>Connection Request</h5>
    <p>{ doc && doc.request }</p>
    <hr />
    <h5>Follow Up</h5>
    <p>{ doc && doc.followup }</p>
      </Col>
    </Row>

  </div>
) : <NotFound />);

const ViewTemplate = ({
  loading, doc, match, history,
}) => (
  !loading ? renderTemplate(doc, match, history) : <Loading />
);

ViewTemplate.defaultProps = {
  doc: null,
};

ViewTemplate.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const templateId = match.params._id;
  const subscription = Meteor.subscribe('templates.view', templateId);

  return {
    loading: !subscription.ready(),
    doc: Templates.findOne(templateId),
  };
})(ViewTemplate);
