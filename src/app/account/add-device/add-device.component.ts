import { Component, OnInit } from '@angular/core';
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

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.userId = this.appService.getCurrUserId();
    // this.planId = this.appService.getCurrPlanId();
    this.getInfo();
  }

  getInfo() {
    this.appService.getUser(this.userId).subscribe(u => this.user = u);
    // this.appService.getPlan(this.planId).subscribe(p => this.plan = p);
  }

  addDevice(device: Device) {
    var pNum = this.userId.toString() + this.planId.toString() + device.deviceId.toString() //TODO make proper 10 digit phone number
    this.appService.updateDevice(device.deviceId, { "model": device.model, "phoneNumber": Number(pNum), "userId": device.userId , "planId": this.planId} as Device).subscribe();
  }
}
