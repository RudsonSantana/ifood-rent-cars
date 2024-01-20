import { Customer, LicenseCategory } from '../models/customerModel';

class CustomerRepository {
  private customers: Customer[] = [];

  getAllCustomers(): Customer[] {
    return this.customers;
  }

  getCustomerById(customerId: string): Customer | undefined {
    return this.customers.find((customer) => customer.id === customerId);
  }

  createCustomer(newCustomer: Customer): Customer {
    this.customers.push(newCustomer);
    console.log(newCustomer)
    return newCustomer;
  }
}

const customerRepository = new CustomerRepository();

export { customerRepository };
