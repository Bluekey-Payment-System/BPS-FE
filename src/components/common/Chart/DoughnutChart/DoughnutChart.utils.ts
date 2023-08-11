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

export const createChartDataFromContents = (contents: IDoughnutChartList[]) => {
  const chartData = contents.map((item: IDoughnutChartList) => {
    return {
      id: item.track.id.toString(),
      label: item.track.name,
      value: item.proportion,
    };
  });

  return chartData;
};
