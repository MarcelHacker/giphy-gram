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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() placeholder: String = '';
  @Input() hasClear: Boolean = true;
  @Input() loading: Boolean = false;
  @Input() value: String = '';
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  handleChange(event: any) {
    this.change.emit(event);
  }

  handleBlur(event: any) {
    this.blur.emit(event);
  }

  handleFocus(event: any) {
    this.focus.emit(event);
  }
}
