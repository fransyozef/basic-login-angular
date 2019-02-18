import { FormControl, AbstractControl } from '@angular/forms';

export function CheckRequiredField(field: AbstractControl): boolean {
    return (!field.valid && (field.dirty || field.touched));
}