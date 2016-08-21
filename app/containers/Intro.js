import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Intro extends Component {
  render() {
    return (
      <div className="relm">
        <nav className="left-menu">
          <ul className="left-menu-room-list">
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">Goingsunny</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">lorem/ipsum</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">lorem/ipsum</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">lorem/ipsum</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">lorem/ipsum</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">lorem/ipsum</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">nulla-consequat/massa-quis-enim</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">quisque/rutrum</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">maecenas/tempus</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">feugiat/tellus</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">donec/sodales</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">phasellus-viverra/nulla</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">velit/cursus-nunc</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">donec/sodales</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">phasellus-viverra/nulla</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">velit/cursus-nunc</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">donec/sodales</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">phasellus-viverra/nulla</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">velit/cursus-nunc</h3>
            </li>
            <li className="left-menu-room-item">
              <div className="left-menu-room-item-icon"></div>
              <h3 className="left-menu-room-item-name">leo-eget/bibendum</h3>
            </li>
          </ul>
        </nav>

        <main className="main-area">
          <div className="header-bar">
            <h1 className="header-bar__title">
              <span className="header-bar__icon"></span>
              goingsunny
            </h1>
            <div className="header-bar__control-wrapper">
              <a href=""><i className="fa fa-star-o"></i></a>
              <a href=""><i className="fa fa-cog"></i></a>
              <a href=""><i className="fa fa-send-o"></i></a>
              <a href=""><i className="fa fa-toggle-left"></i></a>
            </div>
          </div>

          <div className="main-content">
            <div className="main-content__scroller">
              <div className="message-list">
                <div className="message-item">
                  <div className="message-item__icon"></div>
                  <div className="message-item__wrapper">
                    <div className="message-item__title">
                      <span className="message-item__title__name">Gerasimos Maropoulos</span>
                      <small className="message-item__title__username">@kataras</small>
                      <small className="message-item__title__time">Jul 03 19:46</small>
                    </div>
                    <p>Showing off the power of `background-attachment: fixed` and a nice trick when you have a known constant location.</p>
                  </div>
                </div>
                <div className="message-item">
                  <div className="message-item__icon"></div>
                  <div className="message-item__wrapper">
                    <div className="message-item__title">
                      <span className="message-item__title__name">Gerasimos Maropoulos</span>
                      <small className="message-item__title__username">@kataras</small>
                      <small className="message-item__title__time">Jul 03 19:46</small>
                    </div>
                    <p>Showing off the power of `background-attachment: fixed` and a nice trick when you have a known constant location.</p>
                  </div>
                </div>
                <div className="message-item">
                  <div className="message-item__icon"></div>
                  <div className="message-item__wrapper">
                    <div className="message-item__title">
                      <span className="message-item__title__name">Gerasimos Maropoulos</span>
                      <small className="message-item__title__username">@kataras</small>
                      <small className="message-item__title__time">Jul 03 19:46</small>
                    </div>
                    <p>Showing off the power of `background-attachment: fixed` and a nice trick when you have a known constant location.</p>
                  </div>
                </div>
                <div className="message-item">
                  <div className="message-item__icon"></div>
                  <div className="message-item__wrapper">
                    <div className="message-item__title">
                      <span className="message-item__title__name">Gerasimos Maropoulos</span>
                      <small className="message-item__title__username">@kataras</small>
                      <small className="message-item__title__time">Jul 03 19:46</small>
                    </div>
                    <p>Showing off the power of `background-attachment: fixed` and a nice trick when you have a known constant location.</p>
                  </div>
                </div>
                <div className="message-item">
                  <div className="message-item__icon"></div>
                  <div className="message-item__wrapper">
                    <div className="message-item__title">
                      <span className="message-item__title__name">Gerasimos Maropoulos</span>
                      <small className="message-item__title__username">@kataras</small>
                      <small className="message-item__title__time">Jul 03 19:46</small>
                    </div>
                    <p>Thuở còn thơ ngày 3 cữ là thường, tôi lai rai qua từng chai lớn nhỏ, ai bảo say sưa là khổ, tôi mơ màng nghe men vút lên cao</p>
                  </div>
                </div>
                <div className="message-item">
                  <div className="message-item__icon"></div>
                  <div className="message-item__wrapper">
                    <div className="message-item__title">
                      <span className="message-item__title__name">Gerasimos Maropoulos</span>
                      <small className="message-item__title__username">@kataras</small>
                      <small className="message-item__title__time">Jul 03 19:46</small>
                    </div>
                    <p>Nhớ những ngày say sỉn té ở cầu ao, vợ bắt được chưa mắng câu nào đã khóc.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="input-area">
              <div className="input-area__wrapper">
                <div className="input-area__icon"></div>
                <div className="input-area__content-wrapper">
                  <textarea name="" id="" cols="30" rows="10" placeholder="Click here to type chat message"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="room-panel">
            <div className="room-panel__wrapper">
              <h6>People</h6>

              <ul className="people-list">
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
                <li className="people-item"></li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Intro);
