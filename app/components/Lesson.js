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
    var imageList, videoRender;
    var data = this.props.datacontext || {};

    if (data && data.youtubeEmbedLink) {
      videoRender = (
        <div>
          <h5 className="lesson-section--helper">{data.videoIntro}</h5>
          <iframe width="100%" height="480" src={data.youtubeEmbedLink} frameBorder="0" allowFullScreen></iframe>
        </div>
      );
    }

    imageList = ['01', '02', '03', '04', '05'].map(function(i, index) {
      if (data[`image${i}`]) {
        var item = data[`image${i}`];
        return <img key={i} src={`${config.RESOURCE_PATH}/uploads/${item.filename}`} alt=""/>;
      } else {
        return <span key={i}></span>;
      }
    }.bind(this));

    if (data) {
      renderHtml = (
        <div>
          <h5 className="lesson-section--title">{data.name}</h5>
          {videoRender}
          <h5 className="lesson-section--helper">{data.imageIntro}</h5>
          {imageList}
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
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
