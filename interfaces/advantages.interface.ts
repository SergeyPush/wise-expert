// Single numeric stat: big figure + label (label may contain \n for line breaks).
export interface IStat {
  num: string;
  label: string;
}

// Advantages section content from Contentful.
export interface IAdvantages {
  internalTitle: string;
  stats: IStat[];
  quals: string[];
}
