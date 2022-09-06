export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    devices: Device[];
    plans: Plan[];
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