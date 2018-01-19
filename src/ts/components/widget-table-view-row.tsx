import * as React from "react";

import { Widget } from "../models/widget";

interface WidgtTableViewRowProps {
    widget: Widget;
    editWidget: (widgetId: number) => void;
    deleteWidget: (widgetId: number) => void;
}

export const WidgetTableViewRow: React.StatelessComponent<WidgtTableViewRowProps> =
    (props: WidgtTableViewRowProps) => <tr>
        <th>{props.widget.name}</th>
        <th>{props.widget.color}</th>
        <th>{props.widget.size}</th>
        <th>{props.widget.quantity}</th>
        <th>{props.widget.price}</th>
        <th>
            <button type="button" onClick={() => props.editWidget(props.widget.id)}>Edit</button>
            <button type="button" onClick={() => props.deleteWidget(props.widget.id)}>Delete</button>
        </th>
    </tr>;

// WidgetTableRow.propTypes = {
//     widget: React.PropTypes.instanceOf(Widget),
// };
