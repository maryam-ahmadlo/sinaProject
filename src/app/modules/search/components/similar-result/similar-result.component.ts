import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-similar-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './similar-result.component.html',
  styleUrls: ['./similar-result.component.css']
})
export class SimilarResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
