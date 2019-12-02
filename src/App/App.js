import React, { Component } from 'react';
import './App.css';
import Graph from '../Graph/Graph';
import PropTypes from 'prop-types';

class App extends Component {

    render() {
        return (
            <>
                <div id="altitude" className='graph'></div>
                <Graph url={"http://localhost:3000/sensor_event/altitude_at_time"} timeFrom={1546457200} timeTo={1546473600} craneId={8}/>
            </>
        );
    }
}

export default App;






