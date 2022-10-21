import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'leasing-angular-workspace-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.less'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AuthLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
