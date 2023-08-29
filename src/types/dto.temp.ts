export interface ITrackStatus {
  track: {
    id: number
    name: string
    enName: string
  }
  album: {
    id: number
    name: string
    enName: string
  }
  artist: {
    id: number
    name: string
    enName: string
  }
  revenue: number | null
  netIncome: number | null
  settlementAmount: number | null
  commissionRate: number // 사측 요율
}

export interface IAdminProfile {
  type: "ADMIN"
  email: string
  loginId: string
  nickName: string
  profileImage: string | null
}
