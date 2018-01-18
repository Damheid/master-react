import * as React from "react";

import { FormState } from "../models/form-state";
import { FormControlEvent } from "../models/from-control-event";
import { Widget } from "../models/widget";
import { BaseForm } from "./base-form";
import { WidgetSizeControl } from "./widget-size-control";

interface WidgetFormProps {
    addWidget: (widget: Widget) => void;
}

interface WidgetFormState extends FormState {
    widgetName?: string;
    widgetDescription?: string;
    widgetColor?: string;
    widgetSize?: string;
    widgetQuantity?: number;
    widgetPrice?: number;
}

export class WidgetForm extends BaseForm<WidgetFormProps, WidgetFormState> {
    constructor(props: WidgetFormProps) {
        super(props);

        this.state = this.getInitialFormState();
    }

    public render() {
        return <form action="">
            <div>
                <label htmlFor="widget-name-control">Name:</label>
                <input id="widget-name-control" name="widgetName" type="text"
                    value={this.state.widgetName} onChange={this.onChange} />
            </div>
            <div>
                <label htmlFor="widget-description-control">Description:</label>
                <textarea id="widget-description-control" name="widgetDescription"
                    value={this.state.widgetDescription} onChange={this.onChange} />
            </div>
            <div>
                <label htmlFor="widget-color-control">Color:</label>
                <input id="widget-color-control" name="widgetColor" type="color"
                    value={this.state.widgetColor} onChange={this.onChange} />
            </div>
            <div>
                <label htmlFor="widget-size-control">Size:</label>
                <WidgetSizeControl id="widget-size-control" name="widgetSize"
                    value={this.state.widgetSize} onChange={this.onChange} />
            </div>
            <div>
                <label htmlFor="widget-quantity-control">Quantity:</label>
                <input id="widget-quantity-control" name="widgetQuantity" type="number"
                    value={this.state.widgetQuantity.toString()} onChange={this.onChange} />
            </div>
            <div>
                <label htmlFor="widget-price-control">Price:</label>
                <input id="widget-price-control" name="widgetPrice" type="number"
                    value={this.state.widgetPrice.toString()} onChange={this.onChange} />
            </div>
            <button type="button" onClick={this.addWidget}>Add Widget</button>
        </form>;
    }

    private getInitialFormState() {
        return {
            widgetName: "",
            widgetDescription: "",
            widgetColor: "#ffffff",
            widgetSize: "",
            widgetQuantity: 0,
            widgetPrice: 0,
        };
    }

    private addWidget = () => {
        const newWidget = new Widget();
        newWidget.name = this.state.widgetName;
        newWidget.description = this.state.widgetDescription;
        newWidget.color = this.state.widgetColor;
        newWidget.size = this.state.widgetSize;
        newWidget.quantity = this.state.widgetQuantity;
        newWidget.price = this.state.widgetPrice;

        this.props.addWidget(newWidget);

        this.setState(this.getInitialFormState());
    }
}
