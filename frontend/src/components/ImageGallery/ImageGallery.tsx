import React, { useState } from "react";
import "./ImageGallery.css";
interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="image-gallery-wrapper">
      <div className="image-gallery">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`product-image`}
            onClick={() => setSelectedImage(img)}
            alt="Thumbnail"
          />
        ))}
      </div>
      <div className="selected-image">
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full max-w-md rounded-lg shadow"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
