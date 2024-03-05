import React, { Component } from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

class Link extends Component<{ page: string; children: any }, { status: string }> {
  constructor(props) {
    super(props);
    this.state = {
      status: STATUS.NORMAL,
    };
  }

  onMouseEnter = () => {
    this.setState({ status: STATUS.HOVERED });
  };

  onMouseLeave = () => {
    this.setState({ status: STATUS.NORMAL });
  };

  render() {
    const { page, children } = this.props;
    const { status } = this.state;

    return (
      <a className={status} href={page || '#'} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {children}
      </a>
    );
  }
}

export default Link;
