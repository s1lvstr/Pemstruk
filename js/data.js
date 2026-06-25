    const products = [
        {
            id: 1,
            name: "Heathered Grey Suit",
            category: "Signature Suit",
            price: "Rp 4.500.000",
            image: "assets/products/HeatheredGrey-suit.png",
            description: "Elegant grey tailored suit crafted for formal occasions."
        },
        {
            id: 2,
            name: "Royal Navy Suit",
            category: "Signature Suit",
            price: "Rp 4.800.000",
            image: "assets/products/RoyalNavy-suit.png",
            description: "Premium navy blue suit with a modern slim-fit silhouette."
        },
        {
            id: 3,
            name: "Charcoal Striated Suit",
            category: "Signature Suit",
            price: "Rp 5.100.000",
            image: "assets/products/CharcoalStriated-suit.png",
            description: "Modern charcoal suit with a striated pattern for a sophisticated look."
        },
        {
            id: 4,
            name: "Midnight Pinstripe Suit",
            category: "Signature Suit",
            price: "Rp 5.300.000",
            image: "assets/products/MidnightPinstripe-suit.png",
            description: "Refined pinstripe tailoring crafted for evening events and business meetings."
        },
        {
            id: 5,
            name: "Slim Fit Black Blazer",
            category: "Blazer",
            price: "Rp 1.100.000",
            image: "assets/products/SlimFit2Button-blazer.png",
            description: "Modern black blazer with a slim fit for a tailored look."
        },
        {
            id: 6,
            name: "Black Tiger Blazer",
            category: "Blazer",
            price: "Rp 1.200.000",
            image: "assets/products/BlackTiger-blazer.png",
            description: "Stylish black blazer with a tiger print for a bold statement."
        },
        {
            id: 7,
            name: "Cardinal Formal Blazer",
            category: "Blazer",
            price: "Rp 1.300.000",
            image: "assets/products/CardinalFormal-blazer.png",
            description: "Elegant formal blazer in a classic cardinal color."
        },
        {
            id: 8,
            name: "Navy Pinstripe Blazer",
            category: "Blazer",
            price: "Rp 1.450.000",
            image: "assets/products/NavyPinstripe-blazer.png",
            description: "Elegant pinstripe blazer in a classic navy color."
        },
        {
            id: 9,
            name: "Comfort Gray Blazer",
            category: "Blazer",
            price: "Rp 1.450.000",
            image: "assets/products/ComfortGray-blazer.png",
            description: "Comfortable gray blazer for a sophisticated look."
        },
        {
            id: 10,
            name: "Oxford Blue Shirt",
            category: "Shirt",
            price: "Rp 700.000",
            image: "assets/products/OxfordBlue-shirt.png",
            description: "Sophisticated blue Oxford shirt suitable for casual and formal wear."
        },
        {
            id: 11,
            name: "Black Syntetic Leather Shoes",
            category: "Footwear",
            price: "Rp 1.500.000",
            image: "assets/products/SepatuSpinEtam.png",
            description: "Elegant synthetic leather shoes for a polished look."
        },
        {
            id: 12,
            name: "Classic Black Calfskin Leather Shoes",
            category: "Footwear",
            price: "Rp 2.000.000",
            image: "assets/products/ClassicBlackCalfskin-shoe.png",
            description: "Timeless black calfskin leather shoes for a sophisticated look."
        },
        {
            id: 13,
            name: "Weston Edouard Cap-Toe Shoes",
            category: "Footwear",
            price: "Rp 2.000.000",
            image: "assets/products/WestonEdouard-shoe.png",
            description: "Elegant cap-toe shoes with a classic design."
        },
        {
            id: 14,
            name: "Premium Matte Fraux Leather Shoes",
            category: "Footwear",
            price: "Rp 1.800.000",
            image: "assets/products/PremiumMatteFraux-shoe.png",
            description: "Premium matte fraux leather shoes for a sophisticated look."
        },
        {
            id: 15,
            name: "Classic Brown Derby Shoes",
            category: "Footwear",
            price: "Rp 1.800.000",
            image: "assets/products/ClassicBrownDerby-shoe.png",
            description: "Classic brown derby shoes for a sophisticated look."
        },
        {
            id: 16,
            name: "J.Press Regimental Tie",
            category: "Accessory",
            price: "Rp 350.000",
            image: "assets/products/J.PressRegimental-tie.png",
            description: "Classic regimental tie from J.Press."
        },
        {
            id: 17,
            name: "Delta Upsilon Neck Tie",
            category: "Accessory",
            price: "Rp 300.000",
            image: "assets/products/DeltaUpsilon-tie.png",
            description: "Classic neck tie from Delta Upsilon."
        },
        {
            id: 18,
            name: "Derby Moor Spirit House Tie",
            category: "Accessory",
            price: "Rp 350.000",
            image: "assets/products/DerbyMoor-tie.png",
            description: "Classic neck tie from Derby Moor Spirit House."
        },
        {
            id: 19,
            name: "Pocklington Dolman House Tie",
            category: "Accessory",
            price: "Rp 300.000",
            image: "assets/products/PocklingtonDolman-tie.png",
            description: "Classic neck tie from Pocklington Dolman House."
        },
        {
            id: 20,
            name: "Alizeal Mens Tie",
            category: "Accessory",
            price: "Rp 250.000",
            image: "assets/products/AlizealMens-tie.png",
            description: "Classic neck tie from Alizeal."
        },
        {
            id: 21,
            name: "Classic Black Tie",
            category: "Accessory",
            price: "Rp 200.000",
            image: "assets/products/DasiSpinEtam.png",
            description: "Classic black tie for formal occasions."
        },
        {
            id: 22,
            name: "Rolex Submariner Watch",
            category: "Accessory",
            price: "Rp 3.250.000",
            image: "assets/products/RolexSubmariner-watch.png",
            description: "Iconic diving watch with a robust build and timeless design."
        },
        {
            id: 23,
            name: "Tissot Gentleman Powermatic 80 Watch",
            category: "Accessory",
            price: "Rp 19.000.000",
            image: "assets/products/TissotPowermatic80-watch.png",
            description: "Elegant automatic watch with a sophisticated design."
        },
        {
            id: 24,
            name: "D1 Milano Polycarbon Watch",
            category: "Accessory",
            price: "Rp 3.500.000",
            image: "assets/products/MilanoPolycarbon-watch.png",
            description: "Elegant watch with a modern design and high-quality materials."
        },
        {
            id: 25,
            name: "Emporio Armani Mario Chronograph Watch",
            category: "Accessory",
            price: "Rp 5.500.000",
            image: "assets/products/EmporioChronograph-watch.png",
            description: "Sophisticated chronograph watch with a stylish design and reliable performance."
        },
        {
            id: 26,
            name: "Fossil Neutra Chronograph Watch",
            category: "Accessory",
            price: "Rp 3.000.000",
            image: "assets/products/FossilChronograph-watch.png",
            description: "Durable chronograph watch with a classic design and versatile functionality."
        },
        {
            id: 27,
            name: "Cartier Santos de Cartier watch",
            category: "Accessory",
            price: "Rp 12.000.000",
            image: "assets/products/CartierSantosdeCartier-watch.png",
            description: "Luxury watch with a timeless design and exceptional craftsmanship."
        }
    ];

    window.PRODUCTS = products;