import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DropdownItem } from 'primeng/dropdown';

export type HomeForm = {
  items: FormArray<FormGroup<HomeFormGroup>>;
};

export type HomeFormGroup = {
  radio: FormControl<RadioType | null>;
  dropdown: FormControl<DropdownItem | null>;
  input: FormControl<string | null>;
};

export enum RadioType {
  tv = 'TV',
  theatre = 'THEATRE',
  ott = 'OTT',
}
