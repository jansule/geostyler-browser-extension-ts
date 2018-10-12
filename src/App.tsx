import * as React from 'react';

import 'antd/dist/antd.min.css';
import './App.css';

import {
  Rule as GsRule,
  Style as GsStyle,
  Symbolizer as GsSymbolizer
} from 'geostyler-style';

import en_US from 'geostyler/dist/locale/en_US';

import {
  Breadcrumb,
  Button,
  LocaleProvider,
  Row
} from 'antd';

import SldStyleParser from 'geostyler-sld-parser';

// import Cascader from './components/Cascader/Cascader';
import FeatureSelector from './components/FeatureSelector';
const uniqueId = require('lodash/uniqueId');
const _cloneDeep = require('lodash/cloneDeep');
const _isEqual = require('lodash/isEqual');
const _get = require('lodash/get');

type itemType = 'style' | 'rule' | 'symbolizer';

interface AppState {
  style: GsStyle;
  selectedItem: itemType;
  copy: boolean;
  editRule?: GsRule;
  editSymbolizer?: GsSymbolizer;
  sld?: string;
}

class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      copy: false,
      editRule: undefined,
      editSymbolizer: undefined,
      selectedItem: 'style',
      sld: undefined,
      style: this.getDefaultStyle()
    };
  }

  cascades = ['style', 'rule', 'symbolizer'];

  getDefaultSymbolizer = (): GsSymbolizer => {
    return {
      kind: 'Mark',
      wellKnownName: 'Circle'
    };
  }

  getDefaultRule = (): GsRule => {
    return {
      name: uniqueId('Rule '),
      symbolizers: [this.getDefaultSymbolizer()],
      scaleDenominator: {min: 0, max: 0}
    };
  }

  getDefaultStyle = (): GsStyle => {
    return {
      name: 'New Style',
      rules: [this.getDefaultRule()]
    };
  }

  getRuleIdx = (rule: GsRule): number => {
    const { style } = this.state;
    const idx = style.rules.findIndex(r => r.name === rule.name);
    return idx;
  }

  getSymbolizerIdx = (ruleIdx: number, symbolizer: GsSymbolizer): number => {
    const { style } = this.state;
    const idx = style.rules[ruleIdx].symbolizers.findIndex(s => _isEqual(s, symbolizer));
    return idx;
  }

  onItemChange = (item: itemType, obj?: GsRule|GsSymbolizer) => {
    switch (item) {
      case 'rule':
        this.setState({selectedItem: item, editRule: obj as GsRule});
        break;
      case 'symbolizer':
        this.setState({selectedItem: item, editSymbolizer: obj as GsSymbolizer});
        break;
      default:
        this.setState({selectedItem: item});
        break;
    }
  }

  onStyleChange = (style: GsStyle) => {
    this.setState({style});
  }

  onRuleChange = (newRule: GsRule) => {
    const style = _cloneDeep(this.state.style);
    const oldRule = this.state.editRule;
    const ruleIdx = style.rules.findIndex((r: GsRule) => r.name === _get(oldRule, 'name'));
    if (ruleIdx > -1) {
      style.rules[ruleIdx] = newRule;
    }
    this.setState({style, editRule: newRule});
  }

  onAddRule = () => {
    const style = _cloneDeep(this.state.style);
    style.rules.push(this.getDefaultRule());
    this.setState({style});
  }

  onRemoveRule = (rule: GsRule) => {
    const style = _cloneDeep(this.state.style);
    style.rules = style.rules.filter((r: GsRule) => r.name !== rule.name);
    this.setState({style});
  }

  onSymbolizerChange = (rule: GsRule, symbolizer: GsSymbolizer) => {
    const style = _cloneDeep(this.state.style);
    const oldSymbolizer = this.state.editSymbolizer;
    const ruleIdx = this.getRuleIdx(rule);
    if (ruleIdx > -1 && oldSymbolizer) {
      const symbIdx = this.getSymbolizerIdx(ruleIdx, oldSymbolizer);
      if (symbIdx > -1) {
        style.rules[ruleIdx].symbolizers[symbIdx] = symbolizer;
      }
    }
    this.setState({style, editRule: style.rules[ruleIdx], editSymbolizer: symbolizer});
  }

  onAddSymbolizer = (rule: GsRule) => {
    const style = _cloneDeep(this.state.style);
    const idx = this.getRuleIdx(rule);
    if (idx > -1) {
      style.rules[idx].symbolizers.push(this.getDefaultSymbolizer());
    }
    this.setState({style, editRule: style.rules[idx]});
  }

  onRemoveSymbolizer = (rule: GsRule, symbolizer: GsSymbolizer) => {
    const style = _cloneDeep(this.state.style);
    const idx = this.getRuleIdx(rule);
    if (idx > -1) {
      style.rules[idx].symbolizers = style.rules[idx].symbolizers
        .filter((s: GsSymbolizer) => !_isEqual(s, symbolizer));
    }
    this.setState({style, editRule: style.rules[idx]});
  }

  copyToClipboard = () => {
    this.setState({copy: true}, () => {
      const parser = new SldStyleParser();
      parser.writeStyle(this.state.style)
        .then((sld: string) => {
          this.setState({sld}, () => {
            const copyText = document.getElementById('copy-style') as HTMLInputElement;
            if (copyText) {
              copyText.select();
              document.execCommand('copy');
              this.setState({copy: false});
            }
          });
        });
    });
  }

  render() {
    const {
      selectedItem,
      style,
      editRule,
      editSymbolizer,
      sld,
      copy
    } = this.state;

    return (
      <LocaleProvider
        locale={en_US}
      >
        <div className="App">
          <Row type="flex">
            {/* <Col> */}
              <Button
                className="copy-button"
                type="primary"
                onClick={this.copyToClipboard}
              >Copy to Clipboard</Button>
              {/* <Cascader
                items={this.cascades}
                currentItem={selectedItem}
                itemClickAction={(item: itemType) => {
                  this.setState({selectedItem: item});
                }}
                itemLabel={(item: itemType) => {
                  let ruleText = _get(editRule, 'name');
                  ruleText = ruleText !== undefined
                    ? ruleText : '';
                  let symbolizerText = _get(editSymbolizer, 'kind');
                  symbolizerText = symbolizerText !== undefined
                    ? symbolizerText : '';
                  switch (item) {
                    case 'style':
                      return `Style - ${style.name}`;
                    case 'rule':
                      return `Rule - ${ruleText}`;
                    case 'symbolizer':
                      return `Symbolizer - ${symbolizerText}`;
                    default:
                      return '';
                  }
                }}
              /> */}
            <div className="featureselector">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a onClick={() => {this.setState({selectedItem: 'style'});}}>Style</a>
                </Breadcrumb.Item>
                {
                  selectedItem !== 'style' &&
                    <Breadcrumb.Item>
                      <a onClick={() => {this.setState({selectedItem: 'rule'});}}>Rule</a>
                    </Breadcrumb.Item>

                }
                {
                  selectedItem === 'symbolizer' &&
                    <Breadcrumb.Item>
                      <a onClick={() => {this.setState({selectedItem: 'symbolizer'});}}>Symbolizer</a>
                    </Breadcrumb.Item>
                }
              </Breadcrumb>
              <FeatureSelector
                style={style}
                editRule={editRule}
                onRuleChange={this.onRuleChange}
                onAddRule={this.onAddRule}
                onRemoveRule={this.onRemoveRule}
                editSymbolizer={editSymbolizer}
                onSymbolizerChange={this.onSymbolizerChange}
                onAddSymbolizer={this.onAddSymbolizer}
                onRemoveSymbolizer={this.onRemoveSymbolizer}
                selectedItem={selectedItem}
                onStyleChange={this.onStyleChange}
                onItemChange={this.onItemChange}
              />
            </div>
            {
              copy &&
                <textarea
                  id="copy-style"
                  value={sld}
                  readOnly
                />
            }
          </Row>
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
