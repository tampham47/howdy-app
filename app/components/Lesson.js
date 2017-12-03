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

import CountDown from './CountDown';


class Lesson extends Component {
  render() {
    if (!this.props.datacontext) {
      return <p>There has no lesson today.</p>;
    }

    var renderHtml;
    var imageList, videoRender;
    var data = this.props.datacontext || {};
    var targetDate = this.props.targetDate || moment().format('YYYYMMDD');

    if (data && data.youtubeLink) {
      var width = (typeof window !== 'undefined') ? window.innerWidth : 320;
      var height = width > 768 ? 366 : 180;
      var link = data.youtubeLink;
      if (link.indexOf('http') >= 0 && link.indexOf('https') < 0) {
        link = link.replace('http', 'https');
      }

      videoRender = (
        <iframe width="100%" height={height} src={link} frameBorder="0" allowFullScreen></iframe>
      );
    }

    return (
      <div>
        <div className="container-fixed">
          <div className="menu-wrapper">
            <div className="menu">
              <Scrollspy className="menu-list"
                items={ ['lesson', 'vocabulary', 'grammar', 'related-videos'] }
                offset={-60} currentClassName="_active">
                <li className="menu-item">
                  <a href="#lesson">Video</a>
                </li>
                <li className="menu-item">
                  <a href="#vocabulary">Vocabulary</a>
                </li>
                <li className="menu-item">
                  <a href="#brainstorming">Brainstorming</a>
                </li>
                <li className="menu-item">
                  <a href="#maincontent">Main content</a>
                </li>
              </Scrollspy>
            </div>
          </div>
        </div>

        {data && (
          <div className="container main">
            <div className="mobile-nav">
              <Scrollspy className="menu-list"
                items={ ['lesson', 'vocabulary', 'grammar', 'related-videos'] }
                offset={-60} currentClassName="_active">
                <li className="menu-item">
                  <a href="#lesson">Video</a>
                </li>
                <li className="menu-item">
                  <a href="#vocabulary">Vocabulary</a>
                </li>
                <li className="menu-item">
                  <a href="#brainstorming">Brainstorming</a>
                </li>
                <li className="menu-item">
                  <a href="#maincontent">Main content</a>
                </li>
              </Scrollspy>
            </div>

            <div id="lesson" className="section target-element">
              <h3 className="main-title">{data.name}</h3>
              <div className="video-wrp">
                {videoRender}
              </div>

              <FacebookProvider appID="1391679424181926">
                <Like href={`https://goingsunny.com/?d=${targetDate}`}
                  colorScheme="dark" share />
              </FacebookProvider>
            </div>

            <div id="vocabulary" className="section target-element">
              <h3 className="main-title">Vocabulary</h3>
              {data.vocabularies.map(i => {
                return (
                  <div>
                    <p>
                      <b>{i.word}</b>&nbsp;({i.pron})<br/>
                      {i.example}
                    </p>
                  </div>
                )
              })}
              {!data.vocabulary && (
                <p>No vocabulary today.</p>
              )}
            </div>

            <div id="brainstorming" className="section target-element">
              <h3 className="main-title">Brainstorming</h3>
              <div dangerouslySetInnerHTML={{ __html: data.brainstorming }}></div>
              {!data.brainstorming && (
                <p>No brainstorming today.</p>
              )}
            </div>

            <div id="maincontent" className="section target-element">
              <h3 className="main-title">Main content</h3>
              <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>

            <div style={{marginTop: '36px'}}>
              <FacebookProvider appID="1391679424181926">
                <Like href={`https://goingsunny.com/?d=${targetDate}`}
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
