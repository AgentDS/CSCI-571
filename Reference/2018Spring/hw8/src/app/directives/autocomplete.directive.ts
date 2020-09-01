import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  NgZone
} from "@angular/core";
import { NgModel } from "@angular/forms";

declare var google: any;

@Directive({
  selector: "[appAutocomplete]",
  providers: [NgModel]
})
export class AutocompleteDirective {
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  modelValue: any;
  autocomplete: any;
  private _el: HTMLElement;

  constructor(el: ElementRef, private model: NgModel, private zone: NgZone) {
    this._el = el.nativeElement;
    this.modelValue = this.model;
    var input = this._el;

    this.autocomplete = new google.maps.places.Autocomplete(input, {});
    google.maps.event.addListener(this.autocomplete, "place_changed", () => {
      var place = this.autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.zone.run(() => {
      this.setAddress.emit(place);
    });
  }
}
