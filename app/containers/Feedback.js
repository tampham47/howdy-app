/**
 * gsun2016
 * tw
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LeftMenu from 'components/LeftMenu';
import HeaderBar from 'components/HeaderBar';
import { loadChannels } from 'actions/chanels';
import { addFeedback } from 'actions/application';
import listener from 'middleware/listener';
import * as ApplicationType from 'actions/application';


class Feedback extends Component {
  static fetchData({ store, params }) {
    return store.dispatch(loadChannels());
  }

  constructor(props) {
    super(props);
    var profile = props.currentUser;

    this.state = {
      form: {
        _user: profile.id || profile._id
      }
    };
  }

  componentDidMount() {
    this.props.loadChannels();

    listener.sub(ApplicationType.ADDED_FEEDBACK.toString(), function(event) {
      alert('Your feedback has been submitted.');
      this.setState({
        form: {
          message: ''
        }
      });
    }.bind(this));
  }

  componentWillUnmount() {
    listener.unsub(ApplicationType.ADDED_FEEDBACK.toString());
  }

  handleChanged(prop, event) {
    var f = this.state.form;

    switch (prop) {
      default:
        f[prop] = event.target.value;
    }

    this.setState({ form: f });
  }

  handleSubmitButton() {
    var form = this.state.form;
    var p = this.props.currentUser;
    form._user = p.id || p._id;

    this.props.addFeedback(form);
  }

  handleCancelButton() {}

  render() {
    let channelList = this.props.channelList;

    return (
      <div className="relm">
        <LeftMenu chanelList={this.props.channelList} />

        <main className="main-area">
          <div className="main-content">
            <HeaderBar title='Feedback' />
            <div className="main-content main-content--expand">
              <form className="add-room-form" onSubmit={()=>false}>

                <label htmlFor="message">Let us know your expectation</label>
                <textarea className="u-full-width" style={{height: 150}}
                  placeholder="..." name="message" id="message"
                  value={this.state.form.message}
                  onChange={this.handleChanged.bind(this, 'message')} >
                </textarea>

                <div className="add-room-form__controls">
                  <input className="button button-primary" type="button" value="Submit"
                    onClick={this.handleSubmitButton.bind(this)}/>
                </div>
              </form>
            </div>
          </div>

          <div className="room-panel"></div>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    channelList: state.chanels.toJS().chanelList,
    currentUser: state.currentUser.toJS(),
  };
}

Feedback.propTypes = {};
export { Feedback };
export default connect(mapStateToProps, { loadChannels, addFeedback })(Feedback);
