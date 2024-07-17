export interface Role {
  id?: string;
  client: string;
  company: string;
  description: string;
  name: string;
  isCreate: boolean;
  isModify: boolean;
  isList: boolean;
  isDelete: boolean;
}