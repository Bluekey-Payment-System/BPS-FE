export interface IAlbumFieldValues {
  name?: string;
  enName?: string;
  memberId: number | null; // TODO: Dropdown 컴포넌트 dropdownDataList 타입이 object[]로 바뀌면 number타입으로 수정
  albumImage?: File;
}

export interface ITrackFieldValues {
  name: string;
  enName: string;
  isOriginalTrack: boolean;
  artists: {
    memberId: number | null;
    name: string;
    commissionRate: number | null;
  } [];
}
