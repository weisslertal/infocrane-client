import React, { Component } from 'react';
import Highcharts from 'highcharts';
import './Graph.css';
import PropTypes from 'prop-types';

class Graph extends Component {

    componentDidMount() {
        fetch(this.props.url + "?time_from=" + this.props.timeFrom + "&time_to=" + this.props.timeTo + "&crane_id=" + this.props.craneId,
            { method: 'get' }
            ).then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    Highcharts.chart('altitude', {
                        title: {
                            text: 'Crane Altitude'
                        },
                        xAxis: {
                            title: {
                                text: 'Seconds'
                            },
                            type: 'datetime',
                            dateTimeLabelFormats: {
                                second: '%S',
                            },
                            tickInterval: 1000,
                            categories: this.fillRange(1546457200, 1546473600),
                        },
                        yAxis: {
                            title: {
                                text: 'Altitude'
                            },
                        },
                        plotOptions: {
                            series: {
                                marker: {
                                    enabled: false
                                },
                                point: {
                                    events: {
                                        click: function() {
                                            console.log(this.category);
                                        }
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Crane ' + this.props.craneId,
                            data: result.map(Number)
                        }]
                    });
                },
                (error) => {
                    console.log('error!!', error);
                }
            )
    }

    fillRange(start, end) {
        return Array(end - start + 1).fill().map((item, index) => start + index);
    };

    render() {
        return (
            <>
                <div id="altitude" className='graph'></div>
            </>
        );
    }
}

Graph.propTypes = {
    url: PropTypes.string,
    timeFrom: PropTypes.number,
    timeTo: PropTypes.number,
    craneId: PropTypes.number
};

export default Graph;






