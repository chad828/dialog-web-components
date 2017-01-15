/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';
import type { AvatarSize } from './getAvatarSize';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getAvatarSize from './getAvatarSize';
import isEmoji from '../../utils/isEmoji';
import styles from './Avatar.css';

export type Props = {
  className?: string,
  image: ?string,
  title: ?string,
  size: AvatarSize,
  placeholder: AvatarPlaceholder,
  onClick?: (event: SyntheticMouseEvent) => any
};

class Avatar extends PureComponent {
  props: Props;

  static defaultProps = {
    size: 'medium',
    placeholder: 'empty'
  };

  getAvatarText(): ?string {
    const { title } = this.props;

    if (title && title.length) {
      const titleArray = title.trim().split(' ');
      if (titleArray.length > 1) {
        return `${titleArray[0][0]}${titleArray[1][0]}`;
      }

      const char = title[0];
      if (!isEmoji(char)) {
        return char;
      }
    }

    return '#';
  }

  getAvatarSize(): number {
    return getAvatarSize(this.props.size);
  }

  render(): React.Element<any> {
    const { image, placeholder, title } = this.props;
    const size = this.getAvatarSize();
    const text = size >= 20 ? this.getAvatarText() : null;
    const twoChars = Boolean(text && text.length !== 1);

    const className = classNames({
      [styles.image]: image,
      [styles.placeholder]: !image,
      [styles[placeholder]]: !image
    }, this.props.className);

    const avatarStyles = {
      width: size,
      height: size,
      fontSize: Math.min(Math.floor(twoChars ? (size / 2.2) : (size / 1.9)), 60)
    };

    if (image) {
      if (this.props.onClick) {
        return (
          <div onClick={this.props.onClick} className={styles.clickable}>
            <img
              className={className}
              style={avatarStyles}
              src={image}
              width={size}
              height={size}
              alt={title}
            />
          </div>
        );
      }

      return (
        <img
          className={className}
          style={avatarStyles}
          src={image}
          width={size}
          height={size}
          alt={title}
        />
      );
    }


    if (this.props.onClick) {
      return (
        <div onClick={this.props.onClick} className={styles.clickable}>
          <div className={className} title={title} style={avatarStyles}>{text}</div>
        </div>
      );
    }

    return (
      <div className={className} title={title} style={avatarStyles}>{text}</div>
    );
  }
}

export default Avatar;
