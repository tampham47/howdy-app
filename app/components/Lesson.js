/**
 *
 */

import config from 'config';
import moment from 'moment';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FacebookProvider, { Like } from 'react-facebook';


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

    return (
      <div>
        <div className="container-fixed">
          <div className="menu-wrapper">
            <div className="menu">
              <ul className="menu-list">
                <li className="menu-item">
                  <button className="button-primary">Join and talk</button>
                </li>
                <li className="menu-item">5mins 36s</li>
                <li className="menu-item">lesson</li>
                <li className="menu-item _active">vocabulary</li>
                <li className="menu-item">related videos</li>
                <li className="menu-item">quiz</li>
              </ul>
            </div>
          </div>
        </div>

        {!data && (
          <p>There has no lesson today.</p>
        )}

        {data && (
          <div className="container main">
            <div className="mobile-nav">
              <ul className="menu-list">
                <li className="menu-item">
                  <button>Join and talk</button>
                </li>
                <li className="menu-item">5mins 36s</li>
                <li className="menu-item">lesson</li>
                <li className="menu-item _active">vocabulary</li>
                <li className="menu-item">related videos</li>
                <li className="menu-item">quiz</li>
              </ul>
            </div>

            <div>
              <h4>{data.name}</h4>
              {/*<p>
                Next session is going to start in 5mins:4s.
                Join and prove your speaking skill with others.
              </p>*/}
            </div>

            <div className="video-wrp">
              {videoRender}
            </div>

            <div className="lesson">
              {imageList}
              <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>

            <div className="vocabulary-wrp">
              <h5>Vocabulary</h5>
              <div dangerouslySetInnerHTML={{ __html: data.vocabulary }}></div>
            </div>

            <div style={{marginTop: '36px'}}>
              <FacebookProvider appID="1391679424181926">
                <Like href={`https://goingsunny.com/?${moment().format('YYYYMMDD')}`} colorScheme="dark" showFaces share />
              </FacebookProvider>
            </div>
          </div>
        )}
      </div>
    )
  }
}

Lesson.propTypes = {};
export default connect()(Lesson);
