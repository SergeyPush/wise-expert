export interface IHowItWorksStep {
  num: number;
  title: string;
  description: string;
}

export interface IHowItWorks {
  prefix: string;
  title: string;
  tiles: IHowItWorksStep[];
}
