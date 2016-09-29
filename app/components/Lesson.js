/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Lesson extends Component {
  render() {
    var renderHtml;
    if (this.props.datacontext) {
      renderHtml = (
        <div>
          <h4>{this.props.datacontext.name}</h4>
          <div dangerouslySetInnerHTML={{ __html: this.props.datacontext.content }}></div>
        </div>
      );
    } else {
      renderHtml = (
        <p>There has no lesson today.</p>
      )
    }

    return (
      <section className="lesson-section">
        { renderHtml }
      </section>
    )
  }
}

Lesson.propTypes = {};
export default connect()(Lesson);
