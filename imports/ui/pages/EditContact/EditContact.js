import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Contacts from '../../../api/Contacts/Contacts';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import ContactEditor from '../../components/ContactEditor/ContactEditor';

const handleRemove = (contactId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('contacts.remove', contactId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Contact deleted!', 'danger');
        history.push('/prospects');
      }
    });
  }
};

const handleAdd = (contactId, history) => {
    Meteor.call('contacts.add', contactId, (error) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
        } else {
            Bert.alert('Contact added!', 'success');
            history.push('/prospects');
        }
    });
};

const renderContact = (doc, match, history) => (doc ? (
  <div className="ViewContact">
    <Row>
        <Col xs={12} sm={8}>
            <div className="page-header clearfix">
                    <h4 className="pull-left"><a href={`/prospects/${doc._id}`}>{doc.firstName} {doc.lastName}</a>  <small>{doc.title} at <a target="_blank" href={`http://${doc.website}`}>{doc.company}</a></small>
                <a target="_blank" href={doc.linkedinUrl}><div style={{ backgroundColor: "#0077B5", marginLeft: "5px" }} className='badge'><span className="fa fa-linkedin"></span></div></a>
            </h4>
            </div>
            <ContactEditor doc={doc} history={history} />
        </Col>
    </Row>
  </div>
) : <NotFound />);

const ViewContact = ({
  loading, doc, match, history,
}) => (
  !loading ? renderContact(doc, match, history) : <Loading />
);

ViewContact.defaultProps = {
  doc: null,
};

ViewContact.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const contactId = match.params._id;
  console.log(contactId)
  const subscription = Meteor.subscribe('contacts.view', contactId);

  return {
    loading: !subscription.ready(),
    doc: Contacts.findOne(contactId),
  };
})(ViewContact);
