import React, { Component } from 'react';
import './LoadData.css';
import { Button} from 'react-bootstrap';

class LoadData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cycles_url: null,
            sensor_url: null
        };

        this.runEtl = this.runEtl.bind(this)
    }

    runEtl(){
        fetch(`${process.env.REACT_APP_API_URL}/etl/load`,
        {   method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sensor_data_url: this.state.sensor_url, cycles_data_url: this.state.cycles_url }) 
        }).then(res => res.json())
        .then(
            (result) => {
                window.alert(result.message);
            },
            (error) => {
                console.log('An error has occurd, please contact the administrator for help', error);
            }
        )
    }

    render() {
        return (
            <>
                <h3>Load data from file URL</h3>
                <input placeholder='Enter Cycles file URL' 
                    onChange={(event) => this.setState({cycles_url: event.target.value})}/>
                <input placeholder='Enter Sensor file URL' 
                    onChange={(event) => this.setState({sensor_url: event.target.value})}/>

                <Button onClick={this.runEtl}>Load data from files</Button> 
            </>
        );
    }
}

export default LoadData;






