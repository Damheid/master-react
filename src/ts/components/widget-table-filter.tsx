import * as React from "react";

import { WidgetTableCols } from "../enums/widget-table-cols";
import { FormControlEvent } from "../models/from-control-event";

interface WidgetTableFilterProps {
    filterColumn: WidgetTableCols;
    filterValue: string;
    onChange: (e: FormControlEvent) => void;
}

export class WidgetTableFilter extends React.Component<WidgetTableFilterProps, {}> {
    private widgetTableCols: Map<WidgetTableCols, string>;

    constructor(props: WidgetTableFilterProps) {
        super(props);

        this.widgetTableCols = new Map<WidgetTableCols, string>();

        this.widgetTableCols.set(WidgetTableCols.None, "Select One...");
        this.widgetTableCols.set(WidgetTableCols.Name, "Name");
        this.widgetTableCols.set(WidgetTableCols.Color, "Color");
        this.widgetTableCols.set(WidgetTableCols.Size, "Size");
        this.widgetTableCols.set(WidgetTableCols.Quantity, "Quantity");
        this.widgetTableCols.set(WidgetTableCols.Price, "Price");
    }

    public render(): React.ReactElement<null> {
        return <div>
            <label>Filter Column</label>
            <select name="filterColumn"
                id="filter-column"
                value={this.props.filterColumn.toString()}
                onChange={this.props.onChange}>
                {Array.from(this.widgetTableCols.keys()).map((colKey: WidgetTableCols) =>
                    <option key={colKey} value={colKey.toString()}>
                        {this.widgetTableCols.get(colKey)}
                    </option>,
                )}
            </select>
            <input type="text"
                id="filter-value"
                name="filterValue"
                value={this.props.filterValue}
                onChange={this.props.onChange}
            />
        </div>;
    }

}
