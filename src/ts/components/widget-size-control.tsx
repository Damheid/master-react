import * as React from "react";

import { FormControlEvent } from "../models/from-control-event";

interface WidgetSizeControlProps {
    id?: string;
    name: string;
    value: string;
    onChange: (e: FormControlEvent) => void;
}

export class WidgetSizeControl extends React.Component<WidgetSizeControlProps, {}> {
    private sizes: Map<string, string>;

    constructor(props: WidgetSizeControlProps) {
        super(props);

        this.sizes = new Map<string, string>();
        this.sizes.set("tiny", "Tiny");
        this.sizes.set("small", "Small");
        this.sizes.set("medium", "Medium");
        this.sizes.set("large", "Large");
        this.sizes.set("huge", "Huge");
    }

    public render() {
        return <select id={this.props.id} name={this.props.name}
            value={this.props.value} onChange={this.props.onChange}>
            <option value="">Select One...</option>
            {Array.from(this.sizes.entries()).map(([value, label]) =>
                <option key={value} value={value}>{label}</option>,
            )}
        </select>;
    }
}
