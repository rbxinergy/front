export interface Role {
  id: number;
  name: string;
  description: string;
  client: string;
  company: string;
  isCreate: boolean;
  isUpdate: boolean;
  isRead: boolean;
  isDelete: boolean;
  tag: string;
  createdAt: Date;
}