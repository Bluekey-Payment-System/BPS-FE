import { IHasSearchBarData } from "@/components/common/Dropdown/Dropdown.type";

interface IFormatDropdownList {
  [key: string]: string | number
}

/**
 * @author 임병욱
 * @param {IFormatDropdownList} list - 드롭다운에서 사용할 리스트 ex)[{id: number, name: string},]
 * @return {IHasSearchBarData} formattedList - 가공된 리스트 [{id: string, name: string},]
 */
const formatDropdownList = (list: IFormatDropdownList[]): IHasSearchBarData[] => {
  const formattedList = list.map((item) => {
    return {
      id: parseInt(Object.values(item)[0] as string, 10),
      name: Object.values(item)[1].toString(),
    };
  });

  return formattedList;
};

export default formatDropdownList;
