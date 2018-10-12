import * as React from 'react';

import { Button } from 'antd';
import './CascadeButton.css';

export interface CascadeButtonProps {
  btnText?: string;
  onClick?: () => void;
}

class CascadeButton extends React.Component<CascadeButtonProps, {}> {
  render() {
    const {
      btnText,
      onClick
    } = this.props;

    return (
      <Button
        className="geostyler-cascade-button"
        onClick={onClick}
      >
        <span>{btnText}</span>
      </Button>
    );
  }
}

export default CascadeButton;
