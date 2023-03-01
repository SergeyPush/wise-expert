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

interface Sys4 {
  type: string;
  linkType: string;
  id: string;
}

interface ContentType {
  sys: Sys4;
}

interface Sys {
  space: Space;
  id: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  environment: Environment;
  revision: number;
  contentType: ContentType;
  locale: string;
}

interface Fields {
  name: string;
  price: string;
  description: string[];
}

export interface ITile {
  metadata: Metadata;
  sys: Sys;
  fields: Fields;
}

export interface ITiles {
  title: string;
  tile: ITile[];
}
