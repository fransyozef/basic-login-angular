import { FormControl } from '@angular/forms';

export function CheckRequiredField(field: FormControl): boolean {
    return field.hasError('required') && (field.dirty || field.touched);
}