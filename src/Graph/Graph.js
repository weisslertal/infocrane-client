import React, { Component } from 'react';
import Highcharts from 'highcharts';
import './Graph.css';
import PropTypes from 'prop-types';

class Graph extends Component {

    renderGraph() {
        fetch(this.props.url + "?time_from=" + this.props.timeFrom + "&time_to=" + this.props.timeTo + "&crane_id=" + this.props.craneId,
            { method: 'get' }
            ).then(res => res.json())
            .then(
                (result) => {
                    this.setupChart(result);
                },
                (error) => {
                    console.log('error!!', error);
                }
            )
    }

    setupChart(result){
        const self = this;
        Highcharts.chart('altitude', {
            title: {
                text: 'Crane Altitude'
            },
            xAxis: {
                visible: false,
                title: {
                    text: 'Seconds'
                },
                type: 'datetime',
                dateTimeLabelFormats: {
                    second: '%H:%M:%S',
                },
                tickInterval: 1000,
                categories: result.time,
            },
            yAxis: {
                title: {
                    text: 'Altitude'
                },
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    },
                    point: {
                        events: {
                            click: function() {
                                self.props.setTimestampHandler(this.category);
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Crane ' + this.props.craneId,
                data: result.altitude.map(Number)
            }]
        });
    }

    render() {
        this.renderGraph();
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
    craneId: PropTypes.number,
    setTimestampHandler: PropTypes.func
};

export default Graph;






