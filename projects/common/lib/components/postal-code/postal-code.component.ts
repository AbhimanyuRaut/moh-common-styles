import { Component, Input, Output, EventEmitter, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { LETTER, NUMBER, SPACE } from '../../../models/src/mask.model';
import { Base } from '../../../models/src/base';


@Component({
  selector: 'common-postal-code',
  templateUrl: './postal-code.component.html',
  styleUrls: ['./postal-code.component.scss']
})
export class PostalCodeComponent extends Base implements ControlValueAccessor  {

  @Input() label: string = 'Postal Code';
  @Input() displayMask: boolean = true;
  @Input() maxlen: string = '250';
  @Input() placeholder: string = 'A1A 1A1';
  @Input() labelforId: string = 'postalCode_' + this.objectId;
  @Input() disabled: boolean = false;

  @Input()
  set value( val: string ) {
    console.log( 'set value: ', val );
    this.postalCode = val;
  }
  get value() {
    console.log( 'get value: ', this.postalCode );
    return this.postalCode;
  }

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() blurEvent: EventEmitter<any> = new EventEmitter<any>();

  postalCode: string = null;
  mask: any;
  pcFormat: RegExp = /^[A-Za-z][0-9][A-Za-z]\s?[0-9][A-Za-z][0-9]$/;

  _onChange = (_: any) => {};
  _onTouched = (_: any) => {};

  constructor( @Optional() @Self() public controlDir: NgControl ) {
    super();
    if ( controlDir ) {
      controlDir.valueAccessor = this;
    }

    this.mask = [LETTER, NUMBER, LETTER, SPACE, NUMBER, LETTER, NUMBER];
  }

  onValueChange( value: any ) {
    console.log( 'onValueChange: ', value );
    if ( this.displayMask  && !value ) {
      // Fixes IE issue of displaying error when in focus.
      return;
    }
    this._onChange( value );
    this.valueChange.emit( value );
  }

  onBlurEvent( event: any ) {

    console.log( 'onblur: ', event );

    if ( this.displayMask && event.target.value ) {
      // Check for valid characters

      const passTest = this.pcFormat.test( event.target.value );
      this.controlDir.control.setErrors( (passTest ? null : { 'pattern': true } ) );

      console.log( 'passTest: ', passTest, event.target.value );
    }

    this._onTouched( event );
    this.blurEvent.emit( event );
  }

  writeValue( value: any ): void {
    if ( value !== undefined ) {
      this.postalCode = value;
    }
  }

  // Register change function
  registerOnChange( fn: any ): void {
    this._onChange = fn;
  }

  // Register touched function
  registerOnTouched( fn: any ): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Upper cases letters in string
   */
  upperCasePipe(text: string) {
    return text.toUpperCase();
  }
}
