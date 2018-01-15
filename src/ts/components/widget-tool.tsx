import * as React from "react";

import { Widget } from "../models/widget";

enum WidgetTableCols {
    None, Name, Color, Size, Quantity, Price,
}

const widgetTableCols = new Map<WidgetTableCols, string>();
widgetTableCols.set(WidgetTableCols.None, "Select One...");
widgetTableCols.set(WidgetTableCols.Name, "Name");
widgetTableCols.set(WidgetTableCols.Color, "Color");
widgetTableCols.set(WidgetTableCols.Size, "Size");
widgetTableCols.set(WidgetTableCols.Quantity, "Quantity");
widgetTableCols.set(WidgetTableCols.Price, "Price");

interface FormControlEvent extends React.FormEvent<any> {
    currentTarget: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
}

interface WidgetToolProps {
    widgets: Widget[];
}

interface WidgetToolState {
    filterColumn?: WidgetTableCols;
    filterValue?: string;
    sortCol?: WidgetTableCols;
}

export class WidgetTool extends React.Component<WidgetToolProps, WidgetToolState> {
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

        this.state = {
            filterColumn: WidgetTableCols.None,
            filterValue: "",
            sortCol: WidgetTableCols.None,
        };

        this.onChange = this.onChange.bind(this);
    }

    public render() {
        return <div style={this.wrapperStyle}>
            <h1>Widget Tool</h1>
            <div>
                <label>Filter Column</label>
                <select name="filterColumn"
                    id="filter-column"
                    value={this.state.filterColumn.toString()}
                    onChange={this.onChange}>
                    {Array.from(widgetTableCols.keys()).map((colKey: WidgetTableCols) =>
                        <option key={colKey} value={colKey.toString()}>{widgetTableCols.get(colKey)}</option>,
                    )}
                </select>
                <input type="text"
                    id="filter-value"
                    name="filterValue"
                    value={this.state.filterValue}
                    onChange={this.onChange}
                />
            </div>
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
        .includes(this.state.filterValue);
    }

    private onChange(e: FormControlEvent) {
        // tslint:disable-next-line:no-object-literal-type-assertion
        this.setState({ [e.currentTarget.name]: e.currentTarget.value } as WidgetToolState);
    }
}
