import * as React from "react";

import { Widget } from "../models/widget";
import { WidgetForm } from "./widget-form";
import { WidgetTable } from "./widget-table";

interface WidgetToolProps {
    widgets: Widget[];
    addWidget: (widget: Widget) => void;
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
            <WidgetTable {...this.props} />
            <h2>Create Widget</h2>
            <WidgetForm addWidget={this.props.addWidget} />
        </div>;
    }
}
