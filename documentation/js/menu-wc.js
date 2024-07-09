'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">xr-backoffice documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-d66bb70a4163cc8b262f42d3a471cb23f25ce3bc6618c8dd7f31cdf60382e474d433ce3cac7e4bd17a96d0bc70ae4b715543115ed61f21beb7fd7a9e1d296123"' : 'data-bs-target="#xs-components-links-module-AppModule-d66bb70a4163cc8b262f42d3a471cb23f25ce3bc6618c8dd7f31cdf60382e474d433ce3cac7e4bd17a96d0bc70ae4b715543115ed61f21beb7fd7a9e1d296123"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-d66bb70a4163cc8b262f42d3a471cb23f25ce3bc6618c8dd7f31cdf60382e474d433ce3cac7e4bd17a96d0bc70ae4b715543115ed61f21beb7fd7a9e1d296123"' :
                                            'id="xs-components-links-module-AppModule-d66bb70a4163cc8b262f42d3a471cb23f25ce3bc6618c8dd7f31cdf60382e474d433ce3cac7e4bd17a96d0bc70ae4b715543115ed61f21beb7fd7a9e1d296123"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignUpComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-AppModule-d66bb70a4163cc8b262f42d3a471cb23f25ce3bc6618c8dd7f31cdf60382e474d433ce3cac7e4bd17a96d0bc70ae4b715543115ed61f21beb7fd7a9e1d296123"' : 'data-bs-target="#xs-pipes-links-module-AppModule-d66bb70a4163cc8b262f42d3a471cb23f25ce3bc6618c8dd7f31cdf60382e474d433ce3cac7e4bd17a96d0bc70ae4b715543115ed61f21beb7fd7a9e1d296123"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-d66bb70a4163cc8b262f42d3a471cb23f25ce3bc6618c8dd7f31cdf60382e474d433ce3cac7e4bd17a96d0bc70ae4b715543115ed61f21beb7fd7a9e1d296123"' :
                                            'id="xs-pipes-links-module-AppModule-d66bb70a4163cc8b262f42d3a471cb23f25ce3bc6618c8dd7f31cdf60382e474d433ce3cac7e4bd17a96d0bc70ae4b715543115ed61f21beb7fd7a9e1d296123"' }>
                                            <li class="link">
                                                <a href="pipes/ObjectToArrayPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ObjectToArrayPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StepperModule.html" data-type="entity-link" >StepperModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StepperModule-439aec5c1544516e15710fd988754c14f41d7e13daffcc57fc2d1174bc440576156e71c1f13b60c0e61bafd94f3eea5d3fa7db06a61fe8f6a879c2330425fc86"' : 'data-bs-target="#xs-components-links-module-StepperModule-439aec5c1544516e15710fd988754c14f41d7e13daffcc57fc2d1174bc440576156e71c1f13b60c0e61bafd94f3eea5d3fa7db06a61fe8f6a879c2330425fc86"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StepperModule-439aec5c1544516e15710fd988754c14f41d7e13daffcc57fc2d1174bc440576156e71c1f13b60c0e61bafd94f3eea5d3fa7db06a61fe8f6a879c2330425fc86"' :
                                            'id="xs-components-links-module-StepperModule-439aec5c1544516e15710fd988754c14f41d7e13daffcc57fc2d1174bc440576156e71c1f13b60c0e61bafd94f3eea5d3fa7db06a61fe8f6a879c2330425fc86"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StepperModule-439aec5c1544516e15710fd988754c14f41d7e13daffcc57fc2d1174bc440576156e71c1f13b60c0e61bafd94f3eea5d3fa7db06a61fe8f6a879c2330425fc86"' : 'data-bs-target="#xs-injectables-links-module-StepperModule-439aec5c1544516e15710fd988754c14f41d7e13daffcc57fc2d1174bc440576156e71c1f13b60c0e61bafd94f3eea5d3fa7db06a61fe8f6a879c2330425fc86"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StepperModule-439aec5c1544516e15710fd988754c14f41d7e13daffcc57fc2d1174bc440576156e71c1f13b60c0e61bafd94f3eea5d3fa7db06a61fe8f6a879c2330425fc86"' :
                                        'id="xs-injectables-links-module-StepperModule-439aec5c1544516e15710fd988754c14f41d7e13daffcc57fc2d1174bc440576156e71c1f13b60c0e61bafd94f3eea5d3fa7db06a61fe8f6a879c2330425fc86"' }>
                                        <li class="link">
                                            <a href="injectables/DomainsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DomainsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ClientComponent.html" data-type="entity-link" >ClientComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ClientComponent-1.html" data-type="entity-link" >ClientComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ClientsComponent.html" data-type="entity-link" >ClientsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ClientSelectionDialogComponent.html" data-type="entity-link" >ClientSelectionDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CompanyComponent.html" data-type="entity-link" >CompanyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CompanyComponent-1.html" data-type="entity-link" >CompanyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CompanyComponent-2.html" data-type="entity-link" >CompanyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CompanyConfigComponent.html" data-type="entity-link" >CompanyConfigComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CompanyTableComponent.html" data-type="entity-link" >CompanyTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfigsComponent.html" data-type="entity-link" >ConfigsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" >ConfirmDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactComponent.html" data-type="entity-link" >ContactComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactServiceCompanyComponent.html" data-type="entity-link" >ContactServiceCompanyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeleteComponent.html" data-type="entity-link" >DeleteComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeleteComponent-1.html" data-type="entity-link" >DeleteComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeleteComponent-2.html" data-type="entity-link" >DeleteComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeleteComponent-3.html" data-type="entity-link" >DeleteComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DomaincategoryComponent.html" data-type="entity-link" >DomaincategoryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DomainCategoryTableComponent.html" data-type="entity-link" >DomainCategoryTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DomainCfgTableComponent.html" data-type="entity-link" >DomainCfgTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DomainComponent.html" data-type="entity-link" >DomainComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DomainsComponent.html" data-type="entity-link" >DomainsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DomainTableComponent.html" data-type="entity-link" >DomainTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditComponent.html" data-type="entity-link" >EditComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditComponent-1.html" data-type="entity-link" >EditComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditComponent-2.html" data-type="entity-link" >EditComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditComponent-3.html" data-type="entity-link" >EditComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GroupcompanyComponent.html" data-type="entity-link" >GroupcompanyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GroupCompanyTableComponent.html" data-type="entity-link" >GroupCompanyTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/IntegrationsComponent.html" data-type="entity-link" >IntegrationsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MessagesModalComponent.html" data-type="entity-link" >MessagesModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewClientComponent.html" data-type="entity-link" >NewClientComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PermissionComponent.html" data-type="entity-link" >PermissionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProviderComponent.html" data-type="entity-link" >ProviderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResponsiveMenuComponent.html" data-type="entity-link" >ResponsiveMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RoleCfgTableComponent.html" data-type="entity-link" >RoleCfgTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RoleComponent.html" data-type="entity-link" >RoleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RolesComponent.html" data-type="entity-link" >RolesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RoleTableComponent.html" data-type="entity-link" >RoleTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SeeComponent.html" data-type="entity-link" >SeeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ServicecategoryComponent.html" data-type="entity-link" >ServicecategoryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ServicecompanyComponent.html" data-type="entity-link" >ServicecompanyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SessionComponent.html" data-type="entity-link" >SessionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StepperComponent.html" data-type="entity-link" >StepperComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SubdomainCfgTableComponent.html" data-type="entity-link" >SubdomainCfgTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SubdomainComponent.html" data-type="entity-link" >SubdomainComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserComponent.html" data-type="entity-link" >UserComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersComponent.html" data-type="entity-link" >UsersComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersconfigsComponent.html" data-type="entity-link" >UsersconfigsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UsersTableComponent.html" data-type="entity-link" >UsersTableComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/MyErrorStateMatcher.html" data-type="entity-link" >MyErrorStateMatcher</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClientDataService.html" data-type="entity-link" >ClientDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClientService.html" data-type="entity-link" >ClientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompanyService.html" data-type="entity-link" >CompanyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DomainCategoryService.html" data-type="entity-link" >DomainCategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DomainDataService.html" data-type="entity-link" >DomainDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DomainService.html" data-type="entity-link" >DomainService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DomainsService.html" data-type="entity-link" >DomainsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetProfileService.html" data-type="entity-link" >GetProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetprofileService.html" data-type="entity-link" >GetprofileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupCompanyService.html" data-type="entity-link" >GroupCompanyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleService.html" data-type="entity-link" >RoleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubdomainDataService.html" data-type="entity-link" >SubdomainDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubdomainService.html" data-type="entity-link" >SubdomainService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Client.html" data-type="entity-link" >Client</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Clients.html" data-type="entity-link" >Clients</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Companies.html" data-type="entity-link" >Companies</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Contact.html" data-type="entity-link" >Contact</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Domain.html" data-type="entity-link" >Domain</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DomainCategory.html" data-type="entity-link" >DomainCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Domains.html" data-type="entity-link" >Domains</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupCompany.html" data-type="entity-link" >GroupCompany</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Provider.html" data-type="entity-link" >Provider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceCategory.html" data-type="entity-link" >ServiceCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceCompany.html" data-type="entity-link" >ServiceCompany</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubDomain.html" data-type="entity-link" >SubDomain</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Subdomain.html" data-type="entity-link" >Subdomain</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Subdomain-1.html" data-type="entity-link" >Subdomain</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User-1.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User-2.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Users.html" data-type="entity-link" >Users</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});