import { ClientResponse } from '@commercetools/sdk-client-v2';
import { CustomerPagedQueryResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import ApiClient from '@/services/ECommerceInitApi';
import { ICreateCustomerParams } from '@/services/ECommerceInitApi.interface';
import { checkUndefined } from '@/utils/checkUndefined';

class ECommerceAPI {
  private api: ApiClient;

  constructor() {
    this.api = new ApiClient();
  }

  async createCustomer(params: ICreateCustomerParams): Promise<ClientResponse<CustomerSignInResult>> {
    const {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      addresses,
      shippingAddresses,
      billingAddresses,
      defaultBillingAddress,
      defaultShippingAddress
    } = params;
    const customerData: ICreateCustomerParams = {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      addresses,
      shippingAddresses
    };

    if (checkUndefined(billingAddresses)) {
      customerData.billingAddresses = billingAddresses;
    }
    if (checkUndefined(defaultBillingAddress)) {
      customerData.defaultBillingAddress = defaultBillingAddress;
    }
    if (checkUndefined(defaultShippingAddress)) {
      customerData.defaultShippingAddress = defaultShippingAddress;
    }
    return this.api
      .getApiRoot()
      .customers()
      .post({
        body: customerData
      })
      .execute()
      .then((response) => {
        this.api.getTokenCache();
        return response;
      }) as Promise<ClientResponse<CustomerSignInResult>>;
  }

  async authenticateCustomer(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
    return this.api
      .getApiRootWithPassword(email, password)
      .me()
      .login()
      .post({
        body: {
          email,
          password
        }
      })
      .execute()
      .then((response) => {
        this.api.getTokenCache();
        return response;
      }) as Promise<ClientResponse<CustomerSignInResult>>;
  }

  async returnCustomerByEmail(customerEmail: string): Promise<ClientResponse<CustomerPagedQueryResponse>> {
    return this.api
      .getApiRoot()
      .customers()
      .get({
        queryArgs: {
          where: `email="${customerEmail}"`
        }
      })
      .execute() as Promise<ClientResponse<CustomerPagedQueryResponse>>;
  }
}

export const eCommerceAPI = new ECommerceAPI();
