import * as React from 'react';
import * as d3 from 'd3';

import ComponentWrapper from './componentwrapper';

import "./grid.css"


export const YGrid = ComponentWrapper(function() {
    const axis = d3
        .axisRight(null)
        .tickFormat(d => null)
        .scale(this.props.yScale)
        .tickSizeOuter(0)
        .tickSizeInner(this.props.width);

        d3
        .select(this.refs.anchor)
        .classed("y-grid", true)
        .call(axis);
});
