// Shopify Integration Service
interface ShopifyConfig {
  domain: string;
  storefrontAccessToken: string;
  adminAccessToken?: string;
}

interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: Array<{
    id: string;
    url: string;
    altText?: string;
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: string;
    compareAtPrice?: string;
    availableForSale: boolean;
    quantityAvailable: number;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
  }>;
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  tags: string[];
  productType: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
}

interface ShopifyCart {
  id: string;
  lines: Array<{
    id: string;
    quantity: number;
    merchandise: {
      id: string;
      title: string;
      selectedOptions: Array<{
        name: string;
        value: string;
      }>;
      product: {
        id: string;
        title: string;
        handle: string;
        images: Array<{
          url: string;
          altText?: string;
        }>;
      };
    };
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
  }>;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  checkoutUrl: string;
}

class ShopifyService {
  private config: ShopifyConfig;

  constructor(config: ShopifyConfig) {
    this.config = config;
  }

  private async graphqlRequest(query: string, variables: any = {}) {
    const response = await fetch(`https://${this.config.domain}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': this.config.storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    return data.data;
  }

  // Get all products
  async getProducts(first: number = 20, after?: string): Promise<{
    products: ShopifyProduct[];
    hasNextPage: boolean;
    endCursor?: string;
  }> {
    const query = `
      query getProducts($first: Int!, $after: String) {
        products(first: $first, after: $after) {
          edges {
            node {
              id
              title
              description
              handle
              images(first: 10) {
                edges {
                  node {
                    id
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                    quantityAvailable
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              options {
                id
                name
                values
              }
              tags
              productType
              vendor
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const data = await this.graphqlRequest(query, { first, after });
    
    return {
      products: data.products.edges.map((edge: any) => ({
        ...edge.node,
        images: edge.node.images.edges.map((img: any) => img.node),
        variants: edge.node.variants.edges.map((variant: any) => ({
          ...variant.node,
          price: variant.node.price.amount,
          compareAtPrice: variant.node.compareAtPrice?.amount,
        })),
      })),
      hasNextPage: data.products.pageInfo.hasNextPage,
      endCursor: data.products.pageInfo.endCursor,
    };
  }

  // Get single product by handle
  async getProduct(handle: string): Promise<ShopifyProduct | null> {
    const query = `
      query getProduct($handle: String!) {
        product(handle: $handle) {
          id
          title
          description
          handle
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                quantityAvailable
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            id
            name
            values
          }
          tags
          productType
          vendor
          createdAt
          updatedAt
        }
      }
    `;

    const data = await this.graphqlRequest(query, { handle });
    
    if (!data.product) return null;

    return {
      ...data.product,
      images: data.product.images.edges.map((img: any) => img.node),
      variants: data.product.variants.edges.map((variant: any) => ({
        ...variant.node,
        price: variant.node.price.amount,
        compareAtPrice: variant.node.compareAtPrice?.amount,
      })),
    };
  }

  // Create cart
  async createCart(): Promise<ShopifyCart> {
    const query = `
      mutation cartCreate {
        cartCreate {
          cart {
            id
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        id
                        title
                        handle
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
            }
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const data = await this.graphqlRequest(query);
    
    if (data.cartCreate.userErrors.length > 0) {
      throw new Error(`Cart creation failed: ${data.cartCreate.userErrors[0].message}`);
    }

    return this.formatCart(data.cartCreate.cart);
  }

  // Add items to cart
  async addToCart(cartId: string, lines: Array<{
    merchandiseId: string;
    quantity: number;
  }>): Promise<ShopifyCart> {
    const query = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        id
                        title
                        handle
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
            }
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const data = await this.graphqlRequest(query, { cartId, lines });
    
    if (data.cartLinesAdd.userErrors.length > 0) {
      throw new Error(`Add to cart failed: ${data.cartLinesAdd.userErrors[0].message}`);
    }

    return this.formatCart(data.cartLinesAdd.cart);
  }

  // Update cart line quantities
  async updateCartLines(cartId: string, lines: Array<{
    id: string;
    quantity: number;
  }>): Promise<ShopifyCart> {
    const query = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        id
                        title
                        handle
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
            }
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const data = await this.graphqlRequest(query, { cartId, lines });
    
    if (data.cartLinesUpdate.userErrors.length > 0) {
      throw new Error(`Cart update failed: ${data.cartLinesUpdate.userErrors[0].message}`);
    }

    return this.formatCart(data.cartLinesUpdate.cart);
  }

  // Remove lines from cart
  async removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
    const query = `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      selectedOptions {
                        name
                        value
                      }
                      product {
                        id
                        title
                        handle
                        images(first: 1) {
                          edges {
                            node {
                              url
                              altText
                            }
                          }
                        }
                      }
                    }
                  }
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
            }
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const data = await this.graphqlRequest(query, { cartId, lineIds });
    
    if (data.cartLinesRemove.userErrors.length > 0) {
      throw new Error(`Remove from cart failed: ${data.cartLinesRemove.userErrors[0].message}`);
    }

    return this.formatCart(data.cartLinesRemove.cart);
  }

  private formatCart(cart: any): ShopifyCart {
    return {
      ...cart,
      lines: cart.lines.edges.map((edge: any) => ({
        ...edge.node,
        merchandise: {
          ...edge.node.merchandise,
          product: {
            ...edge.node.merchandise.product,
            images: edge.node.merchandise.product.images.edges.map((img: any) => img.node),
          },
        },
      })),
    };
  }
}

// Initialize Shopify service
// Replace with your actual Shopify store credentials
export const shopifyService = new ShopifyService({
  domain: 'your-store.myshopify.com', // Replace with your store domain
  storefrontAccessToken: 'your-storefront-access-token', // Replace with your token
});

export type { ShopifyProduct, ShopifyCart };