interface Domain {
    id: string;
    name: string;
    code: string;
    description: string;
    is_active: boolean;
    is_delete: boolean;
    created_date: Date;
    modificated_date: Date;
    tag: string;
    id_domain_category: string;
    id_company: string;
  }