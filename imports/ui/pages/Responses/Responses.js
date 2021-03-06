import "./Responses.scss";

import { Button, Col, Row, Table } from "react-bootstrap";

import ContactsCollection from "../../../api/Contacts/Contacts";
import Loading from "../../components/Loading/Loading";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import React from "react";
import { withTracker } from "meteor/react-meteor-data";

const updateSentiment = (linkedInUrl, sentiment) => {
  Meteor.call("updateSentiment", linkedInUrl, sentiment, (error) => {
    if (error) {
      console.log(error.reason, "success");
    } else {
      console.log("Added", "success");
    }
  });
};

const displayResponses = (responses, sentiment, upSentiment, downSentiment) => (
  <Table responsive>
    <tbody>
      {responses
        .filter((response) => response.sentiment == sentiment)
        .map(
          ({
            _id,
            firstName,
            lastName,
            messages,
            cohort,
            responseText,
            threadUrl,
            linkedInUsername,
            linkedinUrl,
          }) => (
            <tr key={_id}>
              <td>
                <a target="_blank" href={linkedinUrl}>
                  <img height="15px" src="linkedin.svg" />
                </a>{" "}
                <a href={`/prospects/${_id}`}>
                  {firstName} {lastName}
                </a>
              </td>
              <td>{cohort}</td>
              <td>{responseText.slice(0, 50)}</td>
              <td>
                <img
                  onClick={() => updateSentiment(linkedInUsername, upSentiment)}
                  height="15px"
                  src="up.svg"
                />
              </td>
              <td>
                <img
                  onClick={() =>
                    updateSentiment(linkedInUsername, downSentiment)
                  }
                  height="15px"
                  src="down.svg"
                />
              </td>
              <td>
                <a target="_blank" href={threadUrl}>
                  <img height="15px" src="chat.svg" />
                </a>
              </td>
            </tr>
          )
        )}
    </tbody>
  </Table>
);

const noResponses = (respones) => (
  <Row>
    <Col xs={12}>
      <h5>
        Connections (
        {respones.filter((response) => response.sentiment === "neutral").length}
        )
      </h5>
      {respones.filter((response) => response.sentiment === "neutral").length >
      0
        ? displayResponses(respones, "neutral", "neutral", "positive")
        : null}
    </Col>
    <Col xs={12}>
      <h5>
        Leads (
        {
          respones.filter((response) => response.sentiment === "positive")
            .length
        }
        )
      </h5>
      {respones.filter((response) => response.sentiment === "positive").length >
      0
        ? displayResponses(respones, "positive", "neutral", "meeting")
        : null}
    </Col>
    <Col xs={12}>
      <h5>
        Meetings (
        {respones.filter((response) => response.sentiment === "meeting").length}
        )
      </h5>
      {respones.filter((response) => response.sentiment === "meeting").length >
      0
        ? displayResponses(respones, "meeting", "positive", "client")
        : null}
    </Col>
    <Col xs={12}>
      <h5>
        Clients (
        {respones.filter((response) => response.sentiment === "client").length})
      </h5>
      {respones.filter((response) => response.sentiment === "client").length > 0
        ? displayResponses(respones, "client", "meeting", "client")
        : null}
    </Col>
  </Row>
);

const Responses = ({ loading, Responses }) =>
  !loading ? (
    <div className="Responses container">
      {Responses.filter((response) => response.sentiment == "").length > 0 ? (
        <div className="clearfix">
          <h1>Label your responses</h1>
        </div>
      ) : null}

      <div className="inner">
        {Responses.filter((response) => response.sentiment == "").map(
          (response) => {
            return (
              <div className="response-card">
                <Row>
                  <Col xs={12}>
                    <h4>
                      {response.firstName} {response.lastName}{" "}
                      <a
                        target="_blank"
                        href={response.threadUrl}
                        className="delete"
                      >
                        <img height="15px" src="followup.svg" />
                      </a>
                    </h4>
                    <div className="inner-response">
                      {response.messages.map((message) => (
                        <p>
                          <b>{message.name}</b>: {message.text}
                        </p>
                      ))}
                    </div>
                  </Col>
                  <Col xs={12}>
                    <Button
                      style={{
                        margin: "0",
                        position: "relative",
                        marginRight: "5px",
                        marginLeft: "15px",
                        marginBottom: "15px",
                      }}
                      onClick={() =>
                        updateSentiment(response.linkedInUsername, "positive")
                      }
                    >
                      <i class="fa fa-thumbs-up"></i>
                    </Button>
                    <Button
                      style={{
                        margin: "0",
                        position: "relative",
                        marginRight: "5px",
                        marginBottom: "15px",
                      }}
                      onClick={() =>
                        updateSentiment(response.linkedInUsername, "neutral")
                      }
                    >
                      <i class="fa fa-thumbs-down"></i>
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          }
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );

Responses.propTypes = {
  loading: PropTypes.bool.isRequired,
  Responses: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe("contacts.responses");

  const Responses = ContactsCollection.find({
    replied: true,
  }).fetch();

  Responses.map((response) => {
    response["responseText"] = "";
    for (var i = 0; i < response.messages.length; i++) {
      if (response.messages[i]["name"] != response.messages[0]["name"]) {
        response["responseText"] = response.messages[i]["text"];
        break;
      }
    }
  });

  return {
    loading: !subscription.ready(),
    Responses,
  };
})(Responses);
