import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css'],
})
export class GifsComponent implements OnInit {
  constructor(private service: GifsService) {}

  ngOnInit(): void {
    this.service.getGifs().subscribe((result: Object) => {
      console.log('Result:' + result);
      console.table(result);
    });
  }
}
