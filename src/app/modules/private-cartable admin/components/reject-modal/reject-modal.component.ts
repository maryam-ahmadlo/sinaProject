import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reject-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reject-modal.component.html',
  styleUrls: ['./reject-modal.component.css']
})
export class RejectModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
