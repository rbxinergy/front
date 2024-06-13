export const clients = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Empresa Chilena A',
      businessName: 'Empresa A S.A.',
      address: 'Av. Libertador Bernardo O\'Higgins 1234, Santiago, Chile',
      country: 'Chile',
      documentType: 'RUT',
      document: '76012345-6',
      tag: 'legal-related',
      idContact: ['550e8400-e29b-41d4-a716-446655440001']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Empresa Chilena B',
      businessName: 'Empresa B Ltda.',
      address: 'Calle Falsa 123, Valparaíso, Chile',
      country: 'Chile',
      documentType: 'RUT',
      document: '96543210-9',
      tag: 'legal-related',
      idContact: ['550e8400-e29b-41d4-a716-446655440002']
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Empresa Chilena C',
      businessName: 'Empresa C SpA',
      address: 'Calle Real 456, Concepción, Chile',
      country: 'Chile',
      documentType: 'RUT',
      document: '81234567-0',
      tag: 'legal-related',
      idContact: ['550e8400-e29b-41d4-a716-446655440003']
    }
  ];
  
  export const companies = clients.flatMap(client => {
    return Array.from({ length: 10 }, (_, index) => ({
      id: `${index + 1}`, // ${client.id}-
      name: `Company ${index + 1} of ${client.name}`,
      businessName: `Business ${index + 1}`,
      address: `Address ${index + 1}`,
      country: client.country,
      city: `City ${index + 1}`,
      state: `State ${index + 1}`,
      county: `County ${index + 1}`,
      district: `District ${index + 1}`,
      documentType: 'RUT',
      document: generateValidRUT(),
      isHeadQuarters: index === 0,
      isBranch: index !== 0,
      tag: client.tag,
      idClient: client.id,
      idGroupCompany: client.id,
      idContact: [client.id]
    }));
  });

function generateValidRUT(): string {
  const ruts = [
    '62617884-7', '76123456-5', '98765432-1', '12345678-9', '87654321-0',
    '11223344-5', '55667788-9', '99887766-4', '44332211-6', '66778899-3'
  ];
  return ruts[Math.floor(Math.random() * ruts.length)];
}