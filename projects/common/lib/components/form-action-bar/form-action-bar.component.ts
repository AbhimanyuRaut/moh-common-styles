import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'common-form-action-bar',
  templateUrl: './form-action-bar.component.html',
  styleUrls: ['./form-action-bar.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: forwardRef(() => NgForm ) } ]
})
export class FormActionBarComponent implements OnInit {
  @Input() submitLabel: string = 'Continue';
  @Input() canContinue: boolean = true;
  @Input() isLoading: boolean = false;
  @Input() defaultColor: boolean = true;
  @Output() btnClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick($event) {
    if (!this.isLoading && this.canContinue) {
      this.btnClick.emit($event);
    }
    $event.stopPropagation();
    return false;
  }
}
