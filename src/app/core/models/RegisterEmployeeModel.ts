import { ResourceModel } from './ResourceModel';

export class RegisterEmployeeModel extends ResourceModel<RegisterEmployeeModel> {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    role?: string;
    password?: string;
    confirmPassword?: string;

    constructor(model?: Partial<RegisterEmployeeModel>) {
      super(model);
    }
}