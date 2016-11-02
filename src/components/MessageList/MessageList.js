/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message as MessageType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { AutoSizer, CellMeasurer, List } from 'react-virtualized';
import classNames from 'classnames';
import Message from '../Message/Message';
import styles from './MessageList.css';

export type Props = {
  className?: string,
  messages: MessageType[]
};

class MessageList extends PureComponent {
  props: Props;
  list: ?List;
  measurer: ?CellMeasurer;

  renderRow = ({ key, index, style }): React.Element<any> => {
    const message = this.props.messages[index];

    return (
      <div key={key} style={style}>
        <Message
          short={false}
          message={message}
        />
      </div>
    );
  };

  renderCell = ({ key, rowIndex, style }): React.Element<any> => {
    return this.renderRow({
      key,
      style,
      index: rowIndex
    });
  };

  setList = (list: List): void => {
    this.list = list;
  };

  setMeasurer = (measurer: CellMeasurer): void => {
    this.measurer = measurer;
  };

  render() {
    const className = classNames(styles.list, this.props.className);
    const rowCount = this.props.messages.length;

    return (
      <div className={styles.container}>
        <AutoSizer>
          {({ width, height }) => {
            return (
              <CellMeasurer
                ref={this.setMeasurer}
                columnCount={1}
                width={width}
                rowCount={rowCount}
                cellRenderer={this.renderCell}
              >
                {({ getRowHeight }) => {
                  return (
                    <List
                      ref={this.setList}
                      className={className}
                      height={height}
                      width={width}
                      rowCount={rowCount}
                      rowHeight={getRowHeight}
                      rowRenderer={this.renderRow}
                    />
                  );
                }}
              </CellMeasurer>
            );
          }}
        </AutoSizer>
      </div>
    );
  }
}

export default MessageList;
