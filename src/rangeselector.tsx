import * as React from 'react';


interface Props {
    label?: string
    from?, to?: number;
    fromPlaceholder?, toPlaceholder?: string;
    handleSelect: Function;
}

interface State {
    from, to: string | number;
}

export default class RangeSelector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            from: this.props.from,
            to: this.props.to
        };
    }

    render() {
        const { fromPlaceholder, toPlaceholder, label } = this.props;

        return (
            <div className="range margin-bottom">
                <input
                    className="range-from"
                    type="text"
                    placeholder={ fromPlaceholder ? fromPlaceholder : "from" }
                    onChange={this.handleFromChange}
                />
                <input
                    className="range-to"
                    type="text"
                    placeholder={ toPlaceholder ? toPlaceholder : "to" }
                    onChange={this.handleToChange}
                />
                <button onClick={this.handleSubmit}>Resize {label}</button>
            </div>
        );
    }

    handleFromChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({from: e.target.value});
    }

    handleToChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({to: e.target.value});
    }

    handleSubmit() {
        this.props.handleSelect(this.state.from, this.state.to);
    }
}
