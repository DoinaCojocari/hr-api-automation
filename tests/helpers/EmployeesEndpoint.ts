import { BaseEndpoint } from "./BaseEndpoint.ts";

export interface Employee{
    // Optional values for the employees are written with question mark which shows
    // they could be empty(null)
    employee_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    hire_date: string;
    job_id: string;
    commission_pct?: number;
    manager_id?: number;
    department_id?: number;
    salary: number
}

export class EmployeesEndpoint extends BaseEndpoint<Employee>{
    // Base path for all employees
    protected basePath = '/api/employees';
    // List of required values in employee response
    protected requiredFields = [
        'employee_id',
        'first_name',
        'last_name',
        'email',
        'hire_date',
        'job_id',
        'salary'
    ];

}