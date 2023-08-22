export interface IAlbumFieldValues {
  name: string;
  enName: string;
  memberId?: string; // TODO: Dropdown 컴포넌트 dropdownDataList 타입이 object[]로 바뀌면 number타입으로 수정
  albumImage?: File;
}
