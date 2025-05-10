import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price {
        amount
        currency_label
        currency_symbol
      }
      images
      in_stock
    }
  }
`;


export const GET_CATEGORIES = gql`
  query GetCategory {
    categories {
      id
      name
    }
  }
`;


export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String) {
    productsByCategory(category: $category) {
      id
      name
      price {
        amount
        currency_label
        currency_symbol
      }
      attributes {
        attribute_name
        attribute_type
        attribute_item {
          display_value
          value
        }
      }
      images
      in_stock
    }
  }
`;

export const GET_PRODUCTS_BY_ID = gql`
  query GetProductsByID($id: String) {
    product(id: $id) {
      id
      name
      price {
        amount
        currency_label
        currency_symbol
      }
      description
      attributes {
        attribute_name
        attribute_type
        attribute_item {
          display_value
          value
        }
      }
      images
      in_stock
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation placeOrder($order_items: [OrderItemInput!]!, $status: String) {
    placeOrder(order_items: $order_items, status: $status) {
      id
      status
      total_price
      created_at
    }
  }
`;
