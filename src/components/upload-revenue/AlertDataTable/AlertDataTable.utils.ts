import { ITransactionUploadAlert } from "@/types/dto";

interface IExcelDataColumn {
  columnIndex: number,
  category: string,
  value: string
}

/**
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param data 정산 내역 업로드 시 발생할 수 있는 warnings / errors 데이터
 * @returns 엑셀 파일에 들어가는 데이터 형태로 포맷
 */
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
