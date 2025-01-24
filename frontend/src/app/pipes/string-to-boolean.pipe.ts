import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringToBoolean' // This is the name you'll use in templates
})
export class StringToBooleanPipe implements PipeTransform {
    transform(value: any): string {
        if (value === true) return "Yes"; // Converts 'true' to true, everything else to false
        else return "x";
    }
}
