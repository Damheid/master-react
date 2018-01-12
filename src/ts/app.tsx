import "core-js";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { WidgetTool } from "./components/widget-tool";
import { Widget } from "./models/widget";

import "bootstrap-loader";
import "../scss/styles.scss";

fetch("http://localhost:5000/widgets")
    .then((res: Response) => res.json())
    .then((data: any) =>
        (data as Widget[]).map((w: Widget) =>
            (Object as any).assign(new Widget(), w)))
    .then((widgets: Widget[]) => {
        ReactDOM.render(<WidgetTool widgets={widgets} />, document.querySelector("main"));
    });
