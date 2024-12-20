import { Brand } from "@/types/brand";
import { Vendor } from "@/types/vendor";
import {
  CreateProductWorkflowInputDTO,
  ProductCategoryDTO,
  SalesChannelDTO,
} from "@medusajs/framework/types";

const vendors: Vendor[] = [
  {
    title: "Company X",
    company_id: "98882122",
    email: "companyx@gmail.com",
    phone: "+995 551 213 221",
    address: {
      country: "GE",
      city: "Tbilisi",
      street: "chavchavadze avenue 33",
    },
  },
  {
    title: "Company Z",
    company_id: "93382122",
    email: "companyz@gmail.com",
    phone: "+995 551 213 221",
    address: {
      country: "GE",
      city: "Tbilisi",
      street: "chavchavadze avenue 38",
    },
  },
  {
    title: "Qnari Group",
    company_id: "97782122",
    email: "info@qnarigroup.com",
    phone: "+995 551 213 221",
    address: {
      country: "GE",
      city: "Tbilisi",
      street: "chavchavadze avenue 36",
    },
  },
];

const brands: Brand[] = [
  { title: "Château Montrose" },
  { title: "Silver Oak" },
  { title: "Opus One" },
  { title: "Domaine de la Romanée-Conti" },
  { title: "Beringer" },
  { title: "Penfolds" },
  { title: "Gaja" },
  { title: "Robert Mondavi" },
  { title: "Pétrus" },
  { title: "Louis-Benjamin" },
  { title: "Tignanello" },
  { title: "Antinori" },
  { title: "Marchesi di Barolo" },
  { title: "Vega Sicilia" },
  { title: "Caymus Vineyards" },
  { title: "The Prisoner Wine Company" },
  { title: "La Rioja Alta" },
  { title: "Masi Agricola" },
  { title: "Cahors Winery" },
  { title: "Château Lafite Rothschild" },
  { title: "Terrazas de los Andes" },
  { title: "Bodegas Catena Zapata" },
  { title: "Bodegas Roda" },
  { title: "M. Chapoutier" },
  { title: "Col d'Orcia" },
  { title: "Castello di Ama" },
  { title: "Frescobaldi" },
  { title: "Château Margaux" },
  { title: "Larkmead Vineyards" },
  { title: "Domaine Carneros" },
];

const wines = [
  "Chardonnay",
  "Sauvignon Blanc",
  "Cabernet Sauvignon",
  "Merlot",
  "Pinot Noir",
  "Shiraz",
  "Riesling",
  "Malbec",
  "Zinfandel",
  "Grenache",
  "Syrah",
  "Sangiovese",
  "Tempranillo",
  "Cabernet Franc",
  "Chenin Blanc",
  "Semillon",
  "Pinot Grigio",
  "Moscato",
  "Sauvignon Gris",
  "Viognier",
  "Petit Verdot",
  "Touriga Nacional",
  "Fiano",
  "Verdelho",
  "Albarino",
  "Carmenere",
  "Aglianico",
  "Mourvedre",
  "Nebbiolo",
  "Barbera",
  "Tannat",
];

const imageURLs = [
  "https://www.pngfind.com/pngs/m/44-446614_wine-bottle-png-image-bottle-of-wine-transparent.png",
  "https://www.pngfind.com/pngs/m/44-447796_for-the-wines-we-created-one-universal-label.png",
  "https://www.pngfind.com/pngs/m/524-5242702_2014-thirty-one-productions-rose-glass-bottle-hd.png",
  "https://www.pngfind.com/pngs/m/98-984360_green-wine-bottle-png-clipart-green-wine-bottle.png",
  "https://www.pngfind.com/pngs/m/44-446932_2238-x-8000-7-clip-art-champagne-bottle.png",
  "https://www.pngfind.com/pngs/m/44-443898_bottle-png-images-free-download-transparent-wine-bottle.png",
  "https://www.pngfind.com/pngs/m/195-1955966_red-wine-png-wine-bottle-transparent-png.png",
  "https://www.pngfind.com/pngs/m/54-543274_2087-x-8000-3-transparent-background-red-wine.png",
  "https://www.pngfind.com/pngs/m/268-2688395_wine-bottle-wine-bottle-image-no-background-hd.png",
  "https://www.pngfind.com/pngs/m/195-1955999_blossom-hill-red-wine-bottle-hd-png-download.png",
  "https://www.pngfind.com/pngs/m/482-4824145_personal-wine-can-handle-all-donation-revenues-or.png",
  "https://www.pngfind.com/pngs/m/347-3475462_kit-kaboodle-wine-bottle-design-wine-label-design.png",
  "https://www.pngfind.com/pngs/m/44-444628_brut-bottle-sparkling-wine-hd-png-download.png",
  "https://www.pngfind.com/pngs/m/7-70905_wine-bottle-wine-bottle-wine-png-transparent-png.png",
  "https://www.pngfind.com/pngs/m/570-5700072_53620-broken-earth-pull-chardonnay-w-wine-bottle.png",
  "https://www.pngfind.com/pngs/m/266-2665580_2015-california-red-wine-wine-bottle-hd-png.png",
  "https://www.pngfind.com/pngs/m/195-1956459_morellone-piceno-wine-bottle-hd-png-download.png",
  "https://www.pngfind.com/pngs/m/365-3652435_idilio-rose-wine-bottle-hd-png-download.png",
  "https://www.pngfind.com/pngs/m/7-71749_bottle-png-image-free-download-image-of-bottle.png",
  "https://www.pngfind.com/pngs/m/526-5260849_bottle-shots-wine-bottle-hd-png-download.png",
  "https://www.pngfind.com/pngs/m/152-1524628_roza-hills-black-magic-wine-bottle-hd-png.png",
  "https://www.pngfind.com/pngs/m/362-3627237_2016-stonybroke-shiraz-wine-bottle-hd-png-download.png",
  "https://www.pngfind.com/pngs/m/362-3627237_2016-stonybroke-shiraz-wine-bottle-hd-png-download.png",
  "https://www.pngfind.com/pngs/m/422-4225057_descargar-botella-wine-bottle-hd-png-download.png",
  "https://www.pngfind.com/pngs/m/518-5187112_wine-bottle-hd-png-download.png",
  "https://www.pngfind.com/pngs/m/684-6840624_wine-bottle-hd-png-download.png",
  "https://www.pngfind.com/pngs/m/44-446431_2015-oregon-pinot-noir-joel-gott-hd-png.png",
  "https://www.pngfind.com/pngs/m/44-448134_twomey-anderson-valley-pinot-noir-twomey-by-silver.png",
  "https://www.pngfind.com/pngs/m/98-984587_vintage-mobile-phone-hd-png-download.png",
];

// Helper function to get a random element from an array
function getRandomElement(arr: (string | number)[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface GenerateProductsInput {
  salesChannels: SalesChannelDTO[];
  categoryResult?: ProductCategoryDTO[];
}

const generateProductsList = (input: GenerateProductsInput) => {
  const { salesChannels, categoryResult } = input;
  const category_ids: CreateProductWorkflowInputDTO["category_ids"] = [];

  const category_id = categoryResult?.find((i) => i.name === "Wine")?.id;
  if (category_id) {
    category_ids.push(category_id);
  }

  const products: CreateProductWorkflowInputDTO[] = wines.map((name, index) => {
    return {
      sales_channels: [{ id: salesChannels[0].id }],
      title: name,
      subtitle: name,
      origin_country: "ge",
      status: "published",
      category_ids,
      options: [
        {
          title: "Volume",
          values: ["750"],
        },
      ],
      variants: [
        {
          title: `${name} 750ml`,
          sku: `${name.toLowerCase().replace(/\s/g, "-")}-750`,
          prices: [{ amount: (index + 1) * 5, currency_code: "gel" }], // Varying price based on index
        },
      ],
      thumbnail: imageURLs[index % imageURLs.length], // Cycle through images
      images: [
        {
          url: imageURLs[index % imageURLs.length], // Cycle through images
        },
      ],
      metadata: {
        nutrition: {
          energy: {
            kcal: 12,
            kJ: 113,
          },
          salt: 0,
          protein: 5,
          sugar: 3,
          carbohydrates: 6,
          saturatedFat: 0,
          fat: 0,
          unit: "ml",
        },
        ingredients: [
          {
            category: "main ingredients",
            ingredient: "grapes",
            allergen: false,
          },
          {
            category: "main ingredients",
            ingredient: "grape must",
            allergen: false,
          },
        ],
        characteristics: {
          netQuantity: 750,
          alcoholContent: getRandomElement([
            10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5,
          ]),
          hasVintage: true,
          vintageYear: getRandomElement([
            "2006",
            "2007",
            "2008",
            "2009",
            "2010",
            "2011",
            "2012",
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
          ]),
          methodology: ["qvevri", "steel tank"],
          sugarContent: getRandomElement([
            "dry",
            "semi-dry",
            "medium-dry",
            "medium-sweet",
            "semi-sweet",
            "sweet",
            "brut",
            "extra-brut",
            "pas-dose",
          ]),
          category: getRandomElement([
            "white",
            "red",
            "rose",
            "orange",
            "amber",
          ]),
        },
        extras: {
          packaging: false,
        },
      },
    };
  });

  return products;
};

export { generateProductsList, vendors, brands };
