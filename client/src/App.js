import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import Layout from './components/Layout';
import Theme from './MuiTheme';



class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      apiResponse: [],
      loggedInUser: "",
      refresh: false
    }
  }

  async callAPI(){
    fetch("http://localhost:9000/api/entry/")
    .then((response) => { return response.json()})
    .then((data) => {this.setState({apiResponse: data})})
    .catch(error => console.error('Error:', error))
  }

  async callUserAPI(){
      fetch("http://localhost:9000/user/login", {method: 'GET',credentials: 'include'})
      .then((response) => { 
        console.log(response)
        if(response.ok){
          return response.json()
        }
      })
      .then((data) => {this.setState({loggedInUser: data})})
      .catch(error => console.error('Error:', error))
      .then(console.log(this.state.loggedInUser))
  }

  componentDidMount(){
    this.callAPI()
    this.callUserAPI()
  }

  refreshEntries = () => {
    fetch("http://localhost:9000/api/entry/")
    .then((response) => { return response.json()})
    .catch(error => console.error('Error:', error))
    .then((data) => {this.setState({apiResponse: data})})
  }

  render(){
    return (
      <ThemeProvider theme={Theme}>
        <div className="App">
          <Layout 
            entryData={this.state.apiResponse}
            refreshEntries={this.refreshEntries}
          />
        </div>
      </ThemeProvider>
    );
  }

}

export default App;
