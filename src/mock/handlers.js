import { rest } from "msw";

export const handlers = [
  rest.post("*/login", (req, res, ctx)=>{
    return res (
      ctx.status(200),
      ctx.json({
        data: {
          "member": {
            "memberId": 1,
            "nickname": "bluekey",
            "email": "bluekey@gmail.com",
            "loginId": "bluekey",
            "type": "ADMIN",
            "role": "SUPER_ADMIN",
            "profileImage": "https://bluekey.com/profile.png"
          },
          "jwtInformation": {
            "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJibHVla2V5Iiwia"
          }
        }
      })
    )
  })
]
