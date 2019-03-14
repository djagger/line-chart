import * as React from 'react';


interface ButtonProps extends React.HTMLAttributes<HTMLElement> {}

export default class Button extends React.Component<ButtonProps, {}> {
    render() {
        return (
            <button
                className="button"
                {...this.props}
            >
                {this.props.children}
            </button>
        );
    }
}