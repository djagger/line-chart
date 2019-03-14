import * as React from 'react';
import * as d3 from 'd3';

import LineChart from './Linechart';

import { ChartData } from './types/ChartData';
import { CommonChartProps } from './types/CommonChartProps';


interface ZoomChartWrapperProps extends CommonChartProps {
    data: ChartData;
}

interface ZoomChartWrapperState {
    data: ChartData;
    zoomTransform: Function;
}

export default class ZoomChartWrapper extends React.Component<ZoomChartWrapperProps, ZoomChartWrapperState> {
    private readonly zoom: any;
    private zoomer: SVGSVGElement;

    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            zoomTransform: null
        };

        this.zoom = d3.zoom()
            .scaleExtent([-5, 5])
            .translateExtent([[-100, -100], [props.width+100, props.height+100]])
            .extent([[-100, -100], [props.width+100, props.height+100]])
            .on("zoom", this.zoomed.bind(this))
    }

    componentDidMount() {
        d3.select(this.zoomer).call(this.zoom)
    }

    componentDidUpdate() {
        d3.select(this.zoomer).call(this.zoom)
    }

    render() {
        const { zoomTransform } = this.state;
        const { width, height } = this.props;

        return (
            <svg ref={(el) => { this.zoomer = el; }} width={width} height={height}>
                <LineChart
                    zoomType="detail"
                    zoomTransform={zoomTransform}
                    {...this.props}
                />
            </svg>
        )
    }

    zoomed() {
        this.setState({zoomTransform: d3.event.transform});
    }
}
