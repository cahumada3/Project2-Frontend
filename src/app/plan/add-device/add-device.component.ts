import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Device, User } from 'src/app/models';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  userId: number;
  planId: number;
  user: User = {} as User;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.userId = this.appService.getCurrUserId();
    this.getUser();
  }

  getUser() {
    this.appService.getUser(this.userId).subscribe(u => this.user = u);
  }

  addDevice(device: Device) {
    this.appService.updateDevice(device.deviceId, { "model": device.model, "phoneNumber": device.phoneNumber, "userId": device.userId ,"planId": this.planId} as Device).subscribe();
  }
  // "model": "string",
  // "phoneNumber": 0,
  // "userId": 0,
  // "planId": 0

}
