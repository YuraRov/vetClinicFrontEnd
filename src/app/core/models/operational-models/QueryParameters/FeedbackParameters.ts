import {Feedback} from "../../Feedback";

export interface FeedbackParameters {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious:boolean;
  entities: Feedback[];
}
