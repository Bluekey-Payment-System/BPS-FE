import {
  IGetAdminDashboardResponse,
  IGetAdminEarningsTopArtistResponse,
  IGetAdminMonthlyTrendsResponse,
  IGetAdminTrackTransactionResponse,
} from "@/services/api/types/admin";
import {
  IGetAlbumDashboardResponse,
  IGetAlbumMonthlyTrendsResponse,
  IGetAlbumRevenueTopTrackResponse,
  IGetAlbumTracksTrendsResponse,
  IGetAlbumTracksResponse,
  IGetAlbumsResponse,
} from "@/services/api/types/albums";
import {
  IGetArtistAlbumsResponse,
  IGetArtistDashboardResponse,
  IGetArtistEarningsTopTrackResponse,
  IGetArtistMonthlyTrendsResponse,
  IGetArtistTrackTransactionResponse,
  IGetArtistsResponse,
} from "@/services/api/types/artist";
import { IGetAccountsResponse } from "@/services/api/types/member";
import { IGetTransactionUploadResponse } from "@/services/api/types/transaction";
import { ITransactionUploadAlert } from "@/types/dto";

/* ##### 1. ALBUM ##### */
export const MOCK_ALBUMS: IGetAlbumsResponse = {
  totalItems: 300,
  contents: [
    {
      albumId: 1,
      albumImage: "https://image.bugsm.co.kr/album/images/500/201408/20140893.jpg",
      name: "비밀정원",
      enName: "enName",
    },
    {
      albumId: 2,
      albumImage: "https://spnimage.edaily.co.kr/images/photo/files/NP/S/2023/05/PS23050700058.jpg",
      name: "클로저",
      enName: "enName",
    },
    {
      albumId: 3,
      albumImage: "https://cdn.obsnews.co.kr/news/photo/201605/974498_234531_5514.jpg",
      name: "윈디데이",
      enName: "enName",
    },
    {
      albumId: 4,
      albumImage: "https://image.bugsm.co.kr/album/images/500/201408/20140893.jpg",
      name: "번지",
      enName: "enName",
    },
    {
      albumId: 5,
      albumImage: "https://spnimage.edaily.co.kr/images/photo/files/NP/S/2023/05/PS23050700058.jpg",
      name: "던던댄스",
      enName: "enName",
    },
    {
      albumId: 6,
      albumImage: "https://cdn.obsnews.co.kr/news/photo/201605/974498_234531_5514.jpg",
      name: "살짝설렜어",
      enName: "enName",
    },
  ],
};

export const MOCK_ALBUM_TRACKS: IGetAlbumTracksResponse = {
  albumId: 1,
  albumImage: "https://image.bugsm.co.kr/album/images/500/201408/20140893.jpg",
  name: "비밀정원",
  enName: "Secret Garden",
  artist:
  {
    memberId: 1,
    name: "오마이걸",
    enName: "Ohmygirl",
  },
  tracks: [
    {
      trackId: 1,
      name: "불꽃놀이불꽃놀이불꽃놀이불꽃놀이불꽃놀이불꽃놀이불꽃놀이",
      enName: "Fireworks",
      originalTrack: false,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",
          commissionRate: 50,
        },
        {
          memberId: 1,
          name: "아이유",
          enName: "Arin",
          commissionRate: 50,
        },
      ],
    },
    {
      trackId: 2,
      name: "던던댄스",
      enName: "Dun Dun Dance",
      originalTrack: true,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",

          commissionRate: 50,
        },
      ],
    },
    {
      trackId: 3,
      name: "바나나 알러지 원숭이",
      enName: "Banana Allergy Monkey",
      originalTrack: true,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",

          commissionRate: 50,
        },
        {
          memberId: 1,
          name: "승희",
          enName: "Arin",

          commissionRate: 30,
        },
      ],
    },
    {
      trackId: 4,
      name: "불꽃놀이",
      enName: "Fireworks",
      originalTrack: true,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",

          commissionRate: 50,
        },
      ],
    },
    {
      trackId: 5,
      name: "던던댄스",
      enName: "Dun Dun Dance",
      originalTrack: false,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",

          commissionRate: 50,
        },
      ],
    },
    {
      trackId: 6,
      name: "바나나 알러지 원숭이",
      enName: "Banana Allergy Monkey",
      originalTrack: true,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",

          commissionRate: 50,
        },
        {
          memberId: 1,
          name: "승희",
          enName: "Arin",

          commissionRate: 30,
        },
      ],
    },
    {
      trackId: 7,
      name: "불꽃놀이",
      enName: "Fireworks",
      originalTrack: false,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",

          commissionRate: 50,
        },
      ],
    },
    {
      trackId: 8,
      name: "던던댄스",
      enName: "Dun Dun Dance",
      originalTrack: false,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",

          commissionRate: 50,
        },
      ],
    },
    {
      trackId: 9,
      name: "바나나 알러지 원숭이",
      enName: "Banana Allergy Monkey",
      originalTrack: true,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",

          commissionRate: 50,
        },
        {
          memberId: 1,
          name: "승희",
          enName: "Arin",

          commissionRate: 30,
        },
      ],
    },
    {
      trackId: 10,
      name: "불꽃놀이",
      enName: "Fireworks",
      originalTrack: false,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",

          commissionRate: 50,
        },
      ],
    },
    {
      trackId: 11,
      name: "던던댄스",
      enName: "Dun Dun Dance",
      originalTrack: false,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",

          commissionRate: 50,
        },
      ],
    },
    {
      trackId: 12,
      name: "바나나 알러지 원숭이",
      enName: "Banana Allergy Monkey",
      originalTrack: true,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",

          commissionRate: 50,
        },
        {
          memberId: 1,
          name: "승희",
          enName: "Arin",

          commissionRate: 30,
        },
      ],
    },
    {
      trackId: 13,
      name: "불꽃놀이",
      enName: "Fireworks",
      originalTrack: false,
      artists: [
        {
          memberId: 1,
          name: "아린",
          enName: "Arin",

          commissionRate: 50,
        },
      ],
    },
  ],
};

