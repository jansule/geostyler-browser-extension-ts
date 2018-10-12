import * as React from 'react';

import { Col, Row } from 'antd';
import { Editor, Preview } from 'geostyler';
import {
  Symbolizer as GsSymbolizer
} from 'geostyler-style';

interface DefaultSymbolizerViewProps {
  onSymbolizerChange: (symbolizer: GsSymbolizer) => void;
}

export interface SymbolizerViewProps extends Partial<DefaultSymbolizerViewProps> {
  symbolizer: GsSymbolizer;
}

class SymbolizerView extends React.Component<SymbolizerViewProps, {}> {
  public static defaultProps: DefaultSymbolizerViewProps = {
    onSymbolizerChange: (symbolizer: GsSymbolizer) => { return; }
  };

  public render() {
    const {
      symbolizer,
      onSymbolizerChange
    } = this.props;

    return (
      <div>
        <Row gutter={8}>
          <Col span={8}>
            <Preview
              symbolizers={[symbolizer]}
              onSymbolizerChange={() => { return; }}
              showOsmBackground={false}
              hideEditButton={true}
            />
          </Col>
          <Col span={16}>
            <Editor
              symbolizer={symbolizer}
              onSymbolizerChange={onSymbolizerChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SymbolizerView;
