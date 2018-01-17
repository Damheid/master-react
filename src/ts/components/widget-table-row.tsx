import * as React from "react";

import { Widget } from "../models/widget";

interface WidgtTableRowProps {
    widget: Widget;
}

export const WidgetTableRow: React.StatelessComponent<WidgtTableRowProps> =
    (props: WidgtTableRowProps) => <tr>
        <th>{props.widget.name}</th>
        <th>{props.widget.color}</th>
        <th>{props.widget.size}</th>
        <th>{props.widget.quantity}</th>
        <th>{props.widget.price}</th>
    </tr>;

// WidgetTableRow.propTypes = {
//     widget: React.PropTypes.instanceOf(Widget),
// };
