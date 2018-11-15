import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

const divStyle = {
  fontFamily: 'Verdana',
  fontSize: 12
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    this.getRecords();
  }

  search (term) {
    console.log(`${term} was searched in index.jsx`);
    axios.post('/repos', {
      term: term
    })
    .then((response) => {
      console.log('saved successfully', response);
      this.setState({
        repos: response.data
     });
    });
  }

  getRecords() {
    axios.get('/repos')
    .then((response) => {
      console.log('my data back on the client', response);
      this.setState({
        repos: response.data
     });
    });
  }

  render () {
    return (<div style={divStyle}>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));