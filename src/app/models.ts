import { NonNullableFormBuilder } from "@angular/forms";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
}

export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
}

export interface Plan {
    id: number;
    phoneLines: number;
    numberLines: number;
    userdId: number;
}

export interface PlanDTO {
    phoneLines: number;
    numberLines: number;
    userdId: number;
}

export interface Device {
    id: number;
    model: string;
    phoneNumber: number;
    userId: number;
    planId: number;
}

export interface DeviceDTO {
    model: string;
    phoneNumber: number;
    userId: number;
    planId: number;
}