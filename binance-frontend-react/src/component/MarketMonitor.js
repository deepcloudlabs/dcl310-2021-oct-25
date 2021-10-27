import React from "react";
import io from 'socket.io-client';
import {Line} from "react-chartjs-2";

export default class MarketMonitor extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isMonitoring: false,
            trades: [],
            movingAveragePrice: [],
            data: {
                labels: [],
                datasets: [{
                    label: 'BTC-USDT (Price)',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                }, {
                    label: 'BTC-USDT (MA of Price)',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(0,0,200,0.4)',
                    borderColor: 'rgba(0,0,200,0.5)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(0,0,200,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(0,0,200,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                }]
            },
            windowSize: 50,
            totalVolume: 0
        };
        this.socket = null;
    }


    componentDidMount() {
        this.socket = io("ws://localhost:5555");
        this.socket.on('ticker', this.handleTicker);
    }

    handleTicker = async (trade) => {
        // update trades
        trade.volume = Number(trade.price) * Number(trade.quantity);
        let trades = Array.from(this.state.trades);
        trades.push(trade);
        let windowSize = this.state.windowSize;
        if (trades.length > windowSize){
            trades = trades.slice(trades.length - windowSize);
        }
        // update moving average
        let totalVolume = trades.reduce((sum,trade) => sum + Number(trade.price), 0).toFixed(0);
        let movingAverage = totalVolume / trades.length;
        let chartData = {...this.state.data};
        chartData.labels.push(trade.timestamp);
        chartData.datasets[0].data.push(Number(trade.price));
        chartData.datasets[1].data.push(movingAverage);
        if (chartData.labels.length > windowSize){
            chartData.labels = chartData.labels.slice(chartData.labels.length - windowSize);
            chartData.datasets[0].data = chartData.datasets[0].data.slice(chartData.datasets[0].data.length - windowSize);
            chartData.datasets[1].data = chartData.datasets[1].data.slice(chartData.datasets[1].data.length - windowSize);
        }
        this.setState({
            trades, data: chartData, totalVolume
        })
    }

    render = () => {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Chart</h4>
                        <h4>Total Volume: <span className="badge badge-warning">{this.state.totalVolume}</span></h4>
                        <h4># of trades: <span className="badge badge-info">{this.state.trades.length}</span></h4>
                    </div>
                    <div className="card-body">
                        <Line redraw
                              width={640}
                              height={480}
                              options={{maintainAspectRatio: false, animation: false}}
                            data={this.state.data}></Line>
                    </div>
                </div>
                <p></p>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Trades</h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-responsive table-hover">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Volume</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.trades.map( (trade,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{trade.price}</td>
                                            <td>{trade.quantity}</td>
                                            <td>{trade.volume}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}