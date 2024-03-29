import React, { Component } from 'react';
import './CraneInfo.css';
import PropTypes from 'prop-types';

class CraneInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image_url: null,
            weight: null,
            altitude: null,
            load_type: null,
            load_type_category: null,
            step_number: null,
            step_name: null,
            time: null,
            crane_number: null
        };
    }

    componentDidMount() {
        this.fetch_data();
    }

    componentDidUpdate() {
        this.fetch_data();
    }

    fetch_data(){
        fetch(this.props.url + "?timestamp=" + this.props.timestamp + "&crane_id=" + this.props.craneId,
        { method: 'get' }
        ).then(res => res.json())
        .then(
            (result) => {
                if(this.state.image_url !== result.image_url){
                    this.setState({
                        image_url: result.image_url,
                        weight: result.weight,
                        altitude: result.altitude,
                        load_type: result.load_type,
                        load_type_category: result.load_type_category,
                        step_number: result.step_number,
                        step_name: result.step_name,
                        time: result.time,
                        crane_number: result.crane_number
                    })
                }
            },
            (error) => {
                console.log('An error has occurd, please contact the administrator for help', error);
            }
        )
    }

    modifyImageUrl(url){
        if(url == null){
            return null;
        }
        return url.replace('https://img.versatile.ai', 'http://vn-excercise.s3.us-east-1.amazonaws.com/rawdeviceimagedata');
    }

    render() {
        return (
            <>
                <img src={ this.modifyImageUrl(this.state.image_url)} alt='' className='crane-image' />
                <h3>Crane Information</h3>
                <div className='crane-info'>
                    <div>Time of event: { this.state.time }</div>
                    <div>Crane Number: { this.state.crane_number }</div>
                    <div>Weight: { this.state.weight }</div>
                    <div>Altitude: { this.state.altitude }</div>
                    <div>Load Type: { this.state.load_type }</div>
                    <div>Load Type Category: { this.state.load_type_category }</div>
                    <div>Step Number: { this.state.step_number }</div>
                    <div>Step Name: { this.state.step_name } </div>
                </div>
            </>
        );
    }
}

CraneInfo.propTypes = {
    url: PropTypes.string,
    timestamp: PropTypes.number,
    craneId: PropTypes.number,
};

export default CraneInfo;






