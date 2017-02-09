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
          {/*<h5 className="lesson-section--helper"><i>{data.videoIntro}</i></h5>*/}
          <h4 className="lesson-section--title">{data.name}</h4>
          {videoRender}
          <h5 className="lesson-section--helper">{data.imageIntro}</h5>
          {imageList}
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          <h4>Vocabulary</h4>
          <div dangerouslySetInnerHTML={{ __html: data.vocabulary }}></div>
          <br/><br/>
          <div className="lesson-section--helper">
            <span>---</span><br/>
            <b>Goingsunny hoạt động thế nào?</b>
            <p>Mỗi ngày Goingsunny sẽ cung cấp cho các bạn một bài học mới, bao gồm 1 video và 1 đoạn hội thoại liên quan, giúp bạn phát triển kỹ năng nghe, ngữ pháp và từ vựng.</p>
            <p>Đồng thời cứ mỗi 30 phút, nếu bạn đăng nhập và nhấn nút "Join Next Session" thì bạn có cơ hội được kết nối với 1 người khác để phân vai lặp lại đoạn hội thoại, nói chuyện nhiều sẽ giúp bạn tự tin trong giao tiếp hơn.</p>
            <p>Hãy kiên nhẫn, thành công sẽ đến với bạn :))</p>
          </div>
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
