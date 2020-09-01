import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";
import { whiteSpaceValidator } from "./whitespace.validator";

@Directive({
  selector: "[noWhitespace]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: WhitespaceDirective, multi: true }
  ]
})
export class WhitespaceDirective implements Validator {
  private validator = whiteSpaceValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    return this.validator(control);
  }
}
