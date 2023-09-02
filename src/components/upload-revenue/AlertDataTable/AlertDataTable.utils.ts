import { ITransactionUploadAlert } from "@/types/dto";

interface IExcelDataColumn {
  columnIndex: number,
  category: string,
  value: string
}

export const formatToExcelData = (data: ITransactionUploadAlert[]): IExcelDataColumn[] => {
  const excelData = [];

  for (let i = 0; i < data.length; i += 1) {
    const currData: IExcelDataColumn = {} as IExcelDataColumn;
    currData.columnIndex = data[i].columnIndex;
    currData.category = data[i].severity;
    currData.value = data[i].cellValue;

    excelData.push(currData);
  }

  return excelData;
};
