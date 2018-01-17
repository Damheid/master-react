import * as React from "react";

export interface FormControlEvent extends React.FormEvent<any> {
    currentTarget: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
}
