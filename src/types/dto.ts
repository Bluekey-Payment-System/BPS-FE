// 이름 관련
interface IName {
  id: number,
  name: string,
  enName: string
}

interface IArtist extends IName { // type IArtist = IName 으로?
}

interface ITrack extends IName {
}

interface IAlbum extends IName {
}

interface IEarnings {
  totalAmount: number | null,
  growthRate: number | null,
}

export interface ITrackTransaction {
  track: ITrack,
  album: IAlbum,
  artists: IArtist[],
  revenue: number | null,
  netIncome: number | null,
  settlementAmount: number | null,
  commissionRate: number | null // 사측 요율, 불확실
}

// 차트 관련
export interface IBarMonthlyEarnings { // 어드민이 보는 바 차트
  month: number,
  revenue: number | null,
  netIncome: number | null,
}

export interface IBarMonthlySettlement { // 아티스트가 보는 바 차트
  month: number,
  settlement: number | null,
  revenue: number | null,
}

interface IRevenue { // 도넛 차트
  revenue: number | null,
  growthRate: number | null,
  proportion: number | null, // 불확실
}

export interface IDoughnutArtistRevenue extends IRevenue { // 아티스트 도넛 차트
  artist: IArtist,
}

export interface IDoughnutrackRevenue extends IRevenue { // 트랙 도넛 차트
  track: ITrack,
}

export interface ILineTrackSettlementTrends extends ITrack { // 꺾은 선 차트
  monthlyTrend: IBarMonthlySettlement[]
}

// Info 관련
interface ITrackInfo {
  koName: string,
  enName: string,
  bluekeyOriginalTrack: boolean,
  Participants: {
    koName: string,
    enName: string,
    commissionRate: number | null // 불확실
  }[]
}

export interface IAlbumInfo {
  albumImage: string,
  albumKoName: string,
  albumEnName: string,
  artist: IArtist, // 노션에 프로퍼티 명이 다르지만 IArtist와 같게 올 것으로 추정
  tracks: ITrackInfo[]
}

export interface IAlbumCard {
  id: number,
  albumImage: string,
  name: string
}

// 대시보드 카드 관련
export interface IAdminDashboardCard {
  revenue: IEarnings,
  netIncome: IEarnings,
  settlementAmount: IEarnings,
  bestArtist: IArtist & { // 문법 불확실
    growthRate: number
  }
}

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
  albumKoName: string,
  albumEnName: string,
  settlement: IEarnings
  bestTrack: ITrack & {
    growthRate: number | null
  }
}

// 아티스트 현황
export interface IArtistList {
  artist: { // 다른 interface와 비교했을 때 프로퍼티 명이 통일이 안된 것 같음. 추후 변경 요청 필요할 것으로 에상
    koName: string,
    enName: string,
    profileImage: string
  },
  revenue: number | null,
  netIncome: number | null,
  settlementAmount: number | null,
  representativeTrack: string,
  monthlyIncreaseRate: number | null,
}

// 프로필 관련
interface IProfile {
  email: string // 이메일은 nullable한 값인가요?
  loginId: string,
  profileImage: string | null
}

export interface IAdminProfile extends IProfile {
  type: "SUPER_ADMIN" | "ADMIN" // enum 사용 어떻게?
  nickName: string
}

export interface IArtistProfile extends IProfile {
  type: "ARTIST", // enum 사용 어떻게?
  koName: string,
  enName: string,
  isSameKoNameWithEnName: boolean,
}

// 정산액 업로드 관련
export interface ITransactionUpload {
  id: number,
  name: string,
  uploadAt: string
}
