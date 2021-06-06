interface IChart {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IBarChart extends IChart {
  id: string;
  dataKeyX: string;
  dataKeyY: string;
  data: [];
}
