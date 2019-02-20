import React from "react";
import { hot } from "react-hot-loader";
import { Checkbox } from 'antd';
import { SITES } from '../sites';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.getStorage();
  }
  getStorage() {
    chrome.storage.local.get('notify_setting', (storage) => {
      this.setState({
        options: storage['notify_setting'] || SITES
      });
    });
  }
  onChange(checkboxIndex, event) {
    const { options } = this.state;
    const selected = event.target.checked;
    options[checkboxIndex].selected = selected;

    chrome.storage.local.set({'notify_setting': options}, () => {
      console.log('notify_setting 配置存储成功');
    });
    this.setState({
      options: options
    });
  }
  render () {
    const { options } = this.state;
    return (
      <div className="container">
        <h2>🚫 🙅 🙅 不要打扰我</h2>
        <p>默认隐藏所有站点的通知，取消勾选则显示提醒</p>
        <div className="options">
          {options.map((option, index) => {
            return <Checkbox key={index} checked={option.selected} onChange={this.onChange.bind(this, index)}>{option.label}</Checkbox>;
          })}
        </div>
      </div>
    )
  }
};

export default hot(module)(Setting);
