interface Metadata {
  tags: any[];
}

interface Sys2 {
  type: string;
  linkType: string;
  id: string;
}

interface Space {
  sys: Sys2;
}

interface Sys3 {
  id: string;
  type: string;
  linkType: string;
}

interface Environment {
  sys: Sys3;
}

interface Sys {
  space: Space;
  id: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  environment: Environment;
  revision: number;
  locale: string;
}

interface Image2 {
  width: number;
  height: number;
}

interface Details {
  size: number;
  image: Image2;
}

interface File {
  url: string;
  details: Details;
  fileName: string;
  contentType: string;
}

interface Fields {
  title: string;
  file: File;
}

interface Image {
  metadata: Metadata;
  sys: Sys;
  fields: Fields;
}

export interface IHero {
  title: string;
  subtitle?: string;
  items?: string[];
  image: Image;
}
