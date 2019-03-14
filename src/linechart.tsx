import * as React from 'react';
import * as d3 from 'd3';

import Dots from './dots';
import { YAxis, XAxis } from './axis';
import { YGrid } from './grid';

import { ChartData, ChartDataRow } from './types/chartdata';
import { XScale, YScale } from "./types/scales";
import { CommonChartProps } from "./types/commonchartprops";

import './linechart.css';


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

    updateD3(props) {
        const { width, height,
            yAxisFrom, yAxisTo,
            xAxisFrom, xAxisTo,
            data, zoomTransform, zoomType } = props;

        this.margin = {top: 5, right: 50, bottom: 20, left: 50};
        this.w = width - this.margin.left - this.margin.right;
        this.h = height - this.margin.top - this.margin.bottom;

        this.yScale = d3.scaleLinear()
            .domain([yAxisFrom || this.yDefaultRange[0], yAxisTo || this.yDefaultRange[1]])
            .range([this.h, 0]);

        const xScaleDomain = d3.extent(data, d => d['step']) as Extent;

        this.xScale = d3.scaleLinear()
            .domain([xAxisFrom || xScaleDomain[0], xAxisTo || xScaleDomain[1]])
            .range([0, this.w]);

        this.line = d3.line<ChartDataRow>()
            .x(d => this.xScale(d.step))
            .y(d => this.yScale(d.count))
            .curve(d3.curveCardinal);

        if (zoomTransform && zoomType === "detail") {
            this.xScale.domain(zoomTransform.rescaleX(this.xScale).domain());
            this.yScale.domain(zoomTransform.rescaleY(this.yScale).domain());
        }
    }

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
