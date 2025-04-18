import React from "react";
import { useQuery } from "@apollo/client";
import ProductCard from "@/components/ProductCard/ProductCard";
import { GET_PRODUCTS_BY_CATEGORY } from "@/graphql/queries";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import Loading from "@/components/Loading";
import { addItem } from "@/store/slices/cartSlice";
import "./CategoryPage.css";

interface CategoryPageProps {
  openCart: () => void;
  variables?: {
    category: string | null;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ openCart, variables }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables,
    fetchPolicy: "network-only",
  });
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: any) => {
    const defaultAttributes: { [key: string]: string } = {};
    if (product.attributes && product.attributes.length > 0) {
      product.attributes.forEach((attr: any) => {
        if (attr.attribute_item && attr.attribute_item.length > 0) {
          defaultAttributes[attr.attribute_name] = attr.attribute_item[0].value;
        }
      });
    }

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price.amount,
        quantity: 1,
        all_attributes: product.attributes,
        attributes: defaultAttributes,
        image: product.images[0],
      })
    );
    openCart();
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="product-container">
      <div className="product-wrapper">
        <h2 className="sr-only">Products</h2>
        {data.productsByCategory && (
          <div className="product-grid">
            {data.productsByCategory.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
