import * as React from "react";

import { Widget } from "../models/widget";

interface WidgetToolProps {
    widgets: Widget[];
}

export class WidgetTool extends React.Component<WidgetToolProps, {}> {
    // public static propTypes = {
    //     widgets: React.PropTypes.arrayOf(
    //         React.PropTypes.instanceOf(Widget),
    //     ),
    // };

    public static defaultProps = {
        widgets: [] as Widget[],
    };

    private wrapperStyle: any;

    constructor(props: WidgetToolProps) {
        super(props);

        this.wrapperStyle = {
            border: "1px solid lightgray",
            margin: "10px",
            padding: "5px",
        };
    }

    public render() {
        return <div style={this.wrapperStyle}>
            <h1>Widget Tool</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.widgets.map(
                        (widget: Widget) => <tr key={widget.id}>
                            <th>{widget.name}</th>
                            <th>{widget.color}</th>
                            <th>{widget.size}</th>
                            <th>{widget.quantity}</th>
                            <th>{widget.price}</th>
                        </tr>,
                    )}
                </tbody>
            </table>
        </div>;
    }
}
