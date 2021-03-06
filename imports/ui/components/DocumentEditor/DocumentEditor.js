/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class DocumentEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        body: {
          required: true,
        },
        rating: {
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        body: {
          required: 'This thneeds a gif, please.',
        },
        rating: {
          required: 'This needs a rating, please.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history, media } = this.props;
    const existingDocument = this.props.doc && this.props.doc._id;
    const methodToCall = existingDocument ? 'documents.update' : 'documents.insert';
    const doc = {
      title: this.title.value.trim(),
      body: this.body.value.trim(),
      rating: this.rating.value.trim(),
      media,
    };
    
    if(doc.media === "youtube"){
      doc.body = doc.body.replace('watch?v=', 'embed/')
    }
    
    if (existingDocument) doc._id = existingDocument;

    Meteor.call(methodToCall, doc, (error, documentId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingDocument ? 'Document updated!' : 'Document added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');

        if(doc.media === "youtube"){
          history.push(`/youtubeLinks/${documentId}`);
        } else {
          history.push(`/documents/${documentId}`);
        }
      }
    });
  }

  render() {
    const { doc, media } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="title"
          ref={title => (this.title = title)}
          defaultValue={doc && doc.title}
          placeholder={media + " name!"}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{media} URL</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="body"
          ref={body => (this.body = body)}
          defaultValue={doc && doc.body}
          placeholder={media + " URL"}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>{media} Rating</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="rating"
          ref={rating => (this.rating = rating)}
          defaultValue={doc && doc.rating}
          placeholder="rating from 1-5"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {doc && doc._id ? 'Save Changes' : 'Add '+doc.media}
      </Button>
    </form>);
  }
}

DocumentEditor.defaultProps = {
  doc: { title: '', body: '', rating: '', media: '', },
};

DocumentEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default DocumentEditor;
