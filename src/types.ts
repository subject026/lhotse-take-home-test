export type TTagCategory =
  | "tags-general"
  | "tags-certificates"
  | "tags-portfolio";

export type TTagType =
  | "supplierBranch-general"
  | "supplierBranch-certificates"
  | "supplierBranch-portfolio";

export interface ITagMeta {
  category: TTagCategory;
  type: TTagType;
}

export interface ITagData {
  id: number;
  name: string;
  type: TTagType;
}

export interface ISupplier {
  name: string;
  "tags-general": ITagData[];
  "tags-certificates": ITagData[];
  "tags-portfolio": ITagData[];
}

export type TSuggestedTagList = string[];
