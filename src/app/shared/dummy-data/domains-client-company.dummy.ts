export const Domains = [
    {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "xynergy",
        description: "12345",
        code: "12345",
        tag: ["legal-related"],
        idDomainCategory: "550e8400-e29b-41d4-a716-446655440000",
        idCompany: "550e8400-e29b-41d4-a716-446655440000"
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440001",
        name: "Cyberseguridad",
        description: "12345",
        code: "12345",
        tag: ["legal-related"],
        idDomainCategory: "550e8400-e29b-41d4-a716-446655440000",
        idCompany: "550e8400-e29b-41d4-a716-446655440000"
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440002",
        name: "Aseo",
        description: "12345",
        code: "12345",
        tag: ["legal-related"],
        idDomainCategory: "550e8400-e29b-41d4-a716-446655440000",
        idCompany: "550e8400-e29b-41d4-a716-446655440000"
    },
];

export const domains = Domains.flatMap(dominio => {
    return Array.from({ length: 10 }, (_, index) => ({
        id: `${index + 1}`, // ${domain.id}-
        name: `Dominio ${index + 1} of ${dominio.name}`,
        businessName: `Business ${index + 1}`,
        description: dominio.description,
        code: dominio.code,
        tag: dominio.tag,
        idDomainCategory: dominio.idDomainCategory,
        idCompany: dominio.idCompany,
    }));
});

