import type { ISupplier, TSuggestedTagList } from "./types";

export const supplier: ISupplier = {
  name: "Volkswagenzentrum Berlin GmbH",
  "tags-general": [
    {
      id: 1,
      name: "volkswagen",
      type: "supplierBranch-general",
    },
    {
      id: 2,
      name: "cars",
      type: "supplierBranch-general",
    },
  ],
  "tags-certificates": [
    {
      id: 1,
      name: "ISO 9001",
      type: "supplierBranch-certificates",
    },
  ],
  "tags-portfolio": [],
};

export const suggestedTagsPortfolio: TSuggestedTagList = [
  "European",
  "Eco-friendly",
  "German",
];
export const suggestedTagsCertifications: TSuggestedTagList = [
  "ISO 9001",
  "Vegan",
  "Organic",
];
