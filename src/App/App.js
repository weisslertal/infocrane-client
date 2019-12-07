import React, { Component } from 'react';
import './App.css';
import Graph from '../Graph/Graph';
import CraneInfo from '../CraneInfo/CraneInfo';
import LoadData from '../LoadData/LoadData';
import DatetimeRangePicker from 'react-datetime-range-picker';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeFrom: null,
            timeTo: null,
            cranes: [],
            craneId: null,
            timestamp: null
        };

        this.setTimestampHandler = this.setTimestampHandler.bind(this)
    }

    componentWillMount() {
        fetch(`${process.env.REACT_APP_API_URL}/crane`,
            { method: 'get' }
        ).then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        cranes: result,
                        craneId: result[0]
                    });
                    console.log(this.state);
                },
                (error) => {
                    console.log('error!!', error);
                }
            )
    }

    render() {
        return (
            <>
                <h1>Infocrane</h1>
                <div>Please select time range to present:</div>
                <DatetimeRangePicker onChange={this.dateTimeHandler.bind(this)} />

                <div>Please select a crane to present:</div>
                <Dropdown options={this.state.cranes} onChange={this.craneDropdownHandler.bind(this)} 
                    value={this.state.craneId} placeholder="Please select a Crane" />
                
                {this.state.timeFrom && this.state.timeTo && this.state.craneId &&
                <Graph url={`${process.env.REACT_APP_API_URL}/sensor_event/altitude_at_time_range`}
                       timeFrom={this.state.timeFrom} timeTo={this.state.timeTo} craneId={this.state.craneId}
                        setTimestampHandler= {this.setTimestampHandler}/>}

                {this.state.timestamp &&
                <CraneInfo url={`${process.env.REACT_APP_API_URL}/crane/data_at_time`} craneId={this.state.craneId} timestamp={this.state.timestamp}/>}
           
                <LoadData/>
            </>
        );
    }

    dateTimeHandler(e){
        this.setState({ 
           timeFrom: parseInt((new Date(e.start).getTime() / 1000).toFixed(0)),
           timeTo: parseInt((new Date(e.end).getTime() / 1000).toFixed(0))
        });
        console.log(this.state);
    }

    craneDropdownHandler(e){
        console.log(e);
        this.setState({ 
            craneId: e.value
         });
         console.log(this.state);
    };

    setTimestampHandler(timestamp) {
        this.setState({
          timestamp: timestamp
        });
        console.log(this.state);
      }
}

export default App;






