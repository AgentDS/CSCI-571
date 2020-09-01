import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capToVar'
})
export class CapToVarPipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return value;
    return value.toLowerCase().split(' ').join('_');
  }

}
