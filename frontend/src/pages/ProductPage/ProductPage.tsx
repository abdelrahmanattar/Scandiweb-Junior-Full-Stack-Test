import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_ID } from "@/graphql/queries";
import "./ProductPage.css";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import ProductInfo from "@/components/ProductInfo/ProductInfo";

const ProductPage = ({ openCart }: { openCart: () => void }) => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_ID, {
    variables: { id },
  });

  const dispatch = useAppDispatch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data?.product;

  return (
    <div className="product-details-container">
      <ImageGallery images={product.images} />
      <ProductInfo product={product} dispatch={dispatch} openCart={openCart} />
    </div>
  );
};

export default ProductPage;
