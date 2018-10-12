import * as React from 'react';

import {
  Rule as GsRule,
  Style as GsStyle,
  Symbolizer as GsSymbolizer
} from 'geostyler-style';
import RuleView from './RuleView';
import StyleView from './StyleView';
import SymbolizerView from './SymbolizerView';

interface DefaultFeatureSelectorProps {
  editRule: GsRule;
  onRuleChange: (rule: GsRule) => void;
  onAddRule: () => void;
  onRemoveRule: (rule: GsRule) => void;
  editSymbolizer: GsSymbolizer;
  onSymbolizerChange: (rule: GsRule, symbolizer: GsSymbolizer) => void;
  onAddSymbolizer: (rule: GsRule) => void;
  onRemoveSymbolizer: (rule: GsRule, symbolizer: GsSymbolizer) => void;
  onStyleChange: (style: GsStyle) => void;
  onItemChange: (item: ('style' | 'rule' | 'symbolizer'), obj: (GsRule | GsSymbolizer)) => void;
}

export interface FeatureSelectorProps extends Partial<DefaultFeatureSelectorProps> {
  style: GsStyle;
  selectedItem: 'style' | 'rule' | 'symbolizer';
}

class FeatureSelector extends React.Component<FeatureSelectorProps, {}> {

  onRuleEdit = (rule: GsRule) => {
    const {
      onItemChange
    } = this.props;
    if (onItemChange) {
      onItemChange('rule', rule);
    }
  }

  onSymbolizerEdit = (symbolizer: GsSymbolizer) => {
    const {
      onItemChange
    } = this.props;
    if (onItemChange) {
      onItemChange('symbolizer', symbolizer);
    }
  }

  getSelectedItem = (item: ('style' | 'rule' | 'symbolizer')): React.ReactNode => {
    const {
      onStyleChange,
      onRuleChange,
      onAddRule,
      onRemoveRule,
      onAddSymbolizer,
      onRemoveSymbolizer,
      style,
      editRule,
      editSymbolizer,
      onSymbolizerChange
    } = this.props;

    switch (item) {
      case 'style':
        return (
          <StyleView
            style={style}
            onStyleChange={onStyleChange}
            onRuleEdit={this.onRuleEdit}
            onAddRule={onAddRule}
            onRemoveRule={onRemoveRule}
          />
        );
      case 'rule':
        return (
          <RuleView
            rule={editRule as GsRule}
            onRuleChange={onRuleChange}
            onAddSymbolizer={onAddSymbolizer}
            onRemoveSymbolizer={onRemoveSymbolizer}
            onSymbolizerEdit={this.onSymbolizerEdit}
          />
        );
      case 'symbolizer':
        return (
          <SymbolizerView
            symbolizer={editSymbolizer as GsSymbolizer}
            onSymbolizerChange={symb => {
              if (onSymbolizerChange) {
                onSymbolizerChange(editRule as GsRule, symb);
              }
            }}
          />
        );
      default:
        return;
    }
  }

  render() {
    const {
      selectedItem
    } = this.props;

    return (
      <div>
        {this.getSelectedItem(selectedItem)}
      </div>
    );
  }
}

export default FeatureSelector;
