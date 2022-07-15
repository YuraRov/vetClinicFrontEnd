import { Appointment } from "../../Appointment";

export interface AppointmentParameters {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  entities: Appointment[];
}