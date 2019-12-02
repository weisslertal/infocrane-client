import React, { Component } from 'react';
import './App.css';
import Graph from '../Graph/Graph';
import DatetimeRangePicker from 'react-datetime-range-picker';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeFrom: 1546300800,
            timeTo: 1546387200,
            cranes: [],
            craneId: null
        };
    }

    componentWillMount() {
        fetch("http://localhost:3000/crane",
            { method: 'get' }
        ).then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        cranes: result,
                        craneId: result[0]
                    })
                },
                (error) => {
                    console.log('error!!', error);
                }
            )
    }

    render() {
        return (
            <>
                <DatetimeRangePicker
                    onChange={this.dateTimeHandler.bind(this)} />
                <Dropdown options={this.state.cranes} onChange={this.craneDropdownHandler.bind(this)} value={this.state.craneId} placeholder="Select a Crane" />
                {this.state.timeFrom && this.state.timeTo && this.state.craneId &&
                <Graph url={"http://localhost:3000/sensor_event/altitude_at_time"}
                       timeFrom={this.state.timeFrom} timeTo={this.state.timeTo} craneId={this.state.craneId}/>}
            </>
        );
    }

    dateTimeHandler(e){
        this.setState({ timeFrom: parseInt((new Date(e.start).getTime() / 1000).toFixed(0)) });
        this.setState({ timeTo: parseInt((new Date(e.end).getTime() / 1000).toFixed(0)) });
    }

    craneDropdownHandler(e){
        console.log(e);
        this.setState({ craneId: e.value })
    };
}

export default App;






