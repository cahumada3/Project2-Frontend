import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device, Plan, User } from '../models'
import { AppService } from '../app.service';
import { filter, tap, catchError, of, Observable } from 'rxjs';
import { UserAgentApplication } from 'msal';
import { Router } from '@angular/router';
import { observable } from 'rxjs';

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
  isValid: boolean = true;
  exists: boolean = false;

  constructor(
    private appService: AppService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProfile();
    console.log(this.appService.getCurrUserEmail())
    if (this.appService.getCurrUserId() != undefined)
    {
      this.isValid = false;
      this.appService.getUser(this.appService.getCurrUserId()).subscribe(u => this.user = u);
    }
  }

  checkUser(email: string) {
    this.appService.checkUserExists(email).subscribe(e => this.exists = e);
  }

  getUser(e: string, fName: string, lName: string, exists: boolean) {
    this.isValid = false;
    if (this.exists == false) {
      var userTemp = {"firstName": fName, "lastName": lName, "email": e} as User;
      this.appService.createUser(userTemp).subscribe(); 
    }
    this.appService.getUserByEmail(e).subscribe(u => this.user = u);
    this.appService.updateCurrUserEmail(e);
    console.log(this.appService.getCurrUserEmail());
  }
  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }

  routeToDevice(id: number) {
    this.appService.updateCurrUserId(id);
    this.appService.createDevice({"model": "Phone", "userId": id} as Device).subscribe();
    this.router.navigateByUrl('/account');
  }

  deleteDevice(id: number) {
    this.appService.deleteDevice(id).subscribe();
  }

  routeToFamilyPlan(id: number) {
    this.appService.updateCurrUserId(id);
    this.appService.createPlan({"type": "Family", "phoneLines": 5, "numberLines": 0, "userId": id } as Plan).subscribe();
    this.router.navigateByUrl('/account');
  }

  routeToWorkPlan(id: number) {
    this.appService.updateCurrUserId(id);
    this.appService.createPlan({"type": "Work", "phoneLines": 20, "numberLines": 0, "userId": id } as Plan).subscribe();
    this.router.navigateByUrl('/account');
  }

  routeToEnterprisePlan(id: number) {
    this.appService.updateCurrUserId(id);
    this.appService.createPlan({"type": "Enterprise", "phoneLines": 75, "numberLines": 0, "userId": id } as Plan).subscribe();
    this.router.navigateByUrl('/account');
  }

  deletePlan(id: number) {
    this.appService.deletePlan(id).subscribe();
  }

  addDevice(userId: number, planId:number) 
  {
    this.appService.updateCurrPlanId(planId);
    this.appService.updateCurrUserId(userId);
    this.router.navigateByUrl('/account/addDevice');
  }
}
