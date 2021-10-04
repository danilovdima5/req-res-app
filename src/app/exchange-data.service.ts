import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var M: any;

@Injectable({
  providedIn: 'root',
})
export class ExchangeDataService {
  constructor(private http: HttpClient, private router: Router) {}

  getData(link: string, where: any[]): void {
    this.http.get(link).subscribe(
      (response: any) => {
        response.data.forEach((particle: object) => {
          where.push(particle);
        });
      },
      (rej: any) => {
        alert(rej.error.error);
      }
    );
  }

  sendData(link: string, body: object, signIn: string = ''): void {
    this.http.post(link, body).subscribe(
      (response: any) => {
        if (signIn) {
          M.toast({ html: 'Signed in successfully' });
          sessionStorage.setItem('token', response.token);
          this.router.navigate(['home']);
        }
      },
      (rej: any) => {
        M.toast({ html: rej.error.error });
      }
    );
  }

  deleteData(link: string, where: string): void {
    this.http.delete(link).subscribe(
      () => {
        this.router.navigate([where]);
        M.toast({ html: 'Removed successfully' });
      },

      (rej: any) => {
        M.toast({ html: rej.error.error });
      }
    );
  }

  changeData(link: string, body: object, where: string): void {
    this.http.put(link, body).subscribe(
      () => {
        this.router.navigate([where]),
          M.toast({ html: 'Changed successfully' });
      },
      (rej: any) => {
        M.toast({ html: rej.error.error });
      }
    );
  }
}
