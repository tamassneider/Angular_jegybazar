import {FormControl} from '@angular/forms';

export function bidMinimumValidator (minimumValue) {
  return function (formControl: FormControl){
  if (parseInt(formControl.value, 0) < minimumValue) {
    return {
      'validateMinimumBid': true
    };
  }
  };
}
