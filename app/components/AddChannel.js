/**
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { showAddChannelComp } from 'actions/chanels';

class AddRoom extends Component {
  render() {
    var isActive = this.props.isActive ? '_active' : '';

    return (
      <div className={`comp-add-room ${isActive}`}>
        <div className="comp-add-room__wrapper">
          <div className="container">
            <div className="columns six offset-by-three">
              <div className="comp-add-room__content">
                <form className="add-room-form">
                  <h5 className="add-room-form__title">Add channel</h5>

                  <label for="nameOfChannel">Name of channel</label>
                  <input className="u-full-width" type="text" name="nameOfChannel"
                    placeholder="Goingsunny" id="nameOfChannel" />

                  <label for="channelUrl">Channel URL</label>
                  <input className="u-full-width" type="text" name="channelUrl"
                    placeholder="goingsunny.com/channel/your-url" id="channelUrl" />

                  <label for="description">Description</label>
                  <textarea className="u-full-width" placeholder="..." name="description" id="description"></textarea>

                  <label className="add-room-form__checkbox">
                    <input type="checkbox" name="isPrivate" />
                    <span>Is private</span>
                  </label>

                  <div className="add-room-form__controls">
                    <input className="button button-primary" type="submit" value="Submit" />
                    <input className="button" type="button" value="Cancel" />
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddRoom.propTypes = {};
export default connect(null, { showAddChannelComp })(AddRoom);
