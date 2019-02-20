import React from "react";
import { hot } from "react-hot-loader";
import { Checkbox } from 'antd';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    const options = [
      { label: '豆瓣', value: 'douban', selected: true },
      { label: 'LinkedIn', value: 'linkedin', selected: true }
    ];
    this.state = {
      options
    }
  }
  onChange(checkboxIndex, event) {
    const { options } = this.state;
    const selected = event.target.checked;
    options[checkboxIndex].selected = selected;

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
