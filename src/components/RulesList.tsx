import * as React from 'react';

import { Button, Col, List, Row } from 'antd';
import {
  Rule as GsRule
} from 'geostyler-style';
import { Preview } from 'geostyler';

const _get = require('lodash/get');

interface DefaultRulesListProps {
  onRemoveRule: (rule: GsRule) => void;
  onAddRule: () => void;
  onRuleEdit: (rule: GsRule) => void;
}

export interface RulesListProps extends Partial<DefaultRulesListProps> {
  rules: GsRule[];
}

class RulesList extends React.Component <RulesListProps, {}> {

  getScaleDenominatorText = (rule: GsRule): string => {
    let text: string;
    const min = _get(rule, 'scaleDenominator.min');
    const max = _get(rule, 'scaleDenominator.max');
    text = `ScaleDenominator:\n1:${min} - 1:${max}`;
    return text;
  }

  public static defaultProps: DefaultRulesListProps = {
    onAddRule: () => { return; },
    onRemoveRule: (rule) => { return; },
    onRuleEdit: (rule) => { return; }
  };

  render() {
    const {
      rules,
      onRuleEdit,
      onAddRule,
      onRemoveRule
    } = this.props;

    return (
      <div className="ruleslist">
        <List
          size="small"
          header={<div>Rules</div>}
          footer={<Button onClick={onAddRule}>Add Rule</Button>}
          dataSource={rules}
          renderItem={(rule: GsRule) => (
            <List.Item
              actions={[
                <a key="1" onClick={() => {
                  if (onRuleEdit) {
                    onRuleEdit(rule);
                  }
                }}>Edit</a>,
                <a key="2" onClick={() => {
                  if (onRemoveRule) {
                    onRemoveRule(rule);
                  }
                }}>Remove</a>
              ]}
            >
              <Row>
                <Col span={12}>
                  <Preview
                    className="ruleslist-preview"
                    symbolizers={rule.symbolizers}
                    onSymbolizerChange={() => { return; }}
                    showOsmBackground={false}
                    hideEditButton={true}
                  />
                </Col>
                <Col span={12}>
                  <strong>{rule.name}</strong><br/>
                  <span>
                    {rule.filter ?
                      `Filter: ${JSON.stringify(rule.filter)}`
                      : `Filter: none`
                    }
                  </span><br/>
                  <span>
                    {this.getScaleDenominatorText(rule)}
                  </span>
                </Col>
              </Row>
            </List.Item>
            )}
        />
      </div>
    );
  }
}

export default RulesList;
