import * as React from "react";

import { FormState } from "../models/form-state";
import { FormControlEvent } from "../models/from-control-event";

export class BaseForm<P, S extends FormState> extends React.Component<P, S> {
    protected onChange = (e: FormControlEvent) => {
        let value: string | number;

        if (e.currentTarget.type == "number") {
            value = parseFloat(e.currentTarget.value);
        } else {
            value = e.currentTarget.value;
        }

        // tslint:disable-next-line:no-object-literal-type-assertion
        this.setState({
            [e.currentTarget.name]: value,
        } as S);
    }
}
