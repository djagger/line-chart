import * as React from 'react';
import * as d3 from 'd3';
import memoize from 'memoize-one';

import Dots from './Dots';
import { YAxis, XAxis } from './Axes';
import { YGrid } from './YGrid';

import { ChartData, ChartDataRow } from './types/ChartData';
import { XScale, YScale } from './types/Scales';
import { CommonChartProps } from './types/CommonChartProps';

import './Linechart.css';


type LineChartMargins = {
    top, right, bottom, left: number;
}

type Extent = (number | { valueOf(): number; })[];

interface LineChartProps extends CommonChartProps {
    data: ChartData;
    zoomType: string;
    zoomTransform: Function;
}

export default class LineChart extends React.Component<LineChartProps, {}> {
    private yScale: YScale;
    private xScale: XScale;
    private line: Function;
    private yDefaultRange: [number, number] = [0, 600];

    private margin: LineChartMargins;
    private h: number;
    private w: number;

    constructor(props) {
        super(props);

        this.updateD3(props);
    };

    componentWillUpdate(nextProps) {
        this.updateD3(nextProps);
    }

    // Wrap it on memoize for not to call the function
    // unless the desired props parameters are changed.
    updateD3 = memoize((props) => {
        const { width, height,
            yAxisFrom, yAxisTo,
            xAxisFrom, xAxisTo,
            data, zoomTransform, zoomType } = props;

        this.margin = {top: 5, right: 50, bottom: 20, left: 50};
        this.w = width - this.margin.left - this.margin.right;
        this.h = height - this.margin.top - this.margin.bottom;

        // Y scale validation
        let yFrom = this.yDefaultRange[0];
        if (!isNaN(yAxisFrom)) {
            yFrom = yAxisFrom
        }

        let yTo = this.yDefaultRange[1];
        if (!isNaN(yAxisTo)) {
            yTo = yAxisTo
        }

        this.yScale = d3.scaleLinear()
            .domain([yFrom, yTo])
            .range([this.h, 0]);


        const xScaleDomain = d3.extent(data, d => d['step']) as Extent;

        // X scale validation
        let xFrom = xScaleDomain[0];
        if (!isNaN(xAxisFrom)) {
            xFrom = xAxisFrom
        }

        let xTo = xScaleDomain[1];
        if (!isNaN(xAxisTo)) {
            xTo = xAxisTo
        }

        this.xScale = d3.scaleLinear()
            .domain([xFrom, xTo])
            .range([0, this.w]);

        this.line = d3.line<ChartDataRow>()
            .x(d => this.xScale(d.step))
            .y(d => this.yScale(d.count))
            .curve(d3.curveCardinal);

        if (zoomTransform && zoomType === "detail") {
            this.xScale.domain(zoomTransform.rescaleX(this.xScale).domain());
            this.yScale.domain(zoomTransform.rescaleY(this.yScale).domain());
        }
    });

    get transform() {
        return `translate(${this.margin.left}, ${this.margin.top})`;
    }

    render() {
        const { data, isShowGrid } = this.props;

        return (
            <g transform={this.transform}>
                <path className="line shadow" d={this.line(data)} strokeLinecap="round"/>
                <Dots data={data} x={this.xScale} y={this.yScale}/>

                {
                    isShowGrid && <>
                        <YAxis yScale={this.yScale}/>
                        <XAxis xScale={this.xScale} transform={`translate(0,${this.h})`}/>
                        <YGrid yScale={this.yScale} width={this.w}/>
                    </>
                }
            </g>
        );
    }
}
