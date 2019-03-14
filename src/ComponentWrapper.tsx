import * as React from "react";

import { XScale, YScale } from "./types/Scales";


interface WrapperProps {
    transform?: string
    xScale?: XScale
    yScale?: YScale
    width?: number
}

export default function ComponentWrapper(d3render) {
    return class Wrapper extends React.Component<WrapperProps> {
        componentDidMount() {
            d3render.call(this);
        }
        componentDidUpdate() {
            d3render.call(this);
        }

        render() {
            const transform = this.props.transform || "";
            return <g transform={transform} ref="anchor" />;
        }
    };
}
