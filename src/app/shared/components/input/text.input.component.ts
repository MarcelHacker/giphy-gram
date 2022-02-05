import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { LoaderComponent } from './../loader/loader.component';

@Component({
  selector: 'app-text-input',
  templateUrl: './text.input.component.html',
  styleUrls: ['./text.input.component.css'],
})
export class TextInputComponent implements OnInit {
  @Input() placeholder: String;
  @Input() hasClear: Boolean;
  @Input() loading: Boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBlur: EventEmitter<any> = new EventEmitter<any>();

  @Input() value: String;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.value = '';
    this.placeholder = '';
    this.hasClear = true;
    this.loading = false;
  }

  ngOnInit(): void {}

  change(event: any) {
    this.valueChange.emit(event);
  }

  enter(event: any) {
    this.valueChange.emit(event);
  }
}
