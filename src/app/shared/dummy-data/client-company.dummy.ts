export const clients = [
  {
		"id" : "613d123b-a0ab-42f6-9b5c-6ec8238cf087",
		"name" : "Cencosud",
		"businessName" : "Cencosud S.A.",
		"address" : "Avenida Presidente Kennedy 9001",
		"city" : "Santiago",
		"state" : "R. Metropolitana",
		"county" : "",
		"district" : "Las condes",
		"country" : "Chile",
		"documentType" : "RUT",
		"document" : "93834000 - 5",
		"active" : true,
		"delete" : false,
		"tag" : ""
	},
	{
		"id" : "08a1af61-eee9-4747-bd7b-febb86332f20",
		"name" : "CAP",
		"businessName" : "CAP S.A",
		"address" : "GERTRUDIS ECHEÑIQUE 220",
		"city" : "Santiago",
		"state" : "R. Metropolitana",
		"county" : "",
		"district" : "Las condes",
		"country" : "Chile",
		"documentType" : "RUT",
		"document" : "58790262-1",
		"active" : true,
		"delete" : false,
		"tag" : ""
	},
  {
    "id" : "ebf2060f-d605-4257-8ea6-28d604c78330",
    "name" : "Cliente de prueba borrar",
    "businessName" : "Test Client S.A",
    "address" : "Calle falsa 1234",
    "city" : "Santiago",
    "state" : "R. Metropolitana",
    "county" : "",
    "district" : "",
    "country" : "Chile",
    "documentType" : "RUT",
    "document" : "62871818-0",
    "active" : true,
    "delete" : false,
    "tag" : "legal-related"
  },
  {
    "id" : "6628481b-262e-4f7d-b468-0354ff6e8575",
    "name" : "Cliente de prueba 2 para Editar",
    "businessName" : "Test Client S.A ",
    "address" : "Calle falsa 1234",
    "city" : "Santiago",
    "state" : "R. Metropolitana",
    "county" : "",
    "district" : "",
    "country" : "Chile",
    "documentType" : "RUT",
    "document" : "70599933-3",
    "active" : true,
    "delete" : false,
    "tag" : ""
  }
    
    
]
  
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