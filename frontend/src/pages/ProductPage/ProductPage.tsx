import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_ID } from "@/graphql/queries";
import parse from "html-react-parser";
import "./ProductPage.css";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addItem } from "@/store/slices/cartSlice";

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
      <ProductImages images={product.images} />
      <ProductInfo product={product} dispatch={dispatch} openCart={openCart} />
    </div>
  );
};

const ProductImages = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="product-images">
      <div className="thumbnail-column">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`thumbnail-${idx}`}
            className={`thumbnail ${selectedImage === img ? "active" : ""}`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
      <div className="main-image-container">
        <img src={selectedImage} alt="main" className="main-image" />
      </div>
    </div>
  );
};

const ProductInfo = ({
  product,
  dispatch,
  openCart,
}: {
  product: any;
  dispatch: any;
  openCart: () => void;
}) => {
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});

  const handleSelect = (attrId: string, value: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrId]: value }));
  };

  const handleAddToCart = () => {
    const attributesComplete =
      Object.keys(selectedAttributes).length === product.attributes.length;

    if (!attributesComplete) {
      alert("Please select all product attributes!");
      return;
    }

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price.amount,
        quantity: 1,
        attributes: selectedAttributes,
        all_attributes: product.attributes,
        image: product.images[0],
      })
    );

    openCart();
  };

  const isDisabled = !product.in_stock;

  return (
    <div className="product-info">
      <h1 className="product-name">{product.name}</h1>

      {product.attributes &&
        product.attributes.map((attr: any) => (
          <div key={attr.attribute_name} className="attribute-section">
            <p className="label">{attr.attribute_name.toUpperCase()}:</p>
            <div className="attribute-options">
              {attr.attribute_item.map((item: any, idx: number) => {
                const isSelected =
                  selectedAttributes[attr.attribute_name] === item.value;
                return attr.attribute_type === "text" ? (
                  <button
                    key={idx}
                    className={`attribute-values ${
                      isSelected ? "selected-size" : ""
                    }`}
                    onClick={() =>
                      handleSelect(attr.attribute_name, item.value)
                    }
                  >
                    {item.value}
                  </button>
                ) : (
                  <div
                    key={idx}
                    className={`attribute-values ${
                      isSelected ? "selected-color" : ""
                    }`}
                    onClick={() =>
                      handleSelect(attr.attribute_name, item.value)
                    }
                    style={{
                      backgroundColor: item.value,
                      border: isSelected ? "2px solid #000" : "1px solid #ccc",
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        ))}

      <div>
        <p className="label">PRICE:</p>
        <p className="product-price">
          {product.price.currency_symbol}
          {product.price.amount}
        </p>
      </div>

      <button
        className={`add-to-cart-button ${isDisabled ? "disabled" : ""}`}
        onClick={handleAddToCart}
        disabled={isDisabled}
      >
        ADD TO CART
      </button>

      <p className="product-description">{parse(product.description)}</p>
    </div>
  );
};

export default ProductPage;
