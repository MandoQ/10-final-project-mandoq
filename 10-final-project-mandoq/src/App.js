import React, { Component } from 'react';
import './App.css';
import Search from './Search.js'
import Card from 'react-bootstrap/Card'
import Forecast from './Forecast.js'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

var apiKey = '7354b756ee4fd35295b43a9c6f22d8e8';
let months = ["Januaray", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"]
// Used this source to learn how to get the current date  https://www.w3schools.com/jsref/jsref_obj_date.asp
var today = new Date();
var month = String(months[today.getMonth()]);
var day = String(today.getDate());
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      language: 'en',
      units: 'standard',
      degree: 'K',
      currentWeather: {},
      daily: [],
      coordinates: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleUnitChange = this.handleUnitChange.bind(this);
  }

  fetchWeather() {
    this.requestCurrentWeatherAndForecast();
  }

  requestCurrentWeatherAndForecast = async () => {
    var degreeNotation = "";
    if (this.state.units === "standard") {
      degreeNotation = "K";
    } else if (this.state.units === "metric") {
      degreeNotation = "°C";
    } else {
      degreeNotation = "°F";
    }
    let city = encodeURIComponent(this.state.textInput);
    let lan = encodeURIComponent(this.state.language);
    let units = encodeURIComponent(this.state.units);

    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&lang=' + lan + '&units=' + units;
    const weatherResult = await fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('No Cities Found');
        }
      })
      .then(result => this.setState({
        currentWeather: result,
        degree: degreeNotation,
        coordinates: result.coord
      }))
    const forecast = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.state.coordinates.lat + '&lon=' + this.state.coordinates.lon + '&exclude=current,minutely,hourly,alerts&appid=' + apiKey + '&units=' + units + '&lang=' + lan)
      .then(res => res.json())
      .then(result => this.setState({ daily: result.daily }))
  }

  handleChange(event) {
    this.setState({
      textInput: event.target.value
    });
  }

  handleLanguageChange(event) {
    event.preventDefault();
    this.setState({
      language: event.target.value
    });
  }

  handleUnitChange(event) {
    this.setState({
      units: event.target.value,
    });
  }

  render() {
    console.log(this.state.daily);
    return (
      <section>
        <Search fetchWeather={this.fetchWeather} handleChange={this.handleChange} handleLanguageChange={this.handleLanguageChange} handleUnitChange={this.handleUnitChange} />
        <Card id="cityCard">
          <Card.Body>
            <Card.Title>{this.state.currentWeather.name}</Card.Title>
            <Card.Text>{month + " " + day}</Card.Text>
            <Card.Text>
              {this.state.currentWeather.main && Math.round(this.state.currentWeather.main.temp) + " " + this.state.degree}
            </Card.Text>
            <Card.Text>
              {this.state.currentWeather.weather && this.state.currentWeather.weather[0].description}
            </Card.Text>
          </Card.Body>
        </Card>
        <Forecast degree={this.state.degree} dailyForecast={this.state.daily} />
        <Container id="footer" fluid>
          <Row>
            <Col>Weather Data Powered By <a href="https://openweathermap.org/api" target="_blank">Open Weather API</a></Col>
          </Row>
        </Container>
      </section>
    );
  }
}
export default App;