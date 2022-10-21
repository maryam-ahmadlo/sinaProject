import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-oldest-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oldest-result.component.html',
  styleUrls: ['./oldest-result.component.css']
})
export class OldestResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
