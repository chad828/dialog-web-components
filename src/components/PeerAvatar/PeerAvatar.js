/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { AvatarSize } from '../Avatar/getAvatarSize';

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import getAvatarSize from '../Avatar/getAvatarSize';
import createSequence from '../../utils/createSequence';
import styles from './PeerAvatar.css';

export type Props = {
  className?: string,
  peer: PeerInfo,
  size?: AvatarSize,
  online?: ?boolean,
  onClick?: (event: SyntheticMouseEvent) => any
};

const seq = createSequence();

class PeerAvatar extends PureComponent {
  id: string;
  props: Props;

  static defaultProps = {
    size: 'medium'
  };

  constructor(props: Props) {
    super(props);

    this.id = 'peer_avatar_' + seq.next();
  }

  getAvatarSize(): number {
    return getAvatarSize(this.props.size);
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    if (!this.props.online) {
      return (
        <Avatar
          className={this.props.className}
          size={this.props.size}
          image={this.props.peer.avatar}
          title={this.props.peer.title}
          placeholder={this.props.peer.placeholder}
          onClick={this.props.onClick}
        />
      );
    }

    return (
      <svg viewBox="0 0 36 36" className={className} width={this.getAvatarSize()} height={this.getAvatarSize()}>
        <defs>
          <pattern id={this.id} width="100%" height="100%" patternUnits="objectBoundingBox">
            <image
              x="0"
              y="0"
              width="100%"
              height="100%"
              xlinkHref={this.props.peer.avatar}
            />
          </pattern>
        </defs>
        <path
          fill={`url(#${this.id})`}
          // eslint-disable-next-line
          d="M24.79 34.675C22.695 35.53 20.402 36 18 36 8.06 36 0 27.94 0 18S8.06 0 18 0s18 8.06 18 18c0 2.402-.47 4.695-1.325 6.79C33.435 23.677 31.797 23 30 23c-3.866 0-7 3.134-7 7 0 1.797.677 3.436 1.79 4.675z"
        />
        <circle cx="30" cy="30" r="4" className={styles.online} />
      </svg>
    );
  }
}

export default PeerAvatar;
