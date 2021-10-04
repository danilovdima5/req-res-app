import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ExchangeDataService } from '../exchange-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  imgUrl: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  id: number = 0;
  job: string = '';
  notLoaded: boolean = true;

  private routeSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private query: ActivatedRoute,
    private exchangeData: ExchangeDataService
  ) {
    this.routeSubscription = query.params.subscribe(
      (params: any) => (this.id = params['id'])
    );
  }

  ngOnInit(): void {
    this.http
      .get(`https://reqres.in/api/users/${this.id}`)
      .subscribe(
        (response: any) => (
          (this.imgUrl = response.data.avatar),
          (this.firstName = response.data.first_name),
          (this.lastName = response.data.last_name),
          (this.email = response.data.email),
          (this.notLoaded = false)
        )
      ),
      (rej: any) => {
        alert(rej.error.error);
      };
  }

  tryUpdate(): void {
    const body: object = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      job: this.job,
    };

    this.exchangeData.changeData('https://reqres.in/api/login', body, 'home');
  }
  tryRemove(): void {
    this.exchangeData.deleteData(`https://reqres.in/api/${this.id}`, 'home');
  }
}
