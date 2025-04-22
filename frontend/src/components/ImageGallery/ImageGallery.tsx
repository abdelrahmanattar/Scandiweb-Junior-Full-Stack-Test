import React, { useState } from "react";
import "./ImageGallery.css";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
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

export default ImageGallery;
