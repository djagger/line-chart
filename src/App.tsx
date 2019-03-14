import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ChartDataGenerator from './ChartDataGenerator';
import ZoomChartWrapper from './ZoomChartWrapper';
import ChartDataRandomizer from './ChartDataRandomizer';
import RangeSelector from './RangeSelector';
import Button from './Button';

import { CommonChartProps } from './types/CommonChartProps';
import { ChartData } from './types/ChartData';

import './App.css';


interface Props extends CommonChartProps {
    dotsAmount: number;
}

interface State extends CommonChartProps {
    data: ChartData;
}

export default class App extends React.Component<Props, State> {
    static defaultProps = {
        // Chart size range
        width: 600, height: 300,
        // Y axis range
        yAxisFrom: 0, yAxisTo: 600,

        dotsAmount: 30,
        isShowGrid: true
    };

    constructor(props: Props) {
        super(props);

        const generator = new ChartDataGenerator();

        this.state = {
            width: this.props.width,
            height: this.props.height,

            yAxisFrom: this.props.yAxisFrom,
            yAxisTo: this.props.yAxisTo,

            xAxisFrom: this.props.xAxisFrom,
            xAxisTo: this.props.xAxisTo,

            isShowGrid: this.props.isShowGrid,
            data: generator.do(this.props.dotsAmount),
        };
    };

    render() {
        const { width, height,
            yAxisFrom, yAxisTo,
            xAxisFrom, xAxisTo,
            isShowGrid,
            data} = this.state;

        // Not using spread operator in ZoomChartWrapper for component logic clarity.
        return (
            <div>
                <ZoomChartWrapper
                    width={width} height={height}
                    yAxisFrom={yAxisFrom} yAxisTo={yAxisTo}
                    xAxisFrom={xAxisFrom} xAxisTo={xAxisTo}
                    isShowGrid={isShowGrid}
                    data={data}
                />

                <p>Here is options:</p>

                <ChartDataRandomizer
                    dotsAmount={this.props.dotsAmount}
                    handleChartDataUpdate={this.handleGenerateData}
                />

                <RangeSelector label={"axis y"} handleSelect={this.handleAxisYResize}/>
                <RangeSelector label={"axis x"} handleSelect={this.handleAxisXResize}/>

                <RangeSelector
                    from={width} to={height}
                    fromPlaceholder={"width"} toPlaceholder={"height"}
                    handleSelect={this.handleResize}
                />

                <Button
                    className="margin-bottom"
                    onClick={e => this.setState({isShowGrid: !this.state.isShowGrid})}>
                    {isShowGrid ? 'Hide' : 'Show'} grid & axes
                </Button>
            </div>
        )
    }

    handleGenerateData = (data: ChartData) => {
        this.setState({data: data})
    }

    handleAxisYResize = (from: number, to: number) => {
        this.setState({yAxisFrom: from, yAxisTo: to})
    }

    handleAxisXResize = (from: number, to: number) => {
        this.setState({xAxisFrom: from, xAxisTo: to})
    }

    handleResize = (width: number, height: number) => {
        this.setState({width: width, height: height})
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
