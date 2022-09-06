import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { Device } from 'src/app/models';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent implements OnInit {
  public newDeviceForm!: FormGroup


  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newDeviceForm = new FormGroup({
      model: new FormControl('', Validators.required),
    });
  }

  get f() { return this.newDeviceForm.controls; }

  submit() {
    console.log(this.newDeviceForm.value);
  }

}
