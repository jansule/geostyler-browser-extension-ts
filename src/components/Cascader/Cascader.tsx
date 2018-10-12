import * as React from 'react';
import CascadeButton from '../CascadeButton/CascadeButton';

export interface CascaderProps {
  items: string[];
  currentItem: string;
  itemClickAction?: (item: string) => void;
  itemLabel?: (item: string) => string;
}

class Cascader extends React.Component <CascaderProps, {}> {

  getCascades = () => {
    const {
      currentItem,
      items,
      itemClickAction,
      itemLabel
    } = this.props;

    const result = [];
    const currentItemIdx = items.findIndex(item => item === currentItem);
    if (currentItemIdx > -1) {
      for (let i = 0; i <= currentItemIdx; i++) {
        let label: string;
        if (itemLabel) {
          label = itemLabel(items[i]);
        } else {
          label = items[i];
        }
        result.push(
          <CascadeButton
            key={i.toString()}
            onClick={() => {
              if (itemClickAction) {
                itemClickAction(items[i]);
              }
            }}
            btnText={label}
          />
          );
      }
    }
    return result;
  }

  render() {
    const cascades = this.getCascades();
    return (
      cascades
    );
  }
}

export default Cascader;
