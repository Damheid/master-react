import * as React from "react";

export class WidgetTool extends React.Component<{}, {}> {
    public render() {
        return <div>
            <h1>Widget Tool!</h1>
            <table>
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
                    <tr>
                        <td>Widget 1</td>
                        <td>#ffffff</td>
                        <td>Small</td>
                        <td>2</td>
                        <td>1.23</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}
