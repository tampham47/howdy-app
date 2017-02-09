/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class IntroComp extends Component {
  render() {
    return (
      <div className="intro-message">
        <b>Goingsunny là gì?</b>
        <p>Hi, mình là Xaolonist, fan One Piece. Goingsunny chính là từ ghép của 2 con tàu (Going Merry và Thoudsand Sunny) đã đưa băng hải tặc mũ rơm ra biển khơi, đến với tân thế giới, trải qua bao gian khó, nguy hiểm, để đi tìm kho báu One Piece. Goingsunny là một dự án giúp bạn luyện tập tiếng anh hằng ngày, bằng cách xem video và phân vai nói chuyện với bạn của mình. Cách học tiếng anh tự nhiên như những đứa trẻ bản địa, đã học đã lớn lên và đã thành người bản xứ. Bạn sẽ cần rất nhiều thời gian để nói chuyện lưu loát, thế nên xin hãy kiên nhẫn nhé.</p>
        <b>Cách hoạt động của Goingsunny?</b>
        <p>Mỗi ngày Goingsunny sẽ cung cấp cho các bạn một bài học mới, bao gồm 1 video và 1 đoạn hội thoại liên quan, giúp bạn phát triển kỹ năng nghe, ngữ pháp và từ vựng.</p>
        <p>Đồng thời cứ mỗi 30 phút, nếu bạn đăng nhập và nhấn nút <b>Join Next Session</b> thì bạn có cơ hội được kết nối với 1 người khác để phân vai lặp lại đoạn hội thoại, nói chuyện nhiều sẽ giúp bạn tự tin trong giao tiếp hơn.</p>
        <b>Mục tiêu của goingsunny?</b>
        <p>Mục tiêu của Goingsunny là đem tiếng anh đến với mọi người, vì mình hiểu rằng, làm chủ tiếng anh sẽ mở ra cho chúng ta rất nhiều cánh cửa, rất nhiều cơ hội trong cuộc sống.</p>
        <b>Văn hóa trên goingsunny?</b>
        <p>Hãy kiên nhẫn với chính mình và người khác. Hành trình đi tìm kho báu sẽ không vui nếu bạn chỉ đi một mình, thế nên hãy giúp bạn bè mình cùng tiến bộ mỗi ngày nhé, mình chắc rằng ngoài kho báu ở cuối con đường, thì quá trình đi tìm kho báu sẽ giúp mỗi con người ta trưởng thành hơn. Nếu chưa giỏi, hãy cứ làm như chúng ta đã giỏi, đó cũng chính là châm ngôn của goingsunny “fake it til you make it”.</p>
        <p>Ps/ Hãy là người lịch sự, đừng rời khỏi phòng khi chưa hoàn thành bài học hay chưa thông báo cho người đối diện biết nhé. Goingsunny miễn phí, và sẽ luôn như vậy. Như chính con đường đi tìm one piece sẽ không từ chối bất kỳ ai.</p>

        <p>---</p>
        <p>Nếu bạn dùng goingsunny bằng điện thoại hãy cài app <b>appear.in</b> trên điện thoại để có thể gọi video call nhé. Chi tiết có thể xem ở đây <a href="https://appear.in/" target="_blank">appear.in</a>.</p>
        <div className="app-link-group">
          <a href="https://itunes.apple.com/no/app/appear.in-free-group-video/id878583078?mt=8" target="_blank">
            <img src="/apple-icon.svg" width="150" alt="Download on the App Store" border="0" />
          </a>

          <a href="https://play.google.com/store/apps/details?id=appear.in.app" target="_blank">
            <img src="/google-icon.png" width="150" alt="Get it on Google Play" border="0" />
          </a>
        </div>
        <br/>
        <p>---</p>
        <p className="p-sign">Kho báu onpiece ta để hết ở goingsunny, hãy leo lên đó mà lấy.</p>
        <p>Thuyền trưởng: <b>D. Xaolonist</b></p>
      </div>
    )
  }
}

IntroComp.propTypes = {};
export default IntroComp;
