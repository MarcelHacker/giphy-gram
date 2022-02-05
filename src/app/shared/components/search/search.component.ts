import { TextInputComponent } from '../input/text.input.component';
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
  public text = '';
  @Input() hasClear: Boolean;
  @Input() loading: Boolean;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.hasClear = true;
    this.loading = true;
  }

  ngOnInit(): void {}

  handleSearch() {
    console.log(this.text);
    this.search.emit(this.text);
  }
}
