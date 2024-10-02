export interface Client {
    id: string;
    name: string;
    businessName: string;
    address: string;
    country: string;
    county: string;
    city: string;
    state: string;
    district: string;
    documentType: string;
    document: string;
    tag: string;
    active?: boolean;
    idContact?: string[];
    modificatedDate?: string,
    createdDate?: string
  }