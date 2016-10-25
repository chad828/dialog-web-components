/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message as MessageType } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Message from '../Message/Message';
import styles from './MessageGroup.css';

export type Props = {
  messages: MessageType[],
  renderActions?: () => React.Element<any>[],
  className?: string
};

class MessageGroup extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.className !== this.props.className ||
           nextProps.messages !== this.props.messages;
  }

  renderMessages(): React.Element<any>[] {
    const { messages, renderActions } = this.props;

    return messages.map((message, index) => {
      return (
        <Message
          message={message}
          key={message.rid}
          renderActions={renderActions}
          short={index !== 0}
        />
      );
    });
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <section className={className}>
        {this.renderMessages()}
      </section>
    );
  }
}

export default MessageGroup;