export const MOCK_ALBUM_BAR: IGetAlbumMonthlyTrendsResponse = {
  contents: [
    {
      month: 1,
      settlement: 2142344,
      revenue: 732143,
      netIncome: 100000,
    },
    {
      month: 2,
      settlement: 2132459,
      revenue: 732392,
      netIncome: 100000,
    },
    {
      month: 3,
      settlement: 1836935,
      revenue: 632143,
      netIncome: 100000,
    },
    {
      month: 4,
      settlement: 5142344,
      revenue: 1032143,
      netIncome: 100000,
    },
  ],
};

export const MOCK_ALBUM_LINE: IGetAlbumTracksTrendsResponse = {
  tracks: [
    {
      trackId: 1,
      name: "불꽃놀이",
      enName: "Fireworks",
      monthlyTrend: [
        {
          month: 1,
          settlement: 1442344,
          revenue: 832143,
        },
        {
          month: 2,
          settlement: 5932459,
          revenue: 332392,
        },
        {
          month: 3,
          settlement: 1936935,
          revenue: 632143,
        },
        {
          month: 4,
          settlement: 5142344,
          revenue: 1032143,
        },
        {
          month: 5,
          settlement: 5142344,
          revenue: 1032143,
        },
        {
          month: 6,
          settlement: 5142344,
          revenue: 1032143,
        },
        {
          month: 7,
          settlement: 5142344,
          revenue: 1032143,
        },
        {
          month: 8,
          settlement: 5142344,
          revenue: 1032143,
        },
        {
          month: 9,
          settlement: 5142344,
          revenue: 1032143,
        },
        {
          month: 10,
          settlement: 5142344,
          revenue: 1032143,
        },
        {
          month: 11,
          settlement: 5142344,
          revenue: 1032143,
        },
        {
          month: 12,
          settlement: 5142344,
          revenue: 1032143,
        },
      ],
    },
    {
      trackId: 1,
      name: "던던댄스",
      enName: "Dun Dun Dance",
      monthlyTrend: [
        {
          month: 1,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 2,
          settlement: 2132459,
          revenue: 732392,
        },
        {
          month: 3,
          settlement: 1836935,
          revenue: 632143,
        },
        {
          month: 4,
          settlement: 5142344,
          revenue: 1032143,
        },
      ],
    },
    {
      trackId: 1,
      name: "바나나 알러지 원숭이",
      enName: "Banana Allergy Monkey",
      monthlyTrend: [
        {
          month: 1,
          settlement: 2142344,
          revenue: 732143,
        },
        {
          month: 2,
          settlement: 2132459,
          revenue: 732392,
        },
        {
          month: 3,
          settlement: 1836935,
          revenue: 632143,
        },
        {
          month: 4,
          settlement: 5142344,
          revenue: 1032143,
        },
      ],
    },
  ],
};

