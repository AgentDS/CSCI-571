import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "dateTime"
})
export class DateTimePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return value;
    let time;
    if (typeof value == "string") {
      time = moment(value + "000").format("YYYY-MM-DD HH:mm:ss");
    } else if (typeof value == "number") {
      time = moment(value * 1000).format("YYYY-MM-DD HH:mm:ss");
    }
    return time;
  }
}
