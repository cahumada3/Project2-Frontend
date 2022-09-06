import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, tap, throwError } from 'rxjs';
import { catchError, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { User, UserDTO, Plan, PlanDTO, Device, DeviceDTO } from './models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private UserURL = 'https://telecom-app.azurewebsites.net/api/Users';
  private DeviceURL = 'https://telecom-app.azurewebsites.net/api/Devices';
  private PlanURL = 'https://telecom-app.azurewebsites.net/api/Plans';
  private currPlanId!: number;
  private currDeviceId!: number;
  private currUserID!: number;
  private currUserEmail!: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  updateCurrPlanId(id: number) {
    this.currPlanId = id;
  }

  getCurrPlanId(): number {
    return this.currPlanId;
  }

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.PlanURL, this.httpOptions);
  }

  getPlan(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${this.PlanURL}/${id}`, this.httpOptions);
  }

  createPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.PlanURL, plan, this.httpOptions);
  }

  updatePlan(id: number, plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${this.PlanURL}/${id}`, plan, this.httpOptions);
  }

  deletePlan(id: number): Observable<Plan> {
    return this.http.delete<Plan>(`${this.PlanURL}/${id}`, this.httpOptions);
  }

  updateCurrDeviceId(id: number) {
    this.currDeviceId = id;
  }

  getCurrdeviceId(): number {
    return this.currDeviceId;
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.DeviceURL, this.httpOptions);
  }

  getDevice(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.DeviceURL}/${id}`, this.httpOptions);
  }

  createDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(this.DeviceURL, device, this.httpOptions);
  }

  updateDevice(id: number, device: Device): Observable<Device> {
    return this.http.put<Device>(`${this.DeviceURL}/${id}`, device, this.httpOptions);
  }

  deleteDevice(id: number): Observable<Device> {
    return this.http.delete<Device>(`${this.DeviceURL}/${id}`, this.httpOptions);
  }

  updateCurrUserId(id: number) {
    this.currUserID = id;
  }

  getCurrUserId() {
    return this.currUserID;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.UserURL, this.httpOptions);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.UserURL}/${id}`, this.httpOptions);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.UserURL}/email/${email}`, this.httpOptions);
  }

  checkUserExists(email:string): Observable<boolean> {
    return this.http.get<boolean>(`${this.UserURL}/exsits/${email}`, this.httpOptions);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.UserURL, user, this.httpOptions);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.UserURL}/${id}`, user, this.httpOptions);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.UserURL}/${id}`, this.httpOptions);
  }

  updateCurrUserEmail(email: string) {
    this.currUserEmail = email;
  }

  getCurrUserEmail(): string {
    return this.currUserEmail;
  }

}
