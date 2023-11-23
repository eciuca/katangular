/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2023-11-22 00:15:29.

export interface AgentDto {
  agentCode?: string;
  agentName: string;
  workingArea: string;
  commission: number;
  phoneNo: string;
  country: string;
}

export interface CompanyDto {
  id?: string;
  name: string;
  city: string;
}

export interface CustomerDto {
  id?: string;
  name: string;
  city: string;
  country: string;
  workingArea: string;
  grade: number;
  openingAmount: number;
  receiveAmount: number;
  paymentAmount: number;
  outstandingAmount: number;
  phoneNumber: string;
  agentCode: string;
}

export interface FoodDto {
  id?: string;
  name: string;
  unit: string;
  companyId: string;
}

export interface OrderDto {
  id?: number;
  amount: number;
  advanceAmount: number;
  date: Date;
  customerId: string;
  agentId: string;
  description: string;
}

export interface StudentDto {
  id?: number;
  className: string;
  section: string;
  rollId: number;
  name: string;
  title: string;
}

export interface StudentReportDto {
  id?: number;
  studentId: number;
  grade: string;
  semester: string;
  classAttended: number;
}