export const MOCK_ALBUM_DOUGHNUT: IGetAlbumRevenueTopTrackResponse = {
  contents: [
    {
      track: {
        trackId: 1,
        name: "트랙1",
        enName: "track1",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      track: {
        trackId: 2,
        name: "트랙2",
        enName: "track2",
      },
      revenue: 800000,
      growthRate: 6.1,
      proportion: 35,
    },
    {
      track: {
        trackId: 3,
        name: "트랙3",
        enName: "track3",
      },
      revenue: 600000,
      growthRate: -25.1,
      proportion: 10,
    },
    {
      track: {
        trackId: 4,
        name: "트랙4",
        enName: "track4",
      },
      revenue: 40000,
      growthRate: -13,
      proportion: 6,
    },
    {
      track: {
        trackId: 5,
        name: "트랙5",
        enName: "track5",
      },
      revenue: 300,
      growthRate: 2.5,
      proportion: 4,
    },
  ],
};

export const MOCK_ALBUM_DASHBOARD_CARD: IGetAlbumDashboardResponse = {
  albumId: 1,
  name: "미녀 OST",
  enName: "미녀 OST",
  revenue: {
    totalAmount: 12345,
    growthRate: 12345,
  },
  netIncome: {
    totalAmount: 12345,
    growthRate: 12345,
  },
  settlementAmount:
  {
    totalAmount: 1000,
    growthRate: 10.2,
  },
  bestTrack:
  {
    trackId: 1,
    name: "트랙명2",
    enName: "track2",
    growthRate: -30,
  },
};
/* ########################## */

/* ##### 2. TRANSACTION ##### */
export const MOCK_WARNINGS: ITransactionUploadAlert[] = [
  {
    rowIndex: 1,
    columnIndex: 2,
    columnName: "아티스트명",
    cellValue: "0.0",
    type: "NULL_CELL",
    severity: "string",
    message: "값이 비어 있는 셀입니다.",
  },
  {
    rowIndex: 2,
    columnIndex: 2,
    columnName: "앨범명",
    cellValue: "ㅁ아러ㅣㅁㅇㅁ아러ㅣㅁㅇㅁ아러ㅣㅁㅇㅁ아러ㅣㅁㅇ",
    type: "NULL_CELL",
    severity: "string",
    message: "값이 비어 있는 셀입니다.",
  },
  {
    rowIndex: 3,
    columnIndex: 3,
    columnName: "곡명",
    cellValue: "0.0",
    type: "NULL_CELL",
    severity: "string",
    message: "값이 비어 있는 셀입니다.",
  },
  {
    rowIndex: 2,
    columnIndex: 3,
    columnName: "앨범명",
    cellValue: "0.0",
    type: "NULL_CELL",
    severity: "string",
    message: "값이 비어 있는 셀입니다.",
  },
];

export const MOCK_TRANSACTION_UPLOAD: IGetTransactionUploadResponse = {
  totalItems: 3,
  contents: [
    {
      id: 1,
      name: "202308_마피아 유통사 정산 내역.xlsx",
      uploadAt: "2023/08/12 13:20",
      warnings: [
        {
          rowIndex: 15,
          columnIndex: 4,
          columnName: "앨범명",
          cellValue: "0.0",
          type: "NULL_CELL",
          severity: "string",
          message: "값이 비어 있는 셀입니다.",
        },
      ],
    },
    {
      id: 2,
      name: "202308_아토 유통사 정산 내역.xlsx",
      uploadAt: "2023/08/13 19:00",
      warnings: [
        {
          rowIndex: 15,
          columnIndex: 4,
          columnName: "앨범명",
          cellValue: "0.0",
          type: "NULL_CELL",
          severity: "string",
          message: "값이 비어 있는 셀입니다.",
        },
      ],
    },
    {
      id: 3,
      name: "202308_삼쩜일사 유통사 정산 내역.xlsx",
      uploadAt: "2023/08/25 11:03",
      warnings: [
        {
          rowIndex: 15,
          columnIndex: 4,
          columnName: "앨범명",
          cellValue: "0.0",
          type: "NULL_CELL",
          severity: "string",
          message: "값이 비어 있는 셀입니다.",
        },
      ],
    },
  ],
};

export const MOCK_EMPTY_TRANSACTION_UPLOAD: IGetTransactionUploadResponse = {
  totalItems: 0,
  contents: [],
};
/* ########################## */

/* ##### 3. ADMIN ##### */
export const MOCK_ADMIN_DASHBOARD_CARD: IGetAdminDashboardResponse = {
  revenue: {
    totalAmount: 1000000,
    growthRate: 2.1,
  },
  netIncome: {
    totalAmount: 800000,
    growthRate: 21,
  },
  settlementAmount: {
    totalAmount: 600000,
    growthRate: -4.5,
  },
  bestArtist: {
    memberId: 1,
    name: "아이유",
    enName: "IU",
    growthRate: 0.3,
  },
};

export const MOCK_ADMIN_BAR: IGetAdminMonthlyTrendsResponse = {
  contents: [
    {
      month: 1,
      netIncome: 2142344,
      revenue: 732143,
      settlement: 500000,
    },
    {
      month: 2,
      netIncome: 2132459,
      revenue: 732392,
      settlement: 500000,
    },
    {
      month: 3,
      netIncome: 1836935,
      revenue: 632143,
      settlement: 500000,
    },
    {
      month: 4,
      netIncome: 5142344,
      revenue: 1032143,
      settlement: 500000,
    },
    {
      month: 5,
      netIncome: 3942344,
      revenue: 1032143,
      settlement: 500000,
    },
    {
      month: 6,
      netIncome: 2442344,
      revenue: 1032143,
      settlement: 500000,
    },

  ],
};

export const MOCK_ADMIN_TABLE: IGetAdminTrackTransactionResponse = {
  totalItems: 300,
  contents: [
    {
      track: {
        trackId: 1,
        name: "이름이 아주아주 매우매우 베리베리 긴 곡",
        enName: "track name",
      },
      album: {
        albumId: 1,
        name: "앨범 이름",
        enName: "Album name",
      },
      artists: [
        {
          memberId: 1,
          name: "아이유~~참말로제가한게아닙니더",
          enName: "IU",
        },
        {
          memberId: 2,
          name: "지드래곤",
          enName: "G-Dragon",
        },
        {
          memberId: 3,
          name: "태양",
          enName: "Sun",
        },
      ],
      revenue: 1000000000,
      netIncome: 100000000,
      settlementAmount: 900000,
      commissionRate: 30,
    },
    {
      track: {
        trackId: 2,
        name: "곡 제목",
        enName: "track name",
      },
      album: {
        albumId: 2,
        name: "앨범 이름",
        enName: "Album name",
      },
      artists: [
        {
          memberId: 2,
          name: "아이유",
          enName: "IU",
        },
      ],
      revenue: 17831413,
      netIncome: 3143257,
      settlementAmount: 900000,
      commissionRate: 90,
    },
    {
      track: {
        trackId: 3,
        name: "곡 제목",
        enName: "track name",
      },
      album: {
        albumId: 3,
        name: "앨범 이름",
        enName: "Album name",
      },
      artists: [
        {
          memberId: 3,
          name: "아이유",
          enName: "IU",
        },
      ],
      revenue: 12,
      netIncome: 3,
      settlementAmount: 9,
      commissionRate: 50,
    },
  ],
};

export const MOCK_ADMIN_DOUGHNUT: IGetAdminEarningsTopArtistResponse = {
  contents: [
    {
      artist: {
        memberId: 1,
        name: "아이유",
        enName: "IU",
      },
      revenue: 1000000000,
      growthRate: 250,
      proportion: 50,
    },
    {
      artist: {
        memberId: 2,
        name: "정국",
        enName: "Jungkuk",
      },
      revenue: 10000000,
      growthRate: 24,
      proportion: 30,
    },
    {
      artist: {
        memberId: 3,
        name: "혁기",
        enName: "Hyucki",
      },
      revenue: 10000,
      growthRate: 25,
      proportion: 10,
    },
    {
      artist: {
        memberId: 4,
        name: "SKY",
        enName: "SKY",
      },
      revenue: 500,
      growthRate: -300,
      proportion: 6,
    },
    {
      artist: {
        memberId: 5,
        name: "지미 가드너",
        enName: "Jimmi Gardener",
      },
      revenue: 300,
      growthRate: 0,
      proportion: 4,
    },
  ],
};
/* ########################## */

/* ##### 4. ARTIST ##### */
export const MOCK_ARTISTS: IGetArtistsResponse = {
  totalItems: 300,
  contents: [
    {
      artist: {
        memberId: 1,
        name: "김블루김블루김블루김블루김블루",
        enName: "bluekeybluekeybluekeybluekey",
        profileImage: null,
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "하루도 그대를 사랑하지 않은 적이 없었다. 하루도 그대를 사랑하지 않은 적이 없었다.",
      monthlyIncreaseRate: -7,
    },
    {
      artist: {
        memberId: 2,
        name: "김블루",
        enName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 0,
    },
    {
      artist: {
        memberId: 3,
        name: "김블루",
        enName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: -2.5,
    },
    {
      artist: {
        memberId: 4,
        name: "김블루",
        enName: "bluekey",
        profileImage: null,
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 0.4,
    },
    {
      artist: {
        memberId: 5,
        name: "김블루",
        enName: "bluekey",
        profileImage: null,
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 55.5,
    },
    {
      artist: {
        memberId: 6,
        name: "김블루",
        enName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: -200,
    },
    {
      artist: {
        memberId: 7,
        name: "김블루",
        enName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 16.8,
    },
    {
      artist: {
        memberId: 8,
        name: "김블루",
        enName: "bluekey",
        profileImage: null,
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: -2.5,
    },
    {
      artist: {
        memberId: 9,
        name: "김블루",
        enName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: null,
    },
    {
      artist: {
        memberId: 10,
        name: "김블루",
        enName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 129,
    },
  ],
};

export const MOCK_ARTIST_DASHBOARD_CARD: IGetArtistDashboardResponse = {
  memberId: 1,
  name: "혁기",
  enName: "huycki",
  settlementAmount:
  {
    totalAmount: 1000,
    growthRate: 10.2,
  },
  bestAlbum:
  {
    albumId: 1,
    name: "앨범명2",
    enName: "album2",
    growthRate: 300,
  },
  bestTrack:
  {
    trackId: 1,
    name: "트랙명2",
    enName: "track2",
    growthRate: -30,
  },
};

export const MOCK_ARTIST_TABLE: IGetArtistTrackTransactionResponse = {
  totalItems: 300,
  contents: [
    {
      track: {
        trackId: 1,
        name: "아주아주 이름이 매우매우 긴 곡",
        enName: "track name",
      },
      album: {
        albumId: 1,
        name: "앨범 이름",
        enName: "Album name",
      },
      artists: [
        {
          memberId: 1,
          name: "아이유",
          enName: "IU",
        },
      ],
      revenue: 1000000000,
      settlementAmount: 900000,
      commissionRate: 30,
    },
    {
      track: {
        trackId: 2,
        name: "곡 제목",
        enName: "track name",
      },
      album: {
        albumId: 2,
        name: "앨범 이름",
        enName: "Album name",
      },
      artists: [
        {
          memberId: 2,
          name: "아이유",
          enName: "IU",
        },
      ],
      revenue: 17831413,
      settlementAmount: 900000,
      commissionRate: 90,
    },
    {
      track: {
        trackId: 3,
        name: "곡 제목",
        enName: "track name",
      },
      album: {
        albumId: 3,
        name: "앨범 이름",
        enName: "Album name",
      },
      artists: [
        {
          memberId: 3,
          name: "아이유",
          enName: "IU",
        },
      ],
      revenue: 12,
      settlementAmount: 9,
      commissionRate: 50,
    },
  ],
};

export const MOCK_ARTIST_DOUGHNUT: IGetArtistEarningsTopTrackResponse = {
  contents: [
    {
      track: {
        trackId: 1,
        name: "트랙1",
        enName: "track1",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      track: {
        trackId: 2,
        name: "트랙2",
        enName: "track2",
      },
      revenue: 800000,
      growthRate: 6.1,
      proportion: 35,
    },
    {
      track: {
        trackId: 3,
        name: "트랙3",
        enName: "track3",
      },
      revenue: 600000,
      growthRate: -25.1,
      proportion: 10,
    },
    {
      track: {
        trackId: 4,
        name: "트랙4",
        enName: "track4",
      },
      revenue: 40000,
      growthRate: -13,
      proportion: 6,
    },
    {
      track: {
        trackId: 5,
        name: "트랙5",
        enName: "track5",
      },
      revenue: 300,
      growthRate: 2.5,
      proportion: 4,
    },
  ],
};

export const MOCK_ARTIST_BAR: IGetArtistMonthlyTrendsResponse = {
  contents: [
    {
      month: 1,
      settlement: 2142344,
      revenue: 732143,
      netIncome: 100000,
    },
    {
      month: 2,
      settlement: 2132459,
      revenue: 732392,
      netIncome: 100000,
    },
    {
      month: 3,
      settlement: 1836935,
      revenue: 632143,
      netIncome: 100000,
    },
    {
      month: 4,
      settlement: 5142344,
      revenue: 1032143,
      netIncome: 100000,
    },
  ],
};

export const MOCK_ARTIST_ALBUMS: IGetArtistAlbumsResponse = {
  totalItems: 300,
  contents: [
    {
      albumId: 1,
      albumImage: "https://image.bugsm.co.kr/album/images/500/201408/20140893.jpg",
      name: "비밀정원",
      enName: "enName",
    },
    {
      albumId: 2,
      albumImage: "https://spnimage.edaily.co.kr/images/photo/files/NP/S/2023/05/PS23050700058.jpg",
      name: "클로저",
      enName: "enName",
    },
    {
      albumId: 3,
      albumImage: "https://cdn.obsnews.co.kr/news/photo/201605/974498_234531_5514.jpg",
      name: "윈디데이",
      enName: "enName",
    },
    {
      albumId: 4,
      albumImage: "https://image.bugsm.co.kr/album/images/500/201408/20140893.jpg",
      name: "번지",
      enName: "enName",
    },
    {
      albumId: 5,
      albumImage: "https://spnimage.edaily.co.kr/images/photo/files/NP/S/2023/05/PS23050700058.jpg",
      name: "던던댄스",
      enName: "enName",
    },
    {
      albumId: 6,
      albumImage: "https://cdn.obsnews.co.kr/news/photo/201605/974498_234531_5514.jpg",
      name: "살짝설렜어",
      enName: "enName",
    },
  ],
};
/* ########################## */

/* ##### 5. MEMBER ##### */
export const MOCK_ACCOUNTS: IGetAccountsResponse = {
  artistList: {
    totalItems: 100,
    contents: [
      {
        memberId: 1,
        name: "혁기",
        enName: "hyuki",
        loginId: "qwertyui1234",
        email: "qwerty1234@bluekeymusic.com",
        commissionRate: null,
      },
      {
        memberId: 2,
        name: "혁기2",
        enName: "hyuki2",
        loginId: "qwerty2ui1234",
        email: null,
        commissionRate: 90,
      },
      {
        memberId: 3,
        name: "혁기3",
        enName: "hyuki",
        loginId: "qwertyui1234",
        email: "qwerty1234@bluekeymusic.com",
        commissionRate: 0,
      },
      {
        memberId: 4,
        name: "혁기4",
        enName: "hyuki2",
        loginId: "qwerty2ui1234",
        email: "qwerty12342@bluekeymusic.com",
        commissionRate: 100,
      },
      {
        memberId: 5,
        name: "혁기5",
        enName: "hyuki",
        loginId: "qwertyui1234",
        email: "qwerty1234@bluekeymusic.com",
        commissionRate: 86,
      },
      {
        memberId: 6,
        name: "혁기6",
        enName: "hyuki2",
        loginId: "qwerty2ui1234",
        email: "qwerty12342@bluekeymusic.com",
        commissionRate: 90,
      },
    ],
  },
  adminList: {
    totalItems: 100,
    contents: [
      {
        memberId: 1,
        nickname: "관리자1",
        loginId: "qwerty2ui1234",
        email: "qwerty12342@bluekeymusic.com",
      },
      {
        memberId: 2,
        nickname: "관리쿤",
        loginId: "qwerty2ui1234",
        email: "qwerty12342@bluekeymusic.com",
      },
      {
        memberId: 3,
        nickname: "어드민1",
        loginId: "qwerty2ui1234",
        email: "qwerty12342@bluekeymusic.com",
      },
      {
        memberId: 4,
        nickname: "어드쿤",
        loginId: "qwerty2ui1234",
        email: "qwerty12342@bluekeymusic.com",
      },
      {
        memberId: 5,
        nickname: "애드민",
        loginId: "qwerty2ui1234",
        email: "qwerty12342@bluekeymusic.com",
      },
      {
        memberId: 6,
        nickname: "블루키 통",
        loginId: "qwerty2ui1234",
        email: "qwerty12342@bluekeymusic.com",
      },
    ],
  },
};
/* ########################## */
