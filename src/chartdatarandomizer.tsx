import * as React from 'react';

import ChartDataGenerator from './chartdatagenerator';


interface Props {
    dotsAmount: number;
    handleChartDataUpdate: Function;
}

interface State {
    dotsAmount: number | string;
}

export default class ChartDataRandomizer extends React.Component<Props, State> {
    private generator: any;

    constructor(props: Props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFromChange = this.handleFromChange.bind(this);

        this.generator = new ChartDataGenerator();

        this.state = {
            dotsAmount: this.props.dotsAmount
        };
    }

    render() {
        return (
            <div className="margin-bottom">
                <input
                    type="text"
                    placeholder="dots amount"
                    value={this.state.dotsAmount}
                    onChange={this.handleFromChange}
                />
                <button onClick={this.handleSubmit}>Generate random data</button>
            </div>
        );
    }

    handleFromChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({dotsAmount: e.target.value});
    }

    handleSubmit() {
        this.props.handleChartDataUpdate(this.generator.do(this.state.dotsAmount));
    }
}
