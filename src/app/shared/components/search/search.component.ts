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
  constructor() {}

  ngOnInit(): void {}

  handleSearch() {}
}
