import {ResourceModel} from "./ResourceModel";

export class Animal extends ResourceModel<Animal>{
  ownerId?: number;
  nickName?: string | null;
  birthDate?: Date | null;

  constructor(model?: Partial<Animal>) {
    super(model);
  }
}
