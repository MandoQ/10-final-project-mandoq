import React, { Component } from 'react'
import './Search.css';
import Nav from 'react-bootstrap/Nav'
class Search extends Component {

    render() {
        return (

            <Nav className="justify-content-center" activeKey="/home">
                <Nav.Item>
                    <input id="searchField" className="form-control mr-sm-2" type="text" value={this.props.textInput} placeholder="Enter A City" aria-label="Search" onChange={this.props.handleChange} />
                </Nav.Item>
                <Nav.Item>
                    <select id="lan-Select" onChange={this.props.handleLanguageChange} >
                        <option defualtvalue="en" value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="af">Afrikaans</option>
                        <option value="al">Albanian</option>
                        <option value="ar">Arabic</option>
                        <option value="az">Azerbaijani</option>
                        <option value="bg">Bulgarian</option>
                        <option value="ca">Catalan</option>
                        <option value="cz">Czech</option>
                        <option value="da">Danish</option>

                        <option value="de">German</option>
                        <option value="el">Greek</option>
                        <option value="eu">Basque</option>
                        <option value="fa">Persian</option>
                        <option value="fi">Finnish</option>
                        <option value="fr">French</option>
                        <option value="he">Hebrew</option>
                        <option value="hi">Hindi</option>
                        <option value="it">Italian</option>
                        <option value="ja">Japanese</option>
                        <option value="pt">Portuguese</option>
                        <option value="ua">Ukrainian</option>
                        <option value="zh_cn">Chinese Simplified</option>
                    </select>
                </Nav.Item>
                <Nav.Item>
                    <select id="degree-select" onChange={this.props.handleUnitChange} >
                        <option defualtvalue="standard" value="standard">Standard</option>
                        <option value="metric">Metric</option>
                        <option value="imperial">Imperial</option>
                    </select>
                </Nav.Item>
                <Nav.Item>
                <button id="submit-button" variant="light" onClick={this.props.fetchWeather} className="btn btn-outline btn btn-light">Get Results</button>
                </Nav.Item>
            </Nav>
        );
    }
}
export default Search;