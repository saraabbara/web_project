import villaImg from "../assets/images/project-villa.png";
import palacePoolImg from "../assets/images/project-palace-pool.png";
import palaceInteriorImg from "../assets/images/project-palace-interior.png";
import hospitalImg from "../assets/images/project-hospital.png";
import mallImg from "../assets/images/project-mall.png";
import majlisImg from "../assets/images/project-majlis.png";

export const projects = [
  {
    id: "private-villa",
    title: "Private Villa",
    category: "Residential",
    location: "Riyadh, KSA",
    year: "2024",
    image: villaImg,
    layout: "large",
    description:
      "A private residential villa designed with clean architectural lines, elegant finishing, and a refined modern exterior.",
    gallery: [villaImg, palacePoolImg, palaceInteriorImg],
  },
  {
    id: "private-palace-pool",
    title: "Private Palace",
    category: "Residential",
    location: "Riyadh, KSA",
    year: "2024",
    image: palacePoolImg,
    layout: "small",
    description:
      "A luxurious private palace surrounded by elegant outdoor landscaping and classic architectural detailing.",
    gallery: [palacePoolImg, villaImg, majlisImg],
  },
  {
    id: "private-palace-interior",
    title: "Private Palace",
    category: "Residential",
    location: "Riyadh, KSA",
    year: "2024",
    image: palaceInteriorImg,
    layout: "small",
    description:
      "A palace interior project featuring rich materials, ornamental details, and a timeless luxury atmosphere.",
    gallery: [palaceInteriorImg, majlisImg, palacePoolImg],
  },
  {
    id: "hospital",
    title: "Hospital",
    category: "Hospitality",
    location: "Riyadh, KSA",
    year: "2024",
    image: hospitalImg,
    layout: "medium",
    description:
      "A hospitality project designed with functionality, durability, and a welcoming visitor experience in mind.",
    gallery: [hospitalImg, mallImg, villaImg],
  },
  {
    id: "mall",
    title: "Mall",
    category: "Commercial",
    location: "Riyadh, KSA",
    year: "2024",
    image: mallImg,
    layout: "medium",
    description:
      "A commercial project with a strong architectural presence, refined exterior finishing, and practical circulation.",
    gallery: [mallImg, hospitalImg, villaImg],
  },
  {
    id: "private-palace-majlis",
    title: "Private Palace",
    category: "Residential",
    location: "Riyadh, KSA",
    year: "2024",
    image: majlisImg,
    layout: "wide",
    description:
      "A luxurious majlis interior with bespoke furniture, rich fabrics, and warm decorative detailing.",
    gallery: [majlisImg, palaceInteriorImg, palacePoolImg],
  },
];
