export interface Client {
  id: string;
  name: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  county: string;
  district: string;
  country: string;
  documentType: string;
  document: string;
  isActive: boolean;
  tag: string;
  idContact?: string[];
}