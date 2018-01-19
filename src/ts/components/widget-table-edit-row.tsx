import * as React from "react";

import { FormState } from "../models/form-state";
import { FormControlEvent } from "../models/from-control-event";
import { Widget } from "../models/widget";
import { BaseForm } from "./base-form";
import { WidgetSizeControl } from "./widget-size-control";

interface WidgetTableEditRowProps {
    widget: Widget;
    saveWidget: (widget: Widget) => void;
    cancelWidget: () => void;
}

interface WidgetTableEditRowState extends FormState {
    widgetName?: string;
    widgetColor?: string;
    widgetSize?: string;
    widgetQuantity?: number;
    widgetPrice?: number;
}

export class WidgetTableEditRow extends BaseForm<WidgetTableEditRowProps, WidgetTableEditRowState> {
    public static defaultProps = {
        // tslint:disable-next-line:no-object-literal-type-assertion
        widget: {} as Widget,
    };

    constructor(props: WidgetTableEditRowProps) {
        super(props);

        this.state = {
            widgetName: props.widget.name,
            widgetColor: props.widget.color,
            widgetSize: props.widget.size,
            widgetQuantity: props.widget.quantity,
            widgetPrice: props.widget.price,
        };
    }

    public render() {
        return <tr>
            <td><input type="text" name="widgetName"
                value={this.state.widgetName} onChange={this.onChange} />
            </td>
            <td><input type="color" name="widgetColor"
                value={this.state.widgetColor} onChange={this.onChange} />
            </td>
            <td><WidgetSizeControl name="widgetSize"
                value={this.state.widgetSize} onChange={this.onChange} />
            </td>
            <td><input type="number" name="widgetQuantity"
                value={this.state.widgetQuantity} onChange={this.onChange} />
            </td>
            <td><input type="number" name="widgetPrice"
                value={this.state.widgetPrice} onChange={this.onChange} />
            </td>
            <th>
                <button type="button" onClick={() => this.saveWidget()}>Save</button>
                <button type="button" onClick={() => this.props.cancelWidget()}>Cancel</button>
            </th>
        </tr>;
    }

    /**
     * saveWidget
     */
    public saveWidget = () => {
        const widget = new Widget();
        widget.id = this.props.widget.id;
        widget.name = this.state.widgetName;
        widget.description = this.props.widget.description;
        widget.color = this.state.widgetColor;
        widget.size = this.state.widgetSize;
        widget.quantity = this.state.widgetQuantity;
        widget.price = this.state.widgetPrice;

        this.props.saveWidget(widget);
    }
}
