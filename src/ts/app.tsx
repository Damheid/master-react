import "core-js";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { WidgetTool } from "./components/widget-tool";
import { Widget } from "./models/widget";

import "bootstrap-loader";
import "../scss/styles.scss";

const addWidget = (widget: Widget) => {
    return fetch("http://localhost:5000/widgets", {
        method: "Post",
        body: JSON.stringify(widget),
        headers: new Headers({
            "Content-type": "application/json",
        }),
    })
    .then(() => loadWidgets());
};

const loadWidgets = () => {
    fetch("http://localhost:5000/widgets")
        .then((res: Response) => res.json())
        .then((data: any) =>
            (data as Widget[]).map((w: Widget) =>
                (Object as any).assign(new Widget(), w)))
        .then((widgets: Widget[]) => {
            ReactDOM.render(
                <WidgetTool widgets={widgets} addWidget={addWidget} />,
                document.querySelector("main"));
        });
};

loadWidgets();
