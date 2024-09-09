export const environment = {
  production: false,
  serverUrl: 'https://xrisk-',
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
  apiGetToken: 'https://xrisk-login-drzcbalp5q-uk.a.run.app/v1/login/auth/login',
  apiGetProfile: 'http://localhost:8086/get-profile/api/get-profile',
  // 'apiGetSubDomain: 'http://localhost:8087/get-sub-domain/api/get-sub-domain',
  apiGetSubDomain: 'http://localhost:8087/subdomain-service/api/get-all-subdomains',
  apiGetServiceType: 'http://localhost:9091/get-service-type/api/get-service-type',
  apiPostCreateService: 'http://localhost:9092/post-service/api/post-service',
  apiGetServices: 'http://localhost:9093/get-services/api/get-services',
  apiPutService: 'http://localhost:8101/put-service/api/put-service',
  apiDelService: 'http://localhost:8102/del-service/api/del-service',
  apiPostCreateProvider: 'http://localhost:9096/provider-service/api/post-provider',
  apiGetProviders: 'http://localhost:9096/provider-service/api/get-providers',
  apiGetProvidersByServiceId: 'http://localhost:9096/provider-service/api/get-providers-by-serviceid',
  apiPutProvider: 'http://localhost:8105/put-provider/api/put-provider',
  apiDelProvider: 'http://localhost:8106/del-provider/api/del-provider',
  apiPostCreateSubDomain: 'http://localhost:8107/post-sub-domain/api/post-sub-domain',
  apiPutSubDomain: 'http://localhost:8108/put-sub-domain/api/put-sub-domain',
  apiDelSubDomain: 'http://localhost:8109/del-sub-domain/api/del-sub-domain',
  apiGetDomainGrp: 'http://localhost:8085/get-domain-grp/api/get-domain-grp',
  apiGetQuest: 'http://localhost:8110/quest-service/api/get-quest-by-companyid',
  apiCreateQuestion: 'http://localhost:8110/quest-service/api/post-quest',
  apiCreateQuestQuestion: 'http://localhost:8110/quest-service/api/post-quest-question',
  apiCreateQuestionnaire: 'http://localhost:8110/quest-service/api/post-quest',
  apiGetEvaluationsByCompanyId: 'http://localhost:8091/evaluation-service/api/get-evaluations-by-companyid',
  apiCreateEvaluation: 'http://localhost:8091/evaluation-service/api/post-evaluation',
  apiGetQuestByCompany: 'http://localhost:8110/quest-service/api/get-quest-by-companyid',
  apiGetQuestByQuestId: 'http://localhost:8110/quest-service/api/get-quest-by-questid', // ????
  apiGetQuestionsByQuestId: 'http://localhost:8110/quest-service/api/get-questions-by-questid',
  apiGetQuestionsByCompanyId: 'http://localhost:8110/quest-service/api/get-questions-by-companyid',
  apiSetQuestionsOrder: 'http://localhost:8110/quest-service/api/post-questions-order',
  apiGetSubdomainByDomainid: 'http://localhost:8087/subdomain-service/api/get-subdomain-by-domainid',
  // apiGetSubdomainByCompanyid: 'http://localhost:8087/subdomain-service/api/get-subdomain-by-companyid',
  apiGetAllSubdomain: 'http://localhost:8087/subdomain-service/api/get-all-subdomains',
  apiGetQuestByEvalId: 'http://localhost:8110/quest-service/api/get-quest-by-evalid',
  apiPutEvaluation: 'http://localhost:8091/evaluation-service/api/put-evaluation',
  apiPostLabels: 'http://localhost:8110/quest-service/api/post-labels',
  apiPostQuestion: 'http://localhost:8110/quest-service/api/post-question',
  apiUrls: {
    client: `client-drzcbalp5q-uk.a.run.app/v1/client`,
    company: `company-drzcbalp5q-uk.a.run.app/v1/company`,
    contact: `contact-drzcbalp5q-uk.a.run.app/v1/contact`,
    domain: `domain-drzcbalp5q-uk.a.run.app/v1/domain`,
    domainCategory: `domain-category-drzcbalp5q-uk.a.run.app/v1/domain-category`,
    groupCompany: `group-company-drzcbalp5q-uk.a.run.app/v1/group-company`,
    serviceCategory: `service-category-drzcbalp5q-uk.a.run.app/v1/service-category`,
    login: `login-drzcbalp5q-uk.a.run.app/v1/login/auth/login`,
    logout: `login-drzcbalp5q-uk.a.run.app/v1/login/auth/logout`,
    provider: `provider-drzcbalp5q-uk.a.run.app/v1/provider`,
    role: `role-drzcbalp5q-uk.a.run.app/v1/role`,
    subdomain: `subdomain-drzcbalp5q-uk.a.run.app/v1/subdomain`,
    user: `user-drzcbalp5q-uk.a.run.app/v1/user`,
    report: `report-drzcbalp5q-uk.a.run.app/v1/report`,  
    serviceCompany: `service-company-drzcbalp5q-uk.a.run.app/v1`,
    session: `login-drzcbalp5q-uk.a.run.app/v1/login/get`
  }
};