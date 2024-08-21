import img1 from "../images/img1.jpg.jfif";
import img2 from "../images/img2.jpg.jfif";
import img3 from "../images/img3.jfif";

const propertiesData = [
  {
    propertyId: 1,
    title: "Beautiful Family House",
    location: "New York",
    address: "123 Main St, New York, NY",
    propertyType: "House",
    price: 500000,
    description: "A beautiful family house located in the heart of New York.",
    image: img2,
  },
  {
    propertyId: 2,
    title: "Modern Apartment",
    location: "Los Angeles",
    address: "456 Elm St, Los Angeles, CA",
    propertyType: "Apartment",
    price: 350000,
    description: "A modern apartment with all amenities.",
    image: img1,
  },
  {
    propertyId: 3,
    title: "Cozy Cottage",
    location: "San Francisco",
    address: "789 Oak St, San Francisco, CA",
    propertyType: "Cottage",
    price: 250000,
    description: "A cozy cottage perfect for a small family.",
    image: img3,
  },
  // Add more properties as needed
];

export default propertiesData;
