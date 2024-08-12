export const Subdomains = [
    {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Confidencialidad e integridad del sistema",
        description: "12345",
        tag: "legal-related",
        idDomain: "550e8400-e29b-41d4-a716-446655440000",
        createdAt: new Date().toISOString()
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Protección de Datos",
        description: "12345",
        tag: "legal-related",
        idDomain: "550e8400-e29b-41d4-a716-446655440001",
        createdAt: new Date().toISOString()
      }
];

export const subdomains = Subdomains.flatMap(subdominio => {
    return Array.from({ length: 10 }, (_, index) => ({
        id: `${index + 1}`, // ${domain.id}-
        name: `Subdominio ${index + 1} of ${subdominio.name}`,
        businessName: `Business ${index + 1}`,
        description: subdominio.description,
        tag: subdominio.tag,
        idDomain: subdominio.idDomain
    }));
});

