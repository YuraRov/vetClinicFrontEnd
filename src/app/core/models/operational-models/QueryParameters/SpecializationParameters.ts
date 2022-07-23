import {Specialization} from "../../Specialization";

export interface SpecializationParameters{
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious:boolean;
  entities : Specialization[];
}
