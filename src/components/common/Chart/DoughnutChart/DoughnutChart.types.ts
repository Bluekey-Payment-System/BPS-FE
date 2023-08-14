export interface DoughnutChartProps {
  contents: IDoughnutChartList[]
}

export interface IDoughnutChartList {
  track: {
    id: number;
    name: string;
    enName: string;
  };
  revenue: number;
  growthRate: number;
  proportion: number;
}
