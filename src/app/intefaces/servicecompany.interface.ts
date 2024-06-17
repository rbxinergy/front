export interface ServiceCompany {
    id: string;
    name: string;
    code: string;
    location: string;
    description: string;
    is_active: boolean;
    is_delete: boolean;
    created_date: Date;
    modificated_date: Date;
    tag: string;
    id_service_category: string;
    id_domain: string;
    id_company: string;
  }