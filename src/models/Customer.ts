enum LicenseCategory {
  A = 'A',
  B = 'B',
  AB = 'AB',
}

class Customer {
  id: string; 
  name: string;
  cpf: string;
  email: string;
  phone: string;
  licenseCategory: LicenseCategory;

  constructor(id: string, name: string, cpf: string, email: string, phone: string, licenseCategory: LicenseCategory) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.phone = phone;
    this.licenseCategory = licenseCategory;
  }
}

export { Customer, LicenseCategory };