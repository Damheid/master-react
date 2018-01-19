import * as React from "react";

import { WidgetTableCols } from "../enums/widget-table-cols";
import { FormState } from "../models/form-state";
import { FormControlEvent } from "../models/from-control-event";
import { Widget } from "../models/widget";
import { BaseForm } from "./base-form";
import { WidgetTableEditRow } from "./widget-table-edit-row";
import { WidgetTableFilter } from "./widget-table-filter";
import { WidgetTableViewRow } from "./widget-table-view-row";

interface WidgetTableProps {
    widgets: Widget[];
    saveWidget: (widget: Widget) => Promise<Widget>;
    deleteWidget: (widgetId: number) => Promise<Widget>;
}

interface WidgetTableState extends FormState {
    filterColumn?: WidgetTableCols;
    filterValue?: string;
    sortCol?: WidgetTableCols;
    editWidgetId?: number;
}

export class WidgetTable extends BaseForm<WidgetTableProps, WidgetTableState> {
    // public static propTypes = {
    //     widgets: React.PropTypes.arrayOf(
    //         React.PropTypes.instanceOf(Widget),
    //     ),
    // };

    public static defaultProps = {
        widgets: [] as Widget[],
    };

    constructor(props: WidgetTableProps) {
        super(props);

        this.state = {
            filterColumn: WidgetTableCols.None,
            filterValue: "",
            sortCol: WidgetTableCols.None,
            editWidgetId: -1,
        };
    }

    public render() {
        return <div>
            <WidgetTableFilter
                filterColumn={this.state.filterColumn}
                filterValue={this.state.filterValue}
                onChange={this.onChange}
            />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th onClick={() => this.onSort(WidgetTableCols.Name)}
                            style={this.activeSort(WidgetTableCols.Name)}>Name</th>
                        <th onClick={() => this.onSort(WidgetTableCols.Color)}
                            style={this.activeSort(WidgetTableCols.Color)}>Color</th>
                        <th onClick={() => this.onSort(WidgetTableCols.Size)}
                            style={this.activeSort(WidgetTableCols.Size)}>Size</th>
                        <th onClick={() => this.onSort(WidgetTableCols.Quantity)}
                            style={this.activeSort(WidgetTableCols.Quantity)}>Quantity</th>
                        <th onClick={() => this.onSort(WidgetTableCols.Price)}
                            style={this.activeSort(WidgetTableCols.Price)}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.widgets.filter(this.filterFn).sort(this.getSortFn()).map(
                        (widget: Widget) => this.state.editWidgetId === widget.id
                            ? <WidgetTableEditRow key={widget.id} widget={widget}
                                saveWidget={this.saveWidget}
                                cancelWidget={this.cancelWidget} />
                            : <WidgetTableViewRow key={widget.id} widget={widget}
                                editWidget={this.editWidget}
                                deleteWidget={this.deleteWidget} />,
                    )}
                </tbody>
            </table>
        </div>;
    }

    private onSort(sortCol: WidgetTableCols): void {
        this.setState({ sortCol });
    }

    private activeSort(sortCol: WidgetTableCols): any {
        return { color: this.state.sortCol === sortCol ? "blue" : "black" };
    }

    private getSortFn(): (a: any, b: any) => number {
        if (this.state.sortCol === WidgetTableCols.None) {
            return (a: any, b: any) => 0;
        }

        const fName: string = WidgetTableCols[this.state.sortCol].toLowerCase();

        return (a: any, b: any): number => {
            if (a[fName] < b[fName]) { return -1; }
            if (a[fName] > b[fName]) { return 1; }
            return 0;
        };
    }

    private filterFn: (widget: Widget) => boolean = (widget: Widget) => {
        if (this.state.filterColumn === WidgetTableCols.None || !this.state.filterValue) {
            return true;
        }

        return widget[WidgetTableCols[this.state.filterColumn].toLowerCase()]
            .toString()
            .toLowerCase()
            .includes(this.state.filterValue.toLowerCase());
    }

    private editWidget = (widgetId: number) => {
        this.setState({
            editWidgetId: widgetId,
        });
    }

    private cancelWidget = () => {
        this.setState({
            editWidgetId: -1,
        });
    }

    private deleteWidget = (widgetId: number) => {
        this.props.deleteWidget(widgetId)
            .then(() => this.setState({
                editWidgetId: -1,
            }));
    }

    private saveWidget = (widget: Widget) => {
        this.props.saveWidget(widget)
            .then(() => this.setState({
                editWidgetId: -1,
            }));
    }
}
