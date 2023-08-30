import {
  AdminRole,
  AdminType, ArtistRole, UserType,
} from "@/types/enums/user.enum";

interface IName {
  name: string,
  enName: string,
}

// 이름 관련
export interface IArtist extends IName {
  memberId: number,
}

interface ITrack extends IName {
  trackId: number,
}

interface IAlbum extends IName {
  albumId: number,
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
  settlement: number | null,
}

// /api/v1/albums/{albumId}/dashboard
// /api/v1/artist/{memberId}/dashboard/monthly
export interface ILineMonthlySettlement { // 꺾은선 차트
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
  monthlyTrend: ILineMonthlySettlement[]
}

// Info 관련
export interface ITrackParticipantInfo {
  memberId: number | null,
  name: string,
  enName: string,
  commissionRate: number | null
}

export interface ITrackInfo extends ITrack {
  isOriginalTrack: boolean,
  artists: ITrackParticipantInfo[],
}

// /api/v1/albums/{albumId}
export interface IAlbumInfo extends IAlbum {
  albumImage: string | null,
  artist: IArtist | null, // 앨범 대표 아티스트가 없을 수도 있음
  tracks: ITrackInfo[]
}

// /api/v1/albums
export interface IAlbumCard extends IAlbum {
  albumImage: string,
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
export interface IArtistDashboardCard extends IArtist {
  settlementAmount: IEarnings,
  bestAlbum: IAlbum & {
    growthRate: number | null
  },
  bestTrack: ITrack & {
    growthRate: number | null
  }
}

export interface IAlbumDashboardCard extends IAlbum {
  revenue: IEarnings,
  netIncome: IEarnings,
  settlementAmount: IEarnings,
  bestTrack: ITrack & {
    growthRate: number | null
  }
}

// 아티스트 현황
// /api/v1/artist
export interface IArtistList {
  artist: IArtist & {
    profileImage: string | null
  },
  revenue: number | null,
  netIncome: number | null,
  settlementAmount: number | null,
  representativeTrack: string,
  monthlyIncreaseRate: number | null,
}

// 프로필 관련
interface IProfile {
  memberId: number,
  loginId: string,
  profileImage: string | null
}

export interface IAdminProfile extends IProfile {
  email: string,
  type: AdminType,
  role: AdminRole,
  nickname: string
}

export interface IAdminUpdateProfileFieldValues extends Partial<Pick<IAdminProfile, "email" | "nickname">> {
  profileImage: File | null,
}

export interface IArtistProfile extends IProfile {
  email: string | null,
  type: UserType,
  role: ArtistRole,
  name: string,
  enName: string,
}

export interface IArtistUpdateProfileFieldValues {
  email?: string
  profileImage: File | null;
}

// 정산액 업로드 관련
export interface ITransactionUploadAlert {
  rowIndex: number,
  columnIndex: number,
  columnName: string,
  cellValue: string,
  type: string,
  severity: string,
  message: string
}

// /api/v1/transactions
export interface ITransactionUpload {
  id: number,
  name: string,
  uploadAt: string,
  warnings?: ITransactionUploadAlert[],
  errors?: ITransactionUploadAlert[],
}

// 계정 관련
export interface IAdminAccount {
  memberId: number,
  nickname: string,
  loginId: string,
  email: string,
}

export interface IArtistAccount extends IArtist {
  loginId: string,
  email: string | null,
  commissionRate: number | null,
}

export interface ISignIn {
  loginId: string,
  password: string,
}

export interface IAdminSignup extends ISignIn {
  email: string,
  nickname: string,
}
