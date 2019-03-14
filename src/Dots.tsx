import * as React from 'react';

import { XScale, YScale } from './types/Scales';
import { ChartDataRow } from './types/ChartData';

import "./Dots.css"


interface DotsProps {
    data: any
    x: XScale
    y: YScale
}

const Dots = (props: DotsProps) => {
    const circles = props.data.map((d: ChartDataRow, i: number) => {
        return (
            <circle
                className="dot"
                key={i}
                cx={props.x(d.step)}
                cy= {props.y(d.count)}
                r="2"
            />
        );
    });

    return <g>{circles}</g>
};

export default Dots;
