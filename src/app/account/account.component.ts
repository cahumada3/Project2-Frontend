import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models'
import { AppService } from '../app.service';
import { filter } from 'rxjs';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  profile!: ProfileType;
  user: User = {} as User;

  constructor(
    private appService: AppService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();
    // console.log(this.profile.userPrincipalName);
    const email: string = this.profile.userPrincipalName as string;
    this.getUser(email);
  }

  getUser(email?: string) {
    this.appService.getUserByEmail(email).subscribe(user => this.user = user);
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }

}
