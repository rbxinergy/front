export interface DomainCategory {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  is_delete: boolean;
  created_date: Date;
  modificated_date: Date;
  tag: string;
  idGroupCompany: string;
}