import * as React from 'react';

import {
  Rule as GsRule,
  Style as GsStyle
} from 'geostyler-style';
import { NameField } from 'geostyler';
import RulesList from './RulesList';

const _cloneDeep = require('lodash/cloneDeep');

interface DefaultStyleViewProps {
  onStyleChange: (style: GsStyle) => void;
  onRuleEdit: (rule: GsRule) => void;
  onAddRule: () => void;
  onRemoveRule: (rule: GsRule) => void;
}

export interface StyleViewProps extends Partial<DefaultStyleViewProps> {
  style: GsStyle;
}

class StyleView extends React.Component<StyleViewProps, {}> {

  public static defaultProps: DefaultStyleViewProps = {
    onAddRule: () => {return; },
    onRemoveRule: (rule: GsRule) => { return; },
    onRuleEdit: (rule: GsRule) => { return; },
    onStyleChange: (style: GsStyle) => { return; }
  };

  onRuleEdit = (rule: GsRule) => {
    const {
      onRuleEdit
    } = this.props;

    if (onRuleEdit) {
      onRuleEdit(rule);
    }
  }

  render() {
    const {
      onStyleChange,
      onRuleEdit,
      onAddRule,
      onRemoveRule
    } = this.props;

    const style = _cloneDeep(this.props.style);

    return (
      <div>
        <NameField
          defaultValue={style.name}
          value={style.name}
          onChange={(name: string) => {
            style.name = name;
            if (onStyleChange) {
              onStyleChange(style);
            }
          }}
          label="Style Name"
          placeholder="Enter Style Name"
        />
        <RulesList
          rules={style.rules}
          onRuleEdit={onRuleEdit}
          onAddRule={onAddRule}
          onRemoveRule={onRemoveRule}
        />
      </div>
    );
  }
}

export default StyleView;
