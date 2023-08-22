import {
  IGetAdminDashboardResponse,
  IGetAdminEarningsTopArtistResponse,
  IGetAdminMonthlyEarningsTrendsResponse,
  IGetAdminTrackTransactionResponse,
} from "@/services/api/types/admin";
import {
  IGetAlbumDashboardResponse,
  IGetAlbumMonthlySettlementResponse,
  IGetAlbumRevenueTopTrackResponse,
  IGetAlbumTrackSettlementTrendsResponse,
  IGetAlbumTracksResponse,
  IGetAlbumsResponse,
} from "@/services/api/types/albums";
import {
  IGetArtistAlbumsResponse,
  IGetArtistDashboardResponse,
  IGetArtistEarningsTopTrackResponse,
  IGetArtistMonthlySettlementResponse,
  IGetArtistTrackTransactionResponse,
  IGetArtistsResponse,
} from "@/services/api/types/artist";
import { IGETTransactionUploadResponse } from "@/services/api/types/transaction";

/* ##### 1. ALBUM ##### */
export const MOCK_ALBUMS: IGetAlbumsResponse = {
  totalItems: 300,
  contents: [
    {
      albumId: 1,
      albumImage: "https://image.bugsm.co.kr/album/images/500/201408/20140893.jpg",
      koAlbumName: "비밀정원",
    },
    {
      albumId: 2,
      albumImage: "https://spnimage.edaily.co.kr/images/photo/files/NP/S/2023/05/PS23050700058.jpg",
      koAlbumName: "클로저",
    },
    {
      albumId: 3,
      albumImage: "https://cdn.obsnews.co.kr/news/photo/201605/974498_234531_5514.jpg",
      koAlbumName: "윈디데이",
    },
    {
      albumId: 4,
      albumImage: "https://image.bugsm.co.kr/album/images/500/201408/20140893.jpg",
      koAlbumName: "번지",
    },
    {
      albumId: 5,
      albumImage: "https://spnimage.edaily.co.kr/images/photo/files/NP/S/2023/05/PS23050700058.jpg",
      koAlbumName: "던던댄스",
    },
    {
      albumId: 6,
      albumImage: "https://cdn.obsnews.co.kr/news/photo/201605/974498_234531_5514.jpg",
      koAlbumName: "살짝설렜어",
    },
  ],
};

export const MOCK_ALBUM_TRACKS: IGetAlbumTracksResponse = {
  albumImage: "https://image.bugsm.co.kr/album/images/500/201408/20140893.jpg",
  koAlbumName: "비밀정원",
  enAlbumName: "Secret Garden",
  artist:
  {
    memberId: 1,
    koArtistName: "아린",
    enArtistName: "Arin",
  },
  tracks: [
    {
      koTrackName: "불꽃놀이불꽃놀이불꽃놀이불꽃놀이불꽃놀이불꽃놀이불꽃놀이",
      enTrackName: "Fireworks",
      bluekeyOriginalTrack: false,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
        {
          koArtistName: "아이유",
          enArtistName: "IU",
          commissionRate: 50,
        },
      ],
    },
    {
      koTrackName: "던던댄스",
      enTrackName: "Dun Dun Dance",
      bluekeyOriginalTrack: false,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
      ],
    },
    {
      koTrackName: "바나나 알러지 원숭이",
      enTrackName: "Banana Allergy Monkey",
      bluekeyOriginalTrack: true,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
        {
          koArtistName: "승희",
          enArtistName: "Seunghee",
          commissionRate: 30,
        },
      ],
    },
    {
      koTrackName: "불꽃놀이",
      enTrackName: "Fireworks",
      bluekeyOriginalTrack: false,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
      ],
    },
    {
      koTrackName: "던던댄스",
      enTrackName: "Dun Dun Dance",
      bluekeyOriginalTrack: false,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
      ],
    },
    {
      koTrackName: "바나나 알러지 원숭이",
      enTrackName: "Banana Allergy Monkey",
      bluekeyOriginalTrack: true,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
        {
          koArtistName: "승희",
          enArtistName: "Seunghee",
          commissionRate: 30,
        },
      ],
    },
    {
      koTrackName: "불꽃놀이",
      enTrackName: "Fireworks",
      bluekeyOriginalTrack: false,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
      ],
    },
    {
      koTrackName: "던던댄스",
      enTrackName: "Dun Dun Dance",
      bluekeyOriginalTrack: false,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
      ],
    },
    {
      koTrackName: "바나나 알러지 원숭이",
      enTrackName: "Banana Allergy Monkey",
      bluekeyOriginalTrack: true,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
        {
          koArtistName: "승희",
          enArtistName: "Seunghee",
          commissionRate: 30,
        },
      ],
    },
    {
      koTrackName: "불꽃놀이",
      enTrackName: "Fireworks",
      bluekeyOriginalTrack: false,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
      ],
    },
    {
      koTrackName: "던던댄스",
      enTrackName: "Dun Dun Dance",
      bluekeyOriginalTrack: false,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
      ],
    },
    {
      koTrackName: "바나나 알러지 원숭이",
      enTrackName: "Banana Allergy Monkey",
      bluekeyOriginalTrack: true,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
        {
          koArtistName: "승희",
          enArtistName: "Seunghee",
          commissionRate: 30,
        },
      ],
    },
    {
      koTrackName: "불꽃놀이",
      enTrackName: "Fireworks",
      bluekeyOriginalTrack: false,
      participants: [
        {
          koArtistName: "아린",
          enArtistName: "Arin",
          commissionRate: 50,
        },
      ],
    },
  ],
};

