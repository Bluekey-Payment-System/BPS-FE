import { AdminType, ArtistType } from "./enums/user.enum";

// 이름 관련
interface IName {
  id: number,
  name: string,
  enName: string
}

interface IArtist {
  memberId: number,
  koArtistName: string,
  enArtistName: string
}

export interface ITrack {
  trackId: number,
  koTrackName: string,
  enTrackName: string
}

interface IAlbum extends IName {
}

interface IEarnings {
  totalAmount: number | null,
  growthRate: number | null,
}

// /api/v1/admin/dashboard/track
// /api/v1/artist/{memberId}/dashboard/settlement/track
export interface ITrackTransaction {
  track: ITrack,
  album: IAlbum,
  artists: IArtist[],
  revenue: number | null,
  netIncome: number | null,
  settlementAmount: number | null,
  commissionRate: number | null
}

// 차트 관련
// /api/v1/admin/dashboard/trend
export interface IBarMonthlyEarnings { // 어드민이 보는 바 차트
  month: number,
  revenue: number | null,
  netIncome: number | null,
}

// /api/v1/albums/{albumId}/dashboard
// /api/v1/artist/{memberId}/dashboard/monthly
export interface IBarMonthlySettlement { // 아티스트가 보는 바 차트
  month: number,
  settlement: number | null,
  revenue: number | null,
}

interface IRevenue { // 도넛 차트
  revenue: number | null,
  growthRate: number | null,
  proportion: number | null,
}

// /api/v1/admin/dashboard/artist
export interface IDoughnutArtistRevenue extends IRevenue { // 아티스트 도넛 차트
  artist: IArtist,
}

export interface IDoughnutTrackRevenue extends IRevenue { // 트랙 도넛 차트
  track: ITrack,
}

// /api/v1/albums/{albumId}/dashboard/track
export interface ILineTrackSettlementTrends extends ITrack { // 꺾은 선 차트
  monthlyTrend: IBarMonthlySettlement[]
}

// Info 관련
interface ITrackInfo {
  koTrackName: string,
  enTrackName: string,
  bluekeyOriginalTrack: boolean,
  participants: {
    koArtistName: string,
    enArtistName: string,
    commissionRate: number | null
  }[]
}

// /api/v1/albums/{albumId}
export interface IAlbumInfo {
  albumImage: string,
  koAlbumName: string,
  enAlbumName: string,
  artist: IArtist,
  tracks: ITrackInfo[]
}

// /api/v1/albums
export interface IAlbumCard {
  albumId: number,
  albumImage: string,
  koAlbumName: string
}

// 대시보드 카드 관련
// /api/v1/admin/dashboard
export interface IAdminDashboardCard {
  revenue: IEarnings,
  netIncome: IEarnings,
  settlementAmount: IEarnings,
  bestArtist: IArtist & {
    growthRate: number
  }
}

// /api/v1/artist/{memberId}/dashboard
export interface IArtistDashboardCard {
  settlement: IEarnings,
  bestAlbum: IAlbum & {
    growthRate: number | null
  },
  bestTrack: ITrack & {
    growthRate: number | null
  }
}

export interface IAlbumDashboardCard {
  koAlbumName: string,
  enAlbumName: string,
  settlement: IEarnings
  bestTrack: ITrack & {
    growthRate: number | null
  }
}

// 아티스트 현황
// /api/v1/artist
export interface IArtistList {
  artists: IArtist[],
  revenue: number | null,
  netIncome: number | null,
  settlementAmount: number | null,
  representativeTrack: string,
  monthlyIncreaseRate: number | null,
}

// 프로필 관련
interface IProfile {
  email: string | null,
  loginId: string,
  profileImage: string | null
}

export interface IAdminProfile extends IProfile {
  type: AdminType
  nickName: string
}

export interface IArtistProfile extends IProfile {
  type: ArtistType,
  koName: string,
  enName: string,
  isSameKoNameWithEnName: boolean,
}

// 정산액 업로드 관련
// /api/v1/transactions
export interface ITransactionUpload {
  id: number,
  name: string,
  uploadAt: string
}
