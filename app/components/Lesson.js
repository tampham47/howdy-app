/**
 *
 */

import config from 'config';
import moment from 'moment';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FacebookProvider, { Like } from 'react-facebook';
import Scrollspy from 'react-scrollspy';


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
              <Scrollspy className="menu-list"
                items={ ['', '', 'lesson', 'vocabulary', 'grammar', 'related-videos'] }
                offset={-60} currentClassName="_active">
                <li className="menu-item">
                  <button className="button-primary">Join and talk</button>
                </li>
                <li className="menu-item"><span className="strong">*</span> 5mins 36s</li>

                <li className="menu-item">
                  <a href="#lesson">lesson</a>
                </li>
                <li className="menu-item">
                  <a href="#vocabulary">vocabulary</a>
                </li>
                <li className="menu-item">
                  <a href="#grammar">grammar</a>
                </li>
                <li className="menu-item">
                  <a href="#related-videos">related videos</a>
                </li>
              </Scrollspy>
            </div>
          </div>
        </div>

        {!data && (
          <p>There has no lesson today.</p>
        )}

        {data && (
          <div className="container main">
            <div className="mobile-nav" style={{ display: 'none' }}>
              <Scrollspy className="menu-list"
                items={ ['', '', 'lesson', 'vocabulary', 'grammar', 'related-videos'] }
                offset={-60} currentClassName="_active">
                <li className="menu-item">
                  <button className="button-primary">Join and talk</button>
                </li>
                <li className="menu-item"><span className="strong">*</span> 5mins 36s</li>

                <li className="menu-item">
                  <a href="#lesson">lesson</a>
                </li>
                <li className="menu-item">
                  <a href="#vocabulary">vocabulary</a>
                </li>
                <li className="menu-item">
                  <a href="#grammar">grammar</a>
                </li>
                <li className="menu-item">
                  <a href="#related-videos">related videos</a>
                </li>
              </Scrollspy>
            </div>

            <div id="lesson" className="section target-element">
              <h3 className="main-title">{data.name}</h3>
              <div className="video-wrp">
                {videoRender}
              </div>

              <FacebookProvider appID="1391679424181926">
                <Like href={`https://goingsunny.com/?${moment().format('YYYYMMDD')}`}
                  colorScheme="dark" share />
              </FacebookProvider>
              <div className="lesson">
                {imageList}
                <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
              </div>
            </div>

            <div id="vocabulary" className="section target-element">
              <h3 className="main-title">Vocabulary</h3>
              <div dangerouslySetInnerHTML={{ __html: data.vocabulary }}></div>
            </div>

            <div id="grammar" className="section target-element">
              <h3 className="main-title">Grammar</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente quisquam nesciunt
              quos! Magnam laudantium eveniet recusandae ab ullam, deleniti rerum optio expedita voluptatibus repudiandae odit fugit! Sint, iste sequi ipsam!</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente quisquam nesciunt quos! Magnam laudantium eveniet recusandae ab ullam, deleniti rerum optio expedita voluptatibus repudiandae odit fugit! Sint, iste sequi ipsam!</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente quisquam nesciunt quos! Magnam laudantium eveniet recusandae ab ullam, deleniti rerum optio expedita voluptatibus repudiandae odit fugit! Sint, iste sequi ipsam!</p>
            </div>

            <div id="related-videos" className="section target-element">
              <h3 className="main-title">Related Videos</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente quisquam nesciunt quos! Magnam laudantium eveniet recusandae ab ullam, deleniti rerum optio expedita voluptatibus repudiandae odit fugit! Sint, iste sequi ipsam!</p>
            </div>

            <div style={{marginTop: '36px'}}>
              <FacebookProvider appID="1391679424181926">
                <Like href={`https://goingsunny.com/?${moment().format('YYYYMMDD')}`}
                  colorScheme="dark" showFaces share />
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
