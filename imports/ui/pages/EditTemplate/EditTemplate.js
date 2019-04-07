import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Templates from '../../../api/Templates/Templates';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import TemplateEditor from '../../components/TemplateEditor/TemplateEditor';

const handleRemove = (templateId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('templates.remove', templateId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Template deleted!', 'danger');
        history.push('/prospects');
      }
    });
  }
};

const handleAdd = (templateId, history) => {
    Meteor.call('templates.add', templateId, (error) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
        } else {
            Bert.alert('Template added!', 'success');
          history.push('/prospects');
        }
    });
};

const renderTemplate = (doc, match, history) => (doc ? (
  <div className="EditTemplate">
    <Row>
        <Col xs={12} sm={6} smOffset={3}>
            <div className="page-header clearfix">
            <h4 className="pull-left">{doc.title}</h4>
            {
              !doc.replied ? (
                <ButtonToolbar className="pull-right">
                  <ButtonGroup bsSize="small">
                    <Button onClick={() => history.push(`/templates/${doc._id}`)}>View</Button>
                    <Button onClick={() => handleRemove(doc._id, history)} className="text-danger">
                      Delete
                  </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              ) : null

            }
            </div>
            <TemplateEditor doc={doc} history={history} />
        </Col>
    </Row>
  </div>
) : <NotFound />);

const EditTemplate = ({
  loading, doc, match, history,
}) => (
  !loading ? renderTemplate(doc, match, history) : <Loading />
);

EditTemplate.defaultProps = {
  doc: null,
};

EditTemplate.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const templateId = match.params._id;
  console.log(templateId)
  const subscription = Meteor.subscribe('templates.view', templateId);

  return {
    loading: !subscription.ready(),
    doc: Templates.findOne(templateId),
  };
})(EditTemplate);