export const MOCK_ALBUM_BAR: IGetAlbumMonthlySettlementResponse = {
  contents: [
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
};

export const MOCK_ALBUM_LINE: IGetAlbumTrackSettlementTrendsResponse = {
  tracks: [
    {
      trackId: 1,
      koTrackName: "불꽃놀이",
      enTrackName: "Fireworks",
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
      koTrackName: "던던댄스",
      enTrackName: "Dun Dun Dance",
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
      koTrackName: "바나나 알러지 원숭이",
      enTrackName: "Banana Allergy Monkey",
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
        koTrackName: "트랙1",
        enTrackName: "track1",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      track: {
        trackId: 2,
        koTrackName: "트랙2",
        enTrackName: "track2",
      },
      revenue: 800000,
      growthRate: 6.1,
      proportion: 35,
    },
    {
      track: {
        trackId: 3,
        koTrackName: "트랙3",
        enTrackName: "track3",
      },
      revenue: 600000,
      growthRate: -25.1,
      proportion: 10,
    },
    {
      track: {
        trackId: 4,
        koTrackName: "트랙4",
        enTrackName: "track4",
      },
      revenue: 40000,
      growthRate: -13,
      proportion: 6,
    },
    {
      track: {
        trackId: 5,
        koTrackName: "트랙5",
        enTrackName: "track5",
      },
      revenue: 300,
      growthRate: 2.5,
      proportion: 4,
    },
  ],
};

export const MOCK_ALBUM_DASHBOARD_CARD: IGetAlbumDashboardResponse = {
  settlement:
  {
    totalAmount: 1000,
    growthRate: 10.2,
  },
  bestTrack:
  {
    trackId: 1,
    koTrackName: "트랙명2",
    enTrackName: "track2",
    growthRate: -30,
  },
};
/* ########################## */

/* ##### 2. TRANSACTION ##### */
export const MOCK_TRANSACTION_UPLOAD: IGETTransactionUploadResponse = {
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

export const MOCK_EMPTY_TRANSACTION_UPLOAD: IGETTransactionUploadResponse = {
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
    koArtistName: "아이유",
    enArtistName: "IU",
    growthRate: 0.3,
  },
};

export const MOCK_ADMIN_BAR: IGetAdminMonthlyEarningsTrendsResponse = {
  contents: [
    {
      month: 1,
      netIncome: 2142344,
      revenue: 732143,
    },
    {
      month: 2,
      netIncome: 2132459,
      revenue: 732392,
    },
    {
      month: 3,
      netIncome: 1836935,
      revenue: 632143,
    },
    {
      month: 4,
      netIncome: 5142344,
      revenue: 1032143,
    },
    {
      month: 5,
      netIncome: 3942344,
      revenue: 1032143,
    },
    {
      month: 6,
      netIncome: 2442344,
      revenue: 1032143,
    },

  ],
};

export const MOCK_ADMIN_TABLE: IGetAdminTrackTransactionResponse = {
  totalItems: 300,
  contents: [
    {
      track: {
        trackId: 1,
        koTrackName: "이름이 아주아주 매우매우 베리베리 긴 곡",
        enTrackName: "track name",
      },
      album: {
        albumId: 1,
        koAlbumName: "앨범 이름",
        enAlbumName: "Album name",
      },
      artists: [
        {
          memberId: 1,
          koArtistName: "아이유~~참말로제가한게아닙니더",
          enArtistName: "IU",
        },
        {
          memberId: 2,
          koArtistName: "지드래곤",
          enArtistName: "G-Dragon",
        },
        {
          memberId: 3,
          koArtistName: "태양",
          enArtistName: "Sun",
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
        koTrackName: "곡 제목",
        enTrackName: "track name",
      },
      album: {
        albumId: 2,
        koAlbumName: "앨범 이름",
        enAlbumName: "Album name",
      },
      artists: [
        {
          memberId: 2,
          koArtistName: "아이유",
          enArtistName: "IU",
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
        koTrackName: "곡 제목",
        enTrackName: "track name",
      },
      album: {
        albumId: 3,
        koAlbumName: "앨범 이름",
        enAlbumName: "Album name",
      },
      artists: [
        {
          memberId: 3,
          koArtistName: "아이유",
          enArtistName: "IU",
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
        koArtistName: "아이유",
        enArtistName: "IU",
      },
      revenue: 1000000000,
      growthRate: 250,
      proportion: 50,
    },
    {
      artist: {
        memberId: 2,
        koArtistName: "정국",
        enArtistName: "Jungkuk",
      },
      revenue: 10000000,
      growthRate: 24,
      proportion: 30,
    },
    {
      artist: {
        memberId: 3,
        koArtistName: "혁기",
        enArtistName: "Hyucki",
      },
      revenue: 10000,
      growthRate: 25,
      proportion: 10,
    },
    {
      artist: {
        memberId: 4,
        koArtistName: "SKY",
        enArtistName: "SKY",
      },
      revenue: 500,
      growthRate: -300,
      proportion: 6,
    },
    {
      artist: {
        memberId: 5,
        koArtistName: "지미 가드너",
        enArtistName: "Jimmi Gardener",
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
        koArtistName: "김블루",
        enArtistName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 2.5,
    },
    {
      artist: {
        koArtistName: "김블루",
        enArtistName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 2.5,
    },
    {
      artist: {
        koArtistName: "김블루",
        enArtistName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 2.5,
    },
    {
      artist: {
        koArtistName: "김블루",
        enArtistName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 2.5,
    },
    {
      artist: {
        koArtistName: "김블루",
        enArtistName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 2.5,
    },
    {
      artist: {
        koArtistName: "김블루",
        enArtistName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 2.5,
    },
    {
      artist: {
        koArtistName: "김블루",
        enArtistName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 2.5,
    },
    {
      artist: {
        koArtistName: "김블루",
        enArtistName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 2.5,
    },
    {
      artist: {
        koArtistName: "김블루",
        enArtistName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 2.5,
    },
    {
      artist: {
        koArtistName: "김블루",
        enArtistName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 2.5,
    },
    {
      artist: {
        koArtistName: "김블루",
        enArtistName: "bluekey",
        profileImage: "https://biz.chosun.com/resizer/CMMnrLVaHCUa7dMliL1X58L4ah8=/530x640/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/WVRMPWAH7BOOJOZCMEKRV4CX5U.jpg",
      },
      revenue: 300,
      netIncome: 1234,
      settlementAmount: 1234124,
      representativeTrack: "love",
      monthlyIncreaseRate: 2.5,
    },
  ],
};

export const MOCK_ARTIST_DASHBOARD_CARD: IGetArtistDashboardResponse = {
  settlement:
  {
    totalAmount: 1000,
    growthRate: 10.2,
  },
  bestAlbum:
  {
    albumId: 1,
    koAlbumName: "앨범명2",
    enAlbumName: "album2",
    growthRate: 300,
  },
  bestTrack:
  {
    trackId: 1,
    koTrackName: "트랙명2",
    enTrackName: "track2",
    growthRate: -30,
  },
};

export const MOCK_ARTIST_TABLE: IGetArtistTrackTransactionResponse = {
  totalItems: 300,
  contents: [
    {
      track: {
        trackId: 1,
        koTrackName: "아주아주 이름이 매우매우 긴 곡",
        enTrackName: "track name",
      },
      album: {
        albumId: 1,
        koAlbumName: "앨범 이름",
        enAlbumName: "Album name",
      },
      artists: [
        {
          memberId: 1,
          koArtistName: "아이유",
          enArtistName: "IU",
        },
      ],
      revenue: 1000000000,
      settlementAmount: 900000,
      commissionRate: 30,
    },
    {
      track: {
        trackId: 2,
        koTrackName: "곡 제목",
        enTrackName: "track name",
      },
      album: {
        albumId: 2,
        koAlbumName: "앨범 이름",
        enAlbumName: "Album name",
      },
      artists: [
        {
          memberId: 2,
          koArtistName: "아이유",
          enArtistName: "IU",
        },
      ],
      revenue: 17831413,
      settlementAmount: 900000,
      commissionRate: 90,
    },
    {
      track: {
        trackId: 3,
        koTrackName: "곡 제목",
        enTrackName: "track name",
      },
      album: {
        albumId: 3,
        koAlbumName: "앨범 이름",
        enAlbumName: "Album name",
      },
      artists: [
        {
          memberId: 3,
          koArtistName: "아이유",
          enArtistName: "IU",
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
        koTrackName: "트랙1",
        enTrackName: "track1",
      },
      revenue: 1000000,
      growthRate: 2.1,
      proportion: 45,
    },
    {
      track: {
        trackId: 2,
        koTrackName: "트랙2",
        enTrackName: "track2",
      },
      revenue: 800000,
      growthRate: 6.1,
      proportion: 35,
    },
    {
      track: {
        trackId: 3,
        koTrackName: "트랙3",
        enTrackName: "track3",
      },
      revenue: 600000,
      growthRate: -25.1,
      proportion: 10,
    },
    {
      track: {
        trackId: 4,
        koTrackName: "트랙4",
        enTrackName: "track4",
      },
      revenue: 40000,
      growthRate: -13,
      proportion: 6,
    },
    {
      track: {
        trackId: 5,
        koTrackName: "트랙5",
        enTrackName: "track5",
      },
      revenue: 300,
      growthRate: 2.5,
      proportion: 4,
    },
  ],
};

export const MOCK_ARTIST_BAR: IGetArtistMonthlySettlementResponse = {
  contents: [
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
};

export const MOCK_ARTIST_ALBUMS: IGetArtistAlbumsResponse = {
  totalItems: 300,
  contents: [
    {
      albumId: 1,
      albumImage: "https://image.bugsm.co.kr/album/images/500/201408/20140893.jpg",
      koAlbumName: "비밀정원",
    },
    {
      albumId: 2,
      albumImage: "https://spnimage.edaily.co.kr/images/photo/files/NP/S/2023/05/PS23050700058.jpg",
      koAlbumName: "클로저",
    },
    {
      albumId: 3,
      albumImage: "https://cdn.obsnews.co.kr/news/photo/201605/974498_234531_5514.jpg",
      koAlbumName: "윈디데이",
    },
    {
      albumId: 4,
      albumImage: "https://image.bugsm.co.kr/album/images/500/201408/20140893.jpg",
      koAlbumName: "번지",
    },
    {
      albumId: 5,
      albumImage: "https://spnimage.edaily.co.kr/images/photo/files/NP/S/2023/05/PS23050700058.jpg",
      koAlbumName: "던던댄스",
    },
    {
      albumId: 6,
      albumImage: "https://cdn.obsnews.co.kr/news/photo/201605/974498_234531_5514.jpg",
      koAlbumName: "살짝설렜어",
    },
  ],
};
/* ########################## */
