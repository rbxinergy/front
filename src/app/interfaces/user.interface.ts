interface User {
    id: string;
    name: string;
    last_name: string;
    job_title: string;
    email: string;
    document_type: string;
    document: string;
    passwd: string;
    is_provider: boolean;
    is_client: boolean;
    is_user_company: boolean;
    is_active: boolean;
    is_delete: boolean;
    created_date: Date;
    modificated_date: Date;
    tag: string;
  }