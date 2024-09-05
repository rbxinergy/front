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

export interface RoleModule {
  roleName: string;
  roleID: string;
  modules: {
    [key: string]: ModulePermissions;
  };
}

export interface ModulePermissions {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface Company {
  company: string | null;
  accessType: string;
  roles: RoleModule[];
}

export interface Permission {
  client: string;
  clientName: string;
  accessType: string;
  companies: Company[];
}

export interface User {
  name: string;
  lastName: string;
  email: string;
  permissions: Permission[];
  session: string;
  token: string;
}