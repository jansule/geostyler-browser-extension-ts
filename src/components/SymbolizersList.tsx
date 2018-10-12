import * as React from 'react';

import { Button, Col, List, Row } from 'antd';
import {
  Symbolizer as GsSymbolizer
} from 'geostyler-style';
import { Preview } from 'geostyler';

interface DefaultSymbolizersListProps {
  onAddSymbolizer: () => void;
  onSymbolizerEdit: (symbolizer: GsSymbolizer) => void;
  onRemoveSymbolizer: (symbolizer: GsSymbolizer) => void;
}

export interface SymbolizersListProps extends Partial<DefaultSymbolizersListProps> {
  symbolizers: GsSymbolizer[];
}

class SymbolizersList extends React.Component<SymbolizersListProps, {}> {

  public static defaultProps: DefaultSymbolizersListProps = {
    onAddSymbolizer: () => { return; },
    onRemoveSymbolizer: (symbolizer: GsSymbolizer) => { return; },
    onSymbolizerEdit: (symbolizer: GsSymbolizer) => { return; }
  };

  render() {
    const {
      symbolizers,
      onAddSymbolizer,
      onSymbolizerEdit,
      onRemoveSymbolizer
    } = this.props;

    return (
      <List
          size="small"
          header={<div>Symbolizers</div>}
          footer={<Button onClick={(e: any) => {
            if (onAddSymbolizer) {
              onAddSymbolizer();
            }
          }}>Add Symbolizer</Button>}
          dataSource={symbolizers}
          renderItem={(symbolizer: GsSymbolizer) => (
            <List.Item
              actions={[
                <a key="1" onClick={() => {
                  if (onSymbolizerEdit) {
                    onSymbolizerEdit(symbolizer);
                  }
                }}>Edit</a>,
                <a key="2" onClick={() => {
                  if (onRemoveSymbolizer) {
                    onRemoveSymbolizer(symbolizer);
                  }
                }}>Remove</a>
              ]}
            >
              <Row>
                <Col span={12}>
                  {symbolizer.kind}
                </Col>
                <Col span={12}>
                  <Preview
                    className="ruleslist-preview"
                    symbolizers={[symbolizer]}
                    onSymbolizerChange={() => { return; }}
                    showOsmBackground={false}
                    hideEditButton={true}
                  />
                </Col>
              </Row>
            </List.Item>
            )}
        />
    );
  }
}

export default SymbolizersList;
