/**
 * gsun2016
 * tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

class Login extends Component {

  componentWillMount() {
    var user = {};
    if (this.props.currentUser) {
      user = this.props.currentUser;
    }

    // if (user.isAuthenticated) {
    //   if (this.props.location.query && this.props.location.query.nextstate) {
    //     this.props.router.push(`/${this.props.location.query.nextstate}`);
    //   } else {
    //     this.props.router.push('/');
    //   }
    // }

    if (user.isAuthenticated) {
      // var nextstate = this.props.location.query.nextstate ? `/${this.props.location.query.nextstate}` : '/';
      // this.props.router.push(nextstate);
      this.props.router.push('/');
    }
  }

  componentDidMount() {
    console.log('Login.componentDidMount', this.props.currentUser);
  }

  render() {

    return (
      <div className="wave-wrapper">
        {/*<div className="goingmerry-bg">
          <div className="middle-wrapper">
            <h3 className="login-title">Login by</h3>
            <a href='/login/facebook' className="button button-primary">Continue with Facebook</a>
            <Link to='/' className="button">Continue with Google</Link>
            <Link to='/' className="button">Continue with Twitter</Link>
            <small>* we don't post any thing on your network</small>
          </div>
        </div>*/}

        <div className="container">
          <div className="brand">
            <img src="http://image.flaticon.com/icons/svg/123/123894.svg" alt="" />
            <h1>goingsunny</h1>
            <p>fake it 'til you make it</p>

            <a href='/login/facebook' className="button button--join-the-trip">Join the trip with facebook</a>
          </div>

          <div className="intro-message">
            <b>Goingsunny là gì?</b>
            <p>Hi, mình là D., fan One Piece. Goingsunny chính là từ ghép của 2 con tàu (going merry và thoudsand sunny) đã đưa băng hải tặc mũ rơm ra biển khơi, đến với tân thế giới, trải qua bao gian khó, nguy hiểm, để đi tìm kho báu One Piece. Goingsunny là một dự án giúp bạn luyện tập tiếng anh hằng ngày, bằng cách xem video và phân vai nói chuyện với bạn của mình. Cách học tiếng anh tự nhiên như những đứa trẻ bản địa, đã học đã lớn lên và đã thành người bản xứ. Bạn sẽ cần rất nhiều thời gian để nói chuyện lưu loát, thế nên xin hãy kiên nhẫn nhé.</p>
            <b>Cách hoạt động của Goingsunny?</b>
            <p>Goingsunny sẽ cung cấp cho bạn các video và đoạn hội thoại mới mỗi ngày. Đồng thời cứ mỗi 30 phút hệ thống sẽ tự động kết nối bạn với 1 người khác đang online, sau đó thực hiện 1 cuộc gọi video giữa 2 người, và rồi 2 người sẽ tự phân vai nói chuyện với nhau. Đừng quên nhấn vào nút <b>“Tham gia lớp học”</b>, nó sẽ cho hệ thống biết bạn sẽ tham gia lớp học kế tiếp.</p>
            <b>Mục tiêu của goingsunny?</b>
            <p>Mục tiêu của Goingsunny là đem tiếng anh đến với mọi người, vì mình hiểu rằng, làm chủ tiếng anh sẽ mở ra cho chúng ta rất nhiều cánh cửa, rất nhiều cơ hội trong cuộc sống.</p>
            <b>Văn hóa trên goingsunny?</b>
            <p>Hãy kiên nhẫn với chính mình và người khác. Hành trình đi tìm kho báu sẽ không vui nếu bạn chỉ đi một mình, thế nên hãy giúp bạn bè mình cùng tiến bộ mỗi ngày nhé, mình chắc rằng ngoài kho báu ở cuối con đường, thì quá trình đi tìm kho báu sẽ giúp mỗi con người ta trưởng thành hơn. Nếu chưa giỏi, hãy cứ làm như chúng ta đã giỏi, đó cũng chính là châm ngôn của goingsunny “fake it til you make it”.</p>
            <p>Ps/ Hãy là người lịch sự, đừng rời khỏi phòng khi chưa hoàn thành bài học hay chưa thông báo cho người đối diện biết nhé. Goingsunny miễn phí, và sẽ luôn như vậy. Như chính con đường đi tìm one piece sẽ không từ chối bất kỳ ai.</p>

            <p>---</p>
            <p>Kho báu onpiece ta để hết ở goingsunny, hãy leo lên đó mà lấy.</p>
            <p>Thuyền trưởng: <b>D. Xaolonist</b></p>
          </div>
        </div>
        <footer>
          <div className="wave"></div>
        </footer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser.toJS()
  };
}

Login.propTypes = {
};

export { Login };
export default connect(mapStateToProps)(withRouter(Login));
