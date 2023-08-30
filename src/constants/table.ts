import { IAdminProfile, ITrackStatus } from "@/types/dto.temp";

const MOCK_TRACK_STATUS_DATA: ITrackStatus[] = [{
  track: {
    id: 1,
    name: "사랑하긴 했었나요 스쳐가는 인연이었나요 짧지 않은 우리 함께했던 시간들이 자꾸 내 마음을 가둬두네",
    enName: "track1",
  },
  album: {
    id: 1,
    name: "하루도 그대를 사랑하지 않은 적이 없었다",
    enName: "album1",
  },
  artist: {
    id: 1,
    name: "그린 토마토 후라이드 치킨 순살 콤보",
    enName: "GTF-Green Tomato Fried Chicken",
  },
  revenue: 12345,
  netIncome: 12345,
  settlementAmount: 12345,
  commissionRate: 60,
}, {
  track: {
    id: 2,
    name: "곡2",
    enName: "track2",
  },
  album: {
    id: 1,
    name: "앨범1",
    enName: "album1",
  },
  artist: {
    id: 1,
    name: "혁기",
    enName: "hyucki",
  },
  revenue: null,
  netIncome: null,
  settlementAmount: 12345,
  commissionRate: 40,
}, {
  track: {
    id: 3,
    name: "곡2",
    enName: "track2",
  },
  album: {
    id: 1,
    name: "앨범1",
    enName: "album1",
  },
  artist: {
    id: 1,
    name: "혁기",
    enName: "hyucki",
  },
  revenue: null,
  netIncome: null,
  settlementAmount: 12345,
  commissionRate: 40,
}, {
  track: {
    id: 4,
    name: "곡2",
    enName: "track2",
  },
  album: {
    id: 1,
    name: "앨범1",
    enName: "album1",
  },
  artist: {
    id: 1,
    name: "혁기",
    enName: "hyucki",
  },
  revenue: null,
  netIncome: null,
  settlementAmount: 12345,
  commissionRate: 40,
}, {
  track: {
    id: 5,
    name: "곡2",
    enName: "track2",
  },
  album: {
    id: 1,
    name: "앨범1",
    enName: "album1",
  },
  artist: {
    id: 1,
    name: "혁기",
    enName: "hyucki",
  },
  revenue: null,
  netIncome: null,
  settlementAmount: 12345,
  commissionRate: 40,
}, {
  track: {
    id: 6,
    name: "곡2",
    enName: "track2",
  },
  album: {
    id: 1,
    name: "앨범1",
    enName: "album1",
  },
  artist: {
    id: 1,
    name: "혁기",
    enName: "hyucki",
  },
  revenue: null,
  netIncome: null,
  settlementAmount: 12345,
  commissionRate: 40,
}];

const MOCK_ADMIN_ACCOUNT_DATA: IAdminProfile[] = [
  {
    type: "ADMIN",
    email: "example@bluekeymusic.com",
    loginId: "bluekeymusic_domain",
    nickName: "김블루",
    profileImage: "https:s3....",
  },
  {
    type: "ADMIN",
    email: "example@bluekeymusic2.com",
    loginId: "bluekeymusic_domain2",
    nickName: "김블루2",
    profileImage: "https:s3....",
  },
  {
    type: "ADMIN",
    email: "example@bluekeymusic3.com",
    loginId: "bluekeymusic_domain3",
    nickName: "김블루3",
    profileImage: "https:s3....",
  },
  {
    type: "ADMIN",
    email: "example@bluekeymusic4.com",
    loginId: "bluekeymusic_domain4",
    nickName: "김블루4",
    profileImage: "https:s3....",
  },
];

export { MOCK_TRACK_STATUS_DATA, MOCK_ADMIN_ACCOUNT_DATA };
