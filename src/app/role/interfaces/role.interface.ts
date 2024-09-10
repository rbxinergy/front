export interface Role {
  id?: string;
  name: string;
  description: string;
  client: string;
  company: string;
  active?:boolean;
  createdDate?:string;
  modificatedDate?:string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  tag:string;
  accessType: string;
  taxonomy: string
}