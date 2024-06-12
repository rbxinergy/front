export interface Company {
    id: string;
    name: string;
    business_name: string;
    address: string;
    city: string;
    state: string;
    county: string;
    district: string;
    country: string;
    document_type: string;
    document: string;
    is_headquarters: boolean;
    is_branch: boolean;
    is_active: boolean;
    is_delete: boolean;
    created_date: Date;
    modificated_date: Date;
    tag: string;
    id_group_company: string;
    id_client: string;
  }