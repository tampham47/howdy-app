/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import config from 'config';


class Lesson extends Component {
  render() {
    var renderHtml;
    var imageList = ['01', '02', '03', '04', '05'].map(function(i) {
      if (this.props.datacontext[`image${i}`]) {
        var item = this.props.datacontext[`image${i}`];
        return <img src={`${config.RESOURCE_PATH}/uploads/${item.filename}`} alt=""/>;
      } else {
        return <span></span>;
      }
    }.bind(this));

    if (this.props.datacontext) {
      renderHtml = (
        <div>
          <h6>{this.props.datacontext.intro}</h6>
          {imageList}
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
