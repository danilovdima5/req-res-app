import { Component, OnInit } from '@angular/core';
import { ExchangeDataService } from '../exchange-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usersList: any[] = [];
  resourcesList: any[] = [];

  constructor(private exchangeData: ExchangeDataService) {}

  ngOnInit(): void {
    this.exchangeData.getData(
      'https://reqres.in/api/users?page=1',
      this.usersList
    );
    this.exchangeData.getData(
      'https://reqres.in/api/users?page=2',
      this.usersList
    );
    this.exchangeData.getData(
      'https://reqres.in/api/unknown',
      this.resourcesList
    );
  }
}
