import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device, Plan, User } from '../models'
import { AppService } from '../app.service';
import { filter, tap, catchError, of, Observable, ConnectableObservable } from 'rxjs';
import { UserAgentApplication } from 'msal';
import { Router } from '@angular/router';
import { AddDeviceComponent } from '../plan/add-device/add-device.component';

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
  exists!: boolean;
  displayDevices: boolean = false;
  removeDevices: boolean = false;
  planId!: number;
  totalBill: number = 0;

  constructor(
    private appService: AppService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProfile().subscribe(
      profile => { 
        this.profile = profile;
        this.appService.checkUserExists(profile.userPrincipalName).subscribe(e => { 
          this.exists = e;
          if (this.exists == false) {
            var userTemp = {"firstName": profile.givenName, "lastName": profile.surname, "email": profile.userPrincipalName} as User;
            this.appService.createUser(userTemp).subscribe(); 
          }
          this.appService.getUserByEmail(profile.userPrincipalName).subscribe(u => { 
            this.user = u;
            for (var plan of this.user.plans)  {
              console.log(plan.type);
              if (plan.type == "0")
                this.totalBill += 25 + (plan.numberLines * 20);
              if (plan.type == "1")
                this.totalBill += 75 + (plan.numberLines * 10);
              if (plan.type == "2")
                this.totalBill += 125 + (plan.numberLines * 5);
              console.log(this.totalBill);
            }
          });
        }) 
      });
    console.log(this.exists);
    if (this.appService.getCurrUserId() != undefined)
    {
      this.isValid = false;
      this.appService.getUser(this.appService.getCurrUserId()).subscribe(u => this.user = u);
    }
  }

  getProfile(): Observable<ProfileType> {
    return this.http.get(GRAPH_ENDPOINT);
  }

  routeToDevice(id: number) {
    this.appService.updateCurrUserId(id);
    this.appService.createDevice({"model": "Phone", "userId": id} as Device).subscribe();
    this.router.navigateByUrl('/');
  }

  deleteDevice(uId: number, id: number) {
    this.appService.updateCurrUserId(uId);
    this.appService.deleteDevice(id).subscribe();
    this.router.navigateByUrl('/');
  }

  routeToFamilyPlan(id: number) {
    this.appService.updateCurrUserId(id);
    this.appService.createPlan({"type": "Family", "phoneLines": 5, "numberLines": 0, "userId": id } as Plan).subscribe();
    this.router.navigateByUrl('/');
  }

  routeToWorkPlan(id: number) {
    this.appService.updateCurrUserId(id);
    this.appService.createPlan({"type": "work", "phoneLines": 20, "numberLines": 0, "userId": id } as Plan).subscribe();
    this.router.navigateByUrl('/');
  }

  routeToEnterprisePlan(id: number) {
    this.appService.updateCurrUserId(id);
    this.appService.createPlan({"type": "enterprise", "phoneLines": 75, "numberLines": 0, "userId": id } as Plan).subscribe();
    this.router.navigateByUrl('/');
  }

  deletePlan(uId: number, id: number) {
    console.log("here to delete plan");
    this.appService.updateCurrPlanId(uId);
    this.appService.deletePlan(id).subscribe();
    this.router.navigateByUrl('/');
  }

  addDevice(planId:number) {
    console.log(planId);
    this.appService.updateCurrPlanId(planId);
    this.displayDevices = true;
  }

  removeDeivce(planId: number)
  {
    this.appService.updateCurrPlanId(planId);
    this.planId = planId;
    this.removeDevices = true;
  }

  addDeviceToPlan(device: Device) {
    var pNum = this.user.userId.toString() + this.appService.getCurrPlanId().toString() + device.deviceId.toString(); //TODO make proper 10 digit phone number
    while (pNum.length < 9) 
      pNum = pNum + "0";
    console.log(pNum);
    console.log(typeof(pNum));
    console.log(typeof(Number(pNum)));
    this.appService.updateDevice(device.deviceId, { "model": device.model, "phoneNumber": Number(pNum), "userId": device.userId , "planId": this.appService.getCurrPlanId()} as Device).subscribe();
    this.router.navigateByUrl('/');
  }

  removeDeviceFromPlan(device: Device) {
    this.appService.updateDevice(device.deviceId, { "model": device.model, "phoneNumber": 0, "userId": device.userId , "planId": null} as Device).subscribe();
    this.router.navigateByUrl('/');
  }
}
