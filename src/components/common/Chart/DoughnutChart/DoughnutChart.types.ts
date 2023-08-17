export interface DoughnutChartProps {
  contents: IDoughnutChartList[]
}

export interface IDoughnutChartList {
  artist?: {
    id: number;
    name: string;
    enName: string;
  };
  track?: {
    id: number;
    name: string;
    enName: string;
  };
  revenue: number;
  growthRate: number;
  proportion: number;
}
