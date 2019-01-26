import { FormControl } from '@angular/forms';

export function CheckRequiredField(field: FormControl): boolean {
    return (!field.valid && (field.dirty || field.touched));
}