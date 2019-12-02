import React, { Component } from 'react';
import './App.css';
import Graph from '../Graph/Graph';
import DatetimeRangePicker from 'react-datetime-range-picker';


class App extends Component {

    // this.setState((state) => ({
    //     value: state.value + 1
    // }));
    render() {
        return (
            <>
                <DatetimeRangePicker
                    onChange={this.handler} />
                );
                <Graph url={"http://localhost:3000/sensor_event/altitude_at_time"} timeFrom={1546457200} timeTo={1546473600} craneId={11}/>
            </>
        );
    }

    handler(e){
        const timeFrom = parseInt((new Date(e.start).getTime() / 1000).toFixed(0));
        const timeTo = parseInt((new Date(e.end).getTime() / 1000).toFixed(0));
    }
}

export default App;






