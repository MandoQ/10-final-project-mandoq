import React, { Component } from 'react';
import './Forecast.css'
import Table from 'react-bootstrap/Table'
class Forecast extends Component {

    getDate(timeStamp){
        var a = new Date(timeStamp * 1000);
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let date = + a.getDate() + " " + days[a.getDay()];
        return date;
    }
    render() {
        //console.log(this.props.dailyForecast);
        return (
            <div>
                <Table className="forecast-table" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Day Temperature</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.dailyForecast.map((daily, index) => {
                            return (
                                <tr key={index}>
                                    <td>{this.getDate(daily.dt)}</td>
                                    <td>{Math.round(daily.temp.day) + " " + this.props.degree}</td>
                                    <td>{daily.weather[0].description}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </div>
        );
    }
}
export default Forecast;