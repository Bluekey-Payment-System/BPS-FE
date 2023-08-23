import { IHasSearchBarData } from "@/components/common/Dropdown/Dropdown.type";

interface IFormatDropdownList {
  [key: string]: string | number
}

const formatDropdownList = (list: IFormatDropdownList[]): IHasSearchBarData[] => {
  const formattedList = list.map((item) => {
    return {
      id: Object.values(item)[0].toString(),
      name: Object.values(item)[1].toString(),
    };
  });

  return formattedList;
};

export default formatDropdownList;
