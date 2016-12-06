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
      var link = data.youtubeEmbedLink;
      if (link.indexOf('http') >= 0 && link.indexOf('https') < 0) {
        link = link.replace('http', 'https');
      }

      videoRender = (
        <iframe width="100%" height="366" src={link} frameBorder="0" allowFullScreen></iframe>
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
          <h5 className="lesson-section--helper"><i>{data.videoIntro}</i></h5>
          <h4 className="lesson-section--title">{data.name}</h4>
          {videoRender}
          <h5 className="lesson-section--helper">{data.imageIntro}</h5>
          {imageList}
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          <h5>Vocabulary</h5>
          <div dangerouslySetInnerHTML={{ __html: data.vocabulary }}></div>
        </div>
      );
    } else {
      renderHtml = (
        <p>There has no lesson today.</p>
      )
    }

    return (
      <section className={"lesson-section " + (this.props.isShow ? '' : 'u-hide')}>
        { renderHtml }
      </section>
    )
  }
}

Lesson.propTypes = {};
export default connect()(Lesson);
