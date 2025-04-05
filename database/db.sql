
-- Create Database
CREATE DATABASE IF NOT EXISTS scandiweb;
USE scandiweb;

-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    in_stock BOOLEAN NOT NULL,
    description TEXT,
    category VARCHAR(50),
    brand VARCHAR(100),
    FOREIGN KEY (category) REFERENCES categories(name)
);

-- Create Product Images Table
CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50),
    image_url TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create Attributes Table
CREATE TABLE IF NOT EXISTS attributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50),
    attribute_name VARCHAR(100),
    attribute_type VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create Attribute Items Table
CREATE TABLE IF NOT EXISTS attribute_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attribute_id INT,
    display_value VARCHAR(100),
    value VARCHAR(100),
    FOREIGN KEY (attribute_id) REFERENCES attributes(id)
);

-- Create Prices Table
CREATE TABLE IF NOT EXISTS prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(50),
    amount DECIMAL(10,2),
    currency_label VARCHAR(10),
    currency_symbol VARCHAR(5),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
INSERT IGNORE INTO categories (name) VALUES ('clothes');
INSERT IGNORE INTO categories (name) VALUES ('all');
INSERT IGNORE INTO categories (name) VALUES ('tech');
INSERT INTO products (id, name, in_stock, description, category, brand) VALUES (
    'huarache-x-stussy-le', 'Nike Air Huarache Le', 1, '<p>Great sneakers for everyday use!</p>', 'clothes', 'Nike x Stussy');
INSERT INTO product_images (product_id, image_url) VALUES ('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087');
INSERT INTO product_images (product_id, image_url) VALUES ('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087');
INSERT INTO product_images (product_id, image_url) VALUES ('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087');
INSERT INTO product_images (product_id, image_url) VALUES ('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087');
INSERT INTO product_images (product_id, image_url) VALUES ('huarache-x-stussy-le', 'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087');
INSERT INTO attributes (product_id, attribute_name, attribute_type) VALUES ('huarache-x-stussy-le', 'Size', 'text');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), '40', '40');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), '41', '41');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), '42', '42');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), '43', '43');
INSERT INTO prices (product_id, amount, currency_label, currency_symbol) VALUES ('huarache-x-stussy-le', 144.69, 'USD', '$');
INSERT INTO products (id, name, in_stock, description, category, brand) VALUES (
    'jacket-canada-goosee', 'Jacket', 1, '<p>Awesome winter jacket</p>', 'clothes', 'Canada Goose');
INSERT INTO product_images (product_id, image_url) VALUES ('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png');
INSERT INTO product_images (product_id, image_url) VALUES ('jacket-canada-goosee', 'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png');
INSERT INTO attributes (product_id, attribute_name, attribute_type) VALUES ('jacket-canada-goosee', 'Size', 'text');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Small', 'S');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Medium', 'M');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Large', 'L');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Extra Large', 'XL');
INSERT INTO prices (product_id, amount, currency_label, currency_symbol) VALUES ('jacket-canada-goosee', 518.47, 'USD', '$');
INSERT INTO products (id, name, in_stock, description, category, brand) VALUES (
    'ps-5', 'PlayStation 5', 1, '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>', 'tech', 'Sony');
