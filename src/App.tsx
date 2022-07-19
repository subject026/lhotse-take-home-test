import React from "react";

import { TagSection } from "./components/TagSection";
import SupplierTitle from "./components/SupplierTitle";

import type { ISupplier, TTagCategory, TTagType } from "./types";

import {
  supplier,
  suggestedTagsCertifications,
  suggestedTagsPortfolio,
} from "./data";

function App() {
  const [supplierState, setSupplierState] = React.useState<ISupplier>(supplier);

  const addTag = (category: TTagCategory, type: TTagType, name: string) => {
    setSupplierState((state) => {
      // this is just to make sure id is unique within the tag array so removeTag works
      const id =
        state[category].reduce((acc, c) => {
          return c.id > acc ? c.id : acc;
        }, 0) + 1;
      return {
        ...state,
        [category]: [...state[category], { id, name, type }],
      };
    });
  };

  const removeTag = (category: TTagCategory, id: number) => {
    setSupplierState((state) => {
      return {
        ...state,
        [category]: state[category].filter((tag) => tag.id !== id),
      };
    });
  };

  const {
    name,
    "tags-general": tagsGeneral,
    "tags-certificates": tagsCertificates,
    "tags-portfolio": tagsPortfolio,
  } = supplierState;

  return (
    <section className="max-w-6xl m-auto px-4 py-8">
      <SupplierTitle>{name}</SupplierTitle>
      <section className="py-6 flex flex-col gap-6">
        <TagSection
          displayName="General"
          tagMeta={{ category: "tags-general", type: "supplierBranch-general" }}
          tagList={tagsGeneral}
          addTag={addTag}
          removeTag={removeTag}
        />
        <TagSection
          displayName="Portfolio"
          tagMeta={{
            category: "tags-portfolio",
            type: "supplierBranch-certificates",
          }}
          tagList={tagsPortfolio}
          suggestedTags={suggestedTagsPortfolio}
          addTag={addTag}
          removeTag={removeTag}
        />
        <TagSection
          displayName="Certificates"
          tagMeta={{
            category: "tags-certificates",
            type: "supplierBranch-portfolio",
          }}
          tagList={tagsCertificates}
          suggestedTags={suggestedTagsCertifications}
          addTag={addTag}
          removeTag={removeTag}
        />
      </section>
    </section>
  );
}

export default App;
