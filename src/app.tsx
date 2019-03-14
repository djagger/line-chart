import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ChartDataGenerator from './chartdatagenerator';
import ZoomChartWrapper from './zoomchartwrapper';
import ChartDataRandomizer from './chartdatarandomizer';
import RangeSelector from './rangeselector';
import Button from './button';

import { CommonChartProps } from './types/commonchartprops';
import { ChartData } from './types/chartdata';

import './app.css';


interface Props extends CommonChartProps {
    dotsAmount: number;
}

interface State extends CommonChartProps {
    data: ChartData;
}

class App extends React.Component<Props, State> {
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

        this.handleAxisYResize  = this.handleAxisYResize.bind(this);
        this.handleAxisXResize  = this.handleAxisXResize.bind(this);

        this.handleGenerateData  = this.handleGenerateData.bind(this);
        this.handleResize  = this.handleResize.bind(this);

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
        const { width, height, isShowGrid } = this.state;

        return (
            <div>
                <ZoomChartWrapper
                    {...this.state}
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

    handleAxisYResize(from: number, to: number) {
        this.setState({yAxisFrom: from, yAxisTo: to})
    }

    handleAxisXResize(from: number, to: number) {
        this.setState({xAxisFrom: from, xAxisTo: to})
    }

    handleGenerateData(data: ChartData) {
        this.setState({data: data})
    }

    handleResize(width: number, height: number) {
        this.setState({width: width, height: height})
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));