INSERT INTO product_images (product_id, image_url) VALUES ('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('ps-5', 'https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg');
INSERT INTO attributes (product_id, attribute_name, attribute_type) VALUES ('ps-5', 'Color', 'swatch');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Green', '#44FF03');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Cyan', '#03FFF7');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Blue', '#030BFF');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Black', '#000000');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'White', '#FFFFFF');
INSERT INTO attributes (product_id, attribute_name, attribute_type) VALUES ('ps-5', 'Capacity', 'text');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), '512G', '512G');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), '1T', '1T');
INSERT INTO prices (product_id, amount, currency_label, currency_symbol) VALUES ('ps-5', 844.02, 'USD', '$');
INSERT INTO products (id, name, in_stock, description, category, brand) VALUES (
    'xbox-series-s', 'Xbox Series S 512GB', 0, '
<div>
    <ul>
        <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>
        <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>
        <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>
        <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>
        <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li>
        <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>
        <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>
        <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>
        <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li>
        <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li>
    </ul>
</div>', 'tech', 'Microsoft');
INSERT INTO product_images (product_id, image_url) VALUES ('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg');
INSERT INTO product_images (product_id, image_url) VALUES ('xbox-series-s', 'https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg');
INSERT INTO attributes (product_id, attribute_name, attribute_type) VALUES ('xbox-series-s', 'Color', 'swatch');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Green', '#44FF03');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Cyan', '#03FFF7');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Blue', '#030BFF');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Black', '#000000');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'White', '#FFFFFF');
INSERT INTO attributes (product_id, attribute_name, attribute_type) VALUES ('xbox-series-s', 'Capacity', 'text');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), '512G', '512G');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), '1T', '1T');
INSERT INTO prices (product_id, amount, currency_label, currency_symbol) VALUES ('xbox-series-s', 333.99, 'USD', '$');
INSERT INTO products (id, name, in_stock, description, category, brand) VALUES (
    'apple-imac-2021', 'iMac 2021', 1, 'The new iMac!', 'tech', 'Apple');
INSERT INTO product_images (product_id, image_url) VALUES ('apple-imac-2021', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000');
INSERT INTO attributes (product_id, attribute_name, attribute_type) VALUES ('apple-imac-2021', 'Capacity', 'text');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), '256GB', '256GB');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), '512GB', '512GB');
INSERT INTO attributes (product_id, attribute_name, attribute_type) VALUES ('apple-imac-2021', 'With USB 3 ports', 'text');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Yes', 'Yes');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'No', 'No');
INSERT INTO attributes (product_id, attribute_name, attribute_type) VALUES ('apple-imac-2021', 'Touch ID in keyboard', 'text');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Yes', 'Yes');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'No', 'No');
INSERT INTO prices (product_id, amount, currency_label, currency_symbol) VALUES ('apple-imac-2021', 1688.03, 'USD', '$');
INSERT INTO products (id, name, in_stock, description, category, brand) VALUES (
    'apple-iphone-12-pro', 'iPhone 12 Pro', 1, 'This is iPhone 12. Nothing else to say.', 'tech', 'Apple');
INSERT INTO product_images (product_id, image_url) VALUES ('apple-iphone-12-pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000');
INSERT INTO attributes (product_id, attribute_name, attribute_type) VALUES ('apple-iphone-12-pro', 'Capacity', 'text');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), '512G', '512G');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), '1T', '1T');
INSERT INTO attributes (product_id, attribute_name, attribute_type) VALUES ('apple-iphone-12-pro', 'Color', 'swatch');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Green', '#44FF03');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Cyan', '#03FFF7');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Blue', '#030BFF');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'Black', '#000000');
INSERT INTO attribute_items (attribute_id, display_value, value) VALUES ((SELECT MAX(id) FROM attributes), 'White', '#FFFFFF');
INSERT INTO prices (product_id, amount, currency_label, currency_symbol) VALUES ('apple-iphone-12-pro', 1000.76, 'USD', '$');
INSERT INTO products (id, name, in_stock, description, category, brand) VALUES (
    'apple-airpods-pro', 'AirPods Pro', 0, '
<h3>Magic like you’ve never heard</h3>
<p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case.

<h3>Active Noise Cancellation</h3>
<p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.

<h3>Transparency mode</h3>
<p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you.</p>

<h3>All-new design</h3>
<p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>

<h3>Amazing audio quality</h3>
<p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>

<h3>Even more magical</h3>
<p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>
', 'tech', 'Apple');
INSERT INTO product_images (product_id, image_url) VALUES ('apple-airpods-pro', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000');
INSERT INTO prices (product_id, amount, currency_label, currency_symbol) VALUES ('apple-airpods-pro', 300.23, 'USD', '$');
INSERT INTO products (id, name, in_stock, description, category, brand) VALUES (
    'apple-airtag', 'AirTag', 1, '
<h1>Lose your knack for losing things.</h1>
<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>
', 'tech', 'Apple');
INSERT INTO product_images (product_id, image_url) VALUES ('apple-airtag', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000');
INSERT INTO prices (product_id, amount, currency_label, currency_symbol) VALUES ('apple-airtag', 120.57, 'USD', '$');
