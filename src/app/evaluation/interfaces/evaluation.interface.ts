export interface Evaluation {
  evalid: number;
  evalname: string;
  companyid: number;
  companyname: string;
  createdAt: Date;
  type: number;
  visibility: boolean | undefined;
}
