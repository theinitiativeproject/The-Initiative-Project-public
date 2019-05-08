import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Library from './components/Library.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'base',
      baseList: [
        { name: 'goblin' },
        { name: 'wolf' },
        { name: 'dragon' },
        { name: 'troll' },
        { name: 'skeleton' },
        { name: 'witch' },
        { name: 'harpy' }
      ],
      customList: [
        { name: 'custom goblin' },
        { name: 'custom wolf' },
        { name: 'custom dragon' },
        { name: 'custom troll' },
        { name: 'custom skeleton' },
        { name: 'custom witch' },
        { name: 'custom harpy' }
      ]
    };
    this.switchTab = this.switchTab.bind(this);
  }

  // componentDidMount() {
  //   $.ajax({
  //     url: '/items',
  //     success: data => {
  //       this.setState({
  //         items: data
  //       });
  //     },
  //     error: err => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  switchTab(newTab) {
    this.setState({
      currentTab: newTab
    });
  }

  render() {
    return (
      <div>
        <h1>Library</h1>
        <Library
          currentTab={this.state.currentTab}
          baseList={this.state.baseList}
          customList={this.state.customList}
          switchTab={this.switchTab}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
