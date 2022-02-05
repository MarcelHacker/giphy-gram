import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text.input.component.html',
  styleUrls: ['./text.input.component.css'],
})
export class TextInputComponent implements OnInit {
  @Input() placeholder: String;
  @Input() hasClear: Boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onBlur: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.placeholder = 'HI';
    this.hasClear = true;
  }

  ngOnInit(): void {}

  click() {
    this.onClick.emit();
  }

  change(event: any) {
    this.onChange.emit(event);
  }

  blur(event: any) {
    this.onBlur.emit(event);
  }
}
