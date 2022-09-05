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
  users: User = {} as User;

  constructor(
    private appService: AppService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();
    const email = this.profile.userPrincipalName;
    console.log(this.appService.getUserByEmail(this.profile.userPrincipalName!).subscribe(user => this.users = user));
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }

}
