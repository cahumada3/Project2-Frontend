import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css']
})
export class DeviceEditComponent implements OnInit {
  public newDeviceForm!: FormGroup

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newDeviceForm = new FormGroup({
      mode: new FormControl('', Validators.required)
    });
  }

  get f() { return this.newDeviceForm.controls }

  submit() {
    console.log(this.newDeviceForm.value);
  }

}
