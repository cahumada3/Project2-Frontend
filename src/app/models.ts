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
    planId: number;
    type: string;
    phoneLines: number;
    numberLines: number;
    userId: number;
}

export interface PlanDTO {
    phoneLines: number;
    numberLines: number;
    userdId: number;
}

export interface Device {
    deviceId: number;
    model: string;
    phoneNumber: number;
    isActive: boolean;
    userId: number;
    planId: number;
}

export interface DeviceDTO {
    model: string;
    phoneNumber: number;
    userId: number;
    planId: number;
}