import "core-js";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { WidgetTool } from "./components/widget-tool";
import { Widget } from "./models/widget";

import "bootstrap-loader";
import "../scss/styles.scss";

const baseUrl: string = "http://localhost:5000";
const getWidgetCollectionURI = () => `${baseUrl}/widgets`;
const getWidgetElementURI = (widgetId: number) => `${baseUrl}/widgets/${widgetId}`;

const deleteWidget: (widgetId: number) => Promise<Widget> = (widgetId: number) => {
    let deletedWidget: Widget = null;

    return getWidget(widgetId)
        .then((widget: any) => {
            deletedWidget = new Widget();
            Object.assign(deletedWidget, widget);
            return fetch(getWidgetElementURI(widgetId), {
                method: "DELETE",
            });
        })
        .then(() => refreshWidgetTool())
        .then(() => deletedWidget);
};

const saveWidget = (widget: Widget) => {
    let url: string;
    let method: string;
    let savedWidget: Widget;

    if (widget.id) {
        url = getWidgetElementURI(widget.id);
        method = "PUT";
    } else {
        url = getWidgetCollectionURI();
        method = "POST";
    }

    return fetch(url, {
        method,
        body: JSON.stringify(widget),
        headers: new Headers({
            "Content-Type": "application/json",
        }),
    })
        .then((w) => {
            savedWidget = new Widget();
            Object.assign(savedWidget, w);
            return refreshWidgetTool();
        })
        .then(() => savedWidget);
};

const getWidget: (widgetId: number) => Promise<Widget> = (widgetId: number) => {
    return fetch(getWidgetElementURI(widgetId))
        .then((res: Response) => res.json())
        .then((w: any) => {
            const widget = new Widget();
            return Object.assign(widget, w);
        });
};

const getWidgets: () => Promise<Widget[]> = () => {
    return fetch(getWidgetCollectionURI())
        .then((res: Response) => res.json())
        .then((data: any) =>
            (data as Widget[]).map((w: Widget) =>
                (Object as any).assign(new Widget(), w)))
};

const refreshWidgetTool: () => Promise<any> = () => {
    return getWidgets().then((widgets: Widget[]) =>
        ReactDOM.render(
            <WidgetTool
                widgets={widgets}
                saveWidget={saveWidget}
                deleteWidget={deleteWidget}
            />,
            document.querySelector("main"),
        ));
};

refreshWidgetTool();
