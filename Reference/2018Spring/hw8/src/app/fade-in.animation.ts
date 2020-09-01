import {
  trigger,
  state,
  animate,
  transition,
  style
} from "@angular/animations";

export const fadeInAnimation = trigger("fadeInAnimation", [
  transition("* => *", [
    style({ opacity: 0 }),
    animate(".3s", style({ opacity: 1 }))
  ])
]);