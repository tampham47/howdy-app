/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Lesson extends Component {
  render() {
    return (
      <section className="lesson-section">
        <h4>{this.props.datacontext.name}</h4>
        <div dangerouslySetInnerHTML={{ __html: this.props.datacontext.content }}></div>
      </section>
    )
  }
}

Lesson.propTypes = {};
export default connect()(Lesson);
