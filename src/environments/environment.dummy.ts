export const environment = {
    production: false,
    serverUrl: 'http://localhost:8080',
    firebase: {
        projectId: "x-risk-qa",
        appId: "574871984926",
        storageBucket: "x-risk-qa.appspot.com",
        apiKey: "AIzaSyAh9JrcUBfjbCPmGB-J1IQ5hf-2JKzjrbQ",
        authDomain: "x-risk-qa.firebaseapp.com",
        messagingSenderId: "1084318886396",
    },
    channel: 1,
    getProfileUrl: "http://localhost:8086/get-profile/api/get-profile",
    getTokenUrl: "http://localhost:8080/get-token/api/get-token",
    getCompanyUrl: "http://localhost:8088/get-company/api/get-company",
    getClientUrl: "http://localhost:8082/get-clients/api/get-clients",
    postClientUrl: "http://localhost:8083/post-client/api/post-client",
    getDomainsUrl: "http://localhost:9086/get-domains/api/get-domains",
    getDomainTypeUrl: "http://localhost:8087/get-domain-type/api/get-domain-type",
    postDomainUrl: "http://localhost:8085/post-domain/api/post-domain",
    getDomainGrpUrl: "http://localhost:8084/get-domain-grp/api/get-domain-grp",
    getUsersUrl:"http://localhost:9089/get-users/api/get-all-users",
    getUsersRolesUrl: "http://localhost:8093/get-users-roles/api/get-users-roles",
    getRolesUrl: "http://localhost:8092/get-roles/api/get-roles",
    postUserUrl: "http://localhost:8094/post-user/api/post-user",
    getAllUsersUrl: "http://localhost:/get-users/api/get-all-users",
    postDomainGrpUrl: "http://localhost:/post-domain-grp/api/post-domain-grp",
    putClientUrl: "http://localhost:8082/client-service/api/put-client",
    apiUrls: {
      role: `/v1/role`,
      contact: `/v1/contact`,
      company: `/v1/company`,
      domain: `/v1/domain`,
      serviceCategory: `/v1/service-category`,
      login: `/v1/login/auth/login`,
      logout: `/v1/login/auth/logout`,
      client: `/v1/client`,
      provider: `/v1/provider`,
      report: `/v1/report`,
      subdomain: `/v1/subdomain`,
      domainCategory: `/v1/domain-category`,
      groupCompany: `/v1/group-company`,
      serviceCompany: `/v1/service-company`,
      user: `/v1/user`,
      session: `/v1/get/session`
    }
};