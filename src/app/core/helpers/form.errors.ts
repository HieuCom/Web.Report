import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class FormErrors {

  constructor(
    private translate: TranslateService) {
  }
  
  public markFormGroupTouched(formGroup: FormGroup) {
    ( Object as any).values(formGroup.controls).forEach((control: { markAsTouched: () => void; controls: any[]; }) => {
      control.markAsTouched();
      if (control.controls) {
          control.controls.forEach((c: FormGroup) => this.markFormGroupTouched(c));
      }
    });
  }

  public validationMessages() {
    const messages = {
      required: this.translate.instant('error_this_field_is_required'),
      email: this.translate.instant('error_this_email_is_invalid'),
      username: this.translate.instant('error_this_username_is_invalid'),
      code: this.translate.instant('error_this_code_is_invalid'),
      invalidCharacters: (matches: any[]) => {
        let matchedCharacters = matches;
        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let stringValue = characterString;
          stringValue += character;

          if (matchedCharacters.length !== index + 1) {
            stringValue += ', ';
          }
          return stringValue;
        }, '');

        return `${this.translate.instant('error_these_characters_are_not_allowed')}: ${matchedCharacters}`;
      },
      invalidCode: (matches: any[]) => {
        let matchedCharacters = matches;
        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let stringValue = characterString;
          stringValue += character;

          if (matchedCharacters.length !== index + 1) {
            stringValue += ', ';
          }
          return stringValue;
        }, '');

        return `${this.translate.instant('error_this_code_not_allowed')}: ${matchedCharacters}`;
      },
      invalidName: (matches: any[]) => {
        let matchedCharacters = matches;
        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let stringValue = characterString;
          stringValue += character;

          if (matchedCharacters.length !== index + 1) {
            stringValue += ', ';
          }
          return stringValue;
        }, '');

        return `${this.translate.instant('error_this_name_not_allowed')}: ${matchedCharacters}`;
      },
      invalidPassword: (matches: any[]) => {
        let matchedCharacters = matches;
        matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
          let stringValue = characterString;
          stringValue += character;

          if (matchedCharacters.length !== index + 1) {
            stringValue += ', ';
          }
          return stringValue;
        }, '');

        return `${this.translate.instant('error_this_password_not_allowed')}: ${matchedCharacters}`;
      },
      invalidPasswordConfirm: (matches: any) => {
        return `${this.translate.instant('error_this_password_confirm_not_matched')}`;
      },
    };

    return messages;
  }

  public validateForm(formToValidate: FormGroup, errors: any, checkDirty?: boolean) {
    const form = formToValidate;

    for (const field in errors) {
      if (field) {
        errors[field] = '';
        const control = form.get(field);

        const messages: any = this.validationMessages();
        if (control && !control.valid) {
          if (!checkDirty || (control.dirty || control.touched)) {
            for (const key in control.errors) {
              if (key && key !== 'invalidCharacters' && key !== 'invalidCode' && key !== 'invalidName' && key !== 'invalidPassword' && key !== 'invalidPasswordConfirm') {
                errors[field] = errors[field] || messages[key];
              } else {
                errors[field] = errors[field] || messages[key](control.errors[key]);
              }
            }
          }
        }
      }
    }

    return errors;
  }
}
