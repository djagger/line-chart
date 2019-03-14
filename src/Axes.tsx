import * as d3 from "d3";

import ComponentWrapper from './ComponentWrapper';


export const YAxis = ComponentWrapper(function() {
    const axis = d3
        .axisLeft(null)
        .tickFormat(d => d as string)
        .scale(this.props.yScale);

        d3.select(this.refs.anchor)
        .classed("yAxis", true)
        .transition()
        .call(axis);
});

export const XAxis = ComponentWrapper(function() {
    const axis = d3
        .axisBottom(null)
        .scale(this.props.xScale)
        .ticks(5);

        d3.select(this.refs.anchor)
        .classed("xAxis", true)
        .transition()
        .call(axis);
});
