import * as React from 'react';

import {
  Filter as GsFilter,
  Rule as GsRule,
  ScaleDenominator as GsScaleDenominator,
  Symbolizer as GsSymbolizer
} from 'geostyler-style';
import { NameField, ScaleDenominator } from 'geostyler';
import ComparisonFilterUi from 'geostyler/dist/Component/Filter/ComparisonFilter/ComparisonFilter';
import SymbolizersList from './SymbolizersList';

const _cloneDeep = require('lodash/cloneDeep');

export interface DefaultRuleViewProps {
  onRuleChange: (rule: GsRule) => void;
  onSymbolizerEdit: (symbolizer: GsSymbolizer) => void;
  onAddSymbolizer: (rule: GsRule) => void;
  onRemoveSymbolizer: (rule: GsRule, symbolizer: GsSymbolizer) => void;
}

export interface RuleViewProps extends Partial<DefaultRuleViewProps> {
  rule: GsRule;
}

class RuleView extends React.Component<RuleViewProps, {}> {
  public static defaultProps: DefaultRuleViewProps = {
    onAddSymbolizer: (rule: GsRule) => { return; },
    onRemoveSymbolizer: (rule: GsRule, symbolizer: GsSymbolizer) => { return; },
    onRuleChange: (rule: GsRule) => {},
    onSymbolizerEdit: (symbolizer: GsSymbolizer) => { return; }
  };

  render() {
    const {
      onRuleChange,
      onAddSymbolizer,
      onRemoveSymbolizer,
      onSymbolizerEdit
    } = this.props;
    const rule = _cloneDeep(this.props.rule);

    return (
      <div>
        <NameField
          defaultValue={rule.name}
          value={rule.name}
          onChange={(name: string) => {
            rule.name = name;
            if (onRuleChange) {
              onRuleChange(rule);
            }
          }}
          label="Rule Name"
          placeholder="Enter Rule Name"
        />
        <div>
          <span>Scale Denominator</span>
          <ScaleDenominator
            scaleDenominator={rule.scaleDenominator}
            onChange={(sd: GsScaleDenominator) => {
              rule.scaleDenominator = sd;
              if (onRuleChange) {
                onRuleChange(rule);
              }
            }}
          />
        </div>
        <div>
          <span>Filter</span>
          <ComparisonFilterUi
            filter={rule.filter}
            onFilterChange={(filter: GsFilter) => {
              rule.filter = filter;
              if (onRuleChange) {
                onRuleChange(rule);
              }
            }}
          />
        </div>
        <div>
          <SymbolizersList
            symbolizers={rule.symbolizers}
            onAddSymbolizer={() => {
              if (onAddSymbolizer) {
                onAddSymbolizer(rule);
              }
            }}
            onRemoveSymbolizer={(symb: GsSymbolizer) => {
              if (onRemoveSymbolizer) {
                onRemoveSymbolizer(rule, symb);
              }
            }}
            onSymbolizerEdit={onSymbolizerEdit}
          />
        </div>
      </div>
    );
  }
}

export default RuleView;
