export interface ILineChart {
  tracks: ILineChartList[]
}

interface ILineChartList {
  id: number,
  name: string,
  enName: string,
  monthlyTrend: ILineChartItem[]
}

interface ILineChartItem {
  month: number,
  settlement: number,
  revenue: number,
}

export interface IMappedChartData {
  id: number,
  data: {
    x: string,
    y: number
  }[]
}
