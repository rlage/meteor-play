import React from 'react';
import PropTypes from 'prop-types';
import DocumentEditor from '../../components/DocumentEditor/DocumentEditor';

const NewDocument = ({ history, media }) => (
  <div className="NewDocument">
    <h4 className="page-header">New Gif</h4>
    <DocumentEditor history={history} media={media}/>
  </div>
);

NewDocument.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewDocument;
