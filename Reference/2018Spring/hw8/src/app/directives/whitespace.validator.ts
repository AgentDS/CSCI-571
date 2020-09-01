import { ValidatorFn, AbstractControl } from "@angular/forms";

export function whiteSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        let isWhitespace = (control.value || "").trim().length === 0;
        return isWhitespace? {'whitespace': 'input only contains whitespace'} : null;
    };
}