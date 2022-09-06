import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Device, Plan, User } from 'src/app/models';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  userId: number;
  planId: number;
  user: User = {} as User;
  plan: Plan = {} as Plan;
  devices: Device[] =[];

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.appService.getCurrUserId();
    // this.planId = this.appService.getCurrPlanId();
    this.devices = [
      {
        "deviceId": 1,
        "model": "Phone",
        "phoneNumber": 0,
        "isActive": true,
        "userId": 1,
        "planId": 5
      },
      {
        "deviceId": 2,
        "model": "IPhone5",
        "phoneNumber": 0,
        "isActive": false,
        "userId": 1,
        "planId": null
      },
      {
        "deviceId": 4,
        "model": "Phone",
        "phoneNumber": 0,
        "isActive": true,
        "userId": 3,
        "planId": 8
      },
      {
        "deviceId": 7,
        "model": "Phone",
        "phoneNumber": 0,
        "isActive": false,
        "userId": 32,
        "planId": null
      },
      {
        "deviceId": 8,
        "model": "Phone",
        "phoneNumber": 0,
        "isActive": false,
        "userId": 3,
        "planId": null
      },
      {
        "deviceId": 12,
        "model": "Phone",
        "phoneNumber": 0,
        "isActive": false,
        "userId": 3,
        "planId": null
      },
    ]
  }

  getInfo() {
    this.appService.getUser(this.userId).subscribe(u => this.user = u);
    // this.appService.getPlan(this.planId).subscribe(p => this.plan = p);
    this.appService
  }

  addDevice(device: Device) {
    var pNum = this.userId.toString() + this.planId.toString() + device.deviceId.toString() //TODO make proper 10 digit phone number
    this.appService.updateDevice(device.deviceId, { "model": device.model, "phoneNumber": Number(pNum), "userId": device.userId , "planId": this.planId} as Device).subscribe();
    this.router.navigateByUrl('/');
  }
}
