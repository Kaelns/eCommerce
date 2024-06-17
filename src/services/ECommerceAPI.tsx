import {
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  CustomerPagedQueryResponse,
  CustomerSignInResult,
  CustomerSignin,
  MyCustomerChangePassword,
  MyCustomerSignin,
  MyCustomerUpdate,
  ProductProjection,
  ProductProjectionPagedSearchResponse
} from '@commercetools/platform-sdk';
import ApiClient from '@/services/ECommerceInitApi';
import { ICreateCustomerParams } from '@/services/ECommerceInitApi.interface';
import { checkUndefined } from '@/utils/checkUndefined';
import { buildCategoryTree } from '@/services/helpers/buildCategoryTree/buildCategoryTree';
import { IConvertToFilterParamsReturn } from '@/services/helpers/convertToFilterParams/convertToFilterParams.interface';
import { ICategoriesObj } from '@/context/ECommerceContext/ECommerceContext.interface';
import { LIMIT_ON_PAGE } from '@/services/ECommerceInitApi.constants';

class ECommerceAPI {
  private api: ApiClient;

  public categories: Category[] = [];

  private anonymousCartId!: string;

  constructor() {
    this.api = new ApiClient();
    this.createAnonymousUser();
  }

  public async createCustomer(params: ICreateCustomerParams): Promise<ClientResponse<CustomerSignInResult>> {
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
        this.api.getApiRootWithPassword(email, password);
        return response;
      }) as Promise<ClientResponse<CustomerSignInResult>>;
  }

  public async authenticateCustomer(email: string, password: string): Promise<ClientResponse<MyCustomerSignin>> {
    return this.api
      .getApiRoot()
      .login()
      .post({
        body: {
          email,
          password,
          anonymousCart: {
            id: localStorage.getItem('anonymousCart') as string,
            typeId: 'cart'
          },
          anonymousCartSignInMode: 'MergeWithExistingCustomerCart'
        }
      })
      .execute()
      .then((response) => {
        this.api.getTokenCache();
        localStorage.setItem('Token', this.api.getTokenCache().get().token);
        return response;
      }) as Promise<ClientResponse<CustomerSignin>>;
  }

  public async returnCustomerByEmail(customerEmail: string): Promise<ClientResponse<CustomerPagedQueryResponse>> {
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

  async getProductsAll(
    parameters: IConvertToFilterParamsReturn
  ): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    return this.api
      .getApiRoot()
      .productProjections()
      .search()
      .get({ queryArgs: { limit: LIMIT_ON_PAGE, ...parameters } })
      .execute() as Promise<ClientResponse<ProductProjectionPagedSearchResponse>>;
  }

  public async getProduct(key: string): Promise<ClientResponse<ProductProjection>> {
    return this.api.getApiRoot().productProjections().withKey({ key }).get().execute() as Promise<
      ClientResponse<ProductProjection>
    >;
  }

  async getCategoryAll(): Promise<ICategoriesObj> {
    const responce = await (this.api.getApiRoot().categories().get().execute() as Promise<
      ClientResponse<CategoryPagedQueryResponse>
    >);
    const categories = responce.body!.results;
    const categoriesTree = buildCategoryTree(categories);
    this.categories = categories;
    return { categories, categoriesTree };
  }

  public async getUser(token: string): Promise<ClientResponse> {
    return this.api.getApiRootWithToken(token).me().get().execute() as Promise<ClientResponse>;
  }

  // this Request for update user data
  public async updateUser(token: string, body: MyCustomerUpdate): Promise<ClientResponse> {
    return this.api.getApiRootWithToken(token).me().post({ body }).execute() as Promise<ClientResponse>;
  }

  // this request for create anonymousCart
  public async createAnonymousUser(): Promise<ClientResponse> {
    return this.api
      .getApiRootWithAnonymousSession(/* true */)
      .get()
      .execute()
      .then((response) => {
        this.api.getTokenCache();
        localStorage.setItem('AnonToken', this.api.getTokenCache().get().token);
        return response;
      }) as Promise<ClientResponse>;
  }

  public async getCart(token: string): Promise<ClientResponse> {
    return this.api.getApiRootWithToken(token).me().carts().get().execute() as Promise<ClientResponse>;
  }

  // this request for create anonymousCart
  public async createCart(token: string): Promise<ClientResponse> {
    const cartDraft = {
      currency: 'USD',
      country: 'US'
    };
    return this.api
      .getApiRootWithToken(token)
      .me()
      .carts()
      .post({ body: cartDraft })
      .execute() as Promise<ClientResponse>;
  }

  public getAnonymousCartId(): string {
    return this.anonymousCartId;
  }

  public async updateCart(token: string, cartId: string, productId: string, version: number): Promise<ClientResponse> {
    return this.api
      .getApiRootWithToken(token)
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addLineItem',
              productId,
              quantity: 1
            }
          ]
        }
      })
      .execute() as Promise<ClientResponse>;
  }

  // this request for delete anonymousCart
  public async deleteCart(token: string, cartId: string, cartVersion: number): Promise<ClientResponse> {
    return this.api
      .getApiRootWithToken(token)
      .carts()
      .withId({ ID: cartId })
      .delete({
        queryArgs: {
          version: cartVersion
        }
      })
      .execute()
      .then((res) => {
        console.log(`Cart deleted: ${res.body.id}`);
        return res;
      });
  }

  // this Request for update user passwword
  public async updateUserPassword(
    token: string,
    body: MyCustomerChangePassword,
    email: string,
    newPassword: string,
    setIsActualData: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<ClientResponse> {
    return this.api
      .getApiRootWithToken(token)
      .me()
      .password()
      .post({ body })
      .execute()
      .then(() => {
        this.logoutCustomer();
        this.authenticateCustomer(email, newPassword).then(() => {
          setIsActualData(false);
        });
      }) as Promise<ClientResponse>;
  }

  public logoutCustomer(): void {
    this.api.getTokenCache().set({ token: '', expirationTime: 1, refreshToken: '' });
    localStorage.removeItem('Token');
    localStorage.removeItem('AnonToken');
    localStorage.removeItem('anonymousCart');
    this.createAnonymousUser();
  }
}

export const eCommerceAPI = new ECommerceAPI();
