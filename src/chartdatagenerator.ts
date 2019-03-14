import * as d3 from 'd3';

import { ChartData } from './types/chartdata';


export default class ChartDataGenerator {
    private readonly randomNormal: Function;

    constructor(mu: number = 300, sigma: number = 100) {
        // Here is normal (Gaussian) distribution
        this.randomNormal = d3.randomNormal(mu, sigma);
    }

    do(range: number = 30): ChartData {
        return d3.range(range).map(i => {
                return {
                    step: i,
                    count: this.randomNormal()
                };
            })
    }
}
