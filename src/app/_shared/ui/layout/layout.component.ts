import { Component, OnInit , Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit() {
    this.document.body.className = '';
  }

}
