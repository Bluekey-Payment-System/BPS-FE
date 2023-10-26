import { IRequestAuthority } from "@/types/dto";

import { IGetRequestAuthorities } from "../../types/notification-contoller";

export const REQUEST_AUTHORITIES_MOCK: IGetRequestAuthorities = {
  totalItems: 10,
  contents: [
    {
      requestAuthorityId: 10,
      sender: {
        memberId: 111,
        loginId: "bluekey10",
        nickname: "블루키10",
      },
      status: "PENDING",
      createdAt: "2023-10-23T16:24:58.925513",
    },
    {
      requestAuthorityId: 9,
      sender: {
        memberId: 42,
        loginId: "bluekey9",
        nickname: "블루키9",
      },
      status: "REJECTED",
      createdAt: "2023-10-22T20:24:58.925513",
    },
    {
      requestAuthorityId: 8,
      sender: {
        memberId: 41,
        loginId: "bluekey8",
        nickname: "블루키7",
      },
      status: "PENDING",
      createdAt: "2023-10-22T18:24:58.925513",
    },
    {
      requestAuthorityId: 7,
      sender: {
        memberId: 40,
        loginId: "bluekey7",
        nickname: "블루키7",
      },
      status: "APPROVED",
      createdAt: "2023-10-21T19:24:58.925513",
    },
    {
      requestAuthorityId: 6,
      sender: {
        memberId: 35,
        loginId: "admin_123",
        nickname: "어드민123",
      },
      status: "APPROVED",
      createdAt: "2023-10-20T22:24:58.925513",
    },
    {
      requestAuthorityId: 5,
      sender: {
        memberId: 32,
        loginId: "admin7890",
        nickname: "블루키_어드민",
      },
      status: "PENDING",
      createdAt: "2023-10-20T18:24:58.925513",
    },
    {
      requestAuthorityId: 4,
      sender: {
        memberId: 30,
        loginId: "bluekey4",
        nickname: "블루키4",
      },
      status: "REJECTED",
      createdAt: "2023-10-20T16:24:58.925513",
    },
    {
      requestAuthorityId: 3,
      sender: {
        memberId: 29,
        loginId: "bluekey3",
        nickname: "블루키3",
      },
      status: "APPROVED",
      createdAt: "2023-10-17T13:24:58.925513",
    },
    {
      requestAuthorityId: 2,
      sender: {
        memberId: 26,
        loginId: "bluekey2",
        nickname: "블루키2",
      },
      status: "PENDING",
      createdAt: "2023-10-16T16:24:58.925513",
    },
    {
      requestAuthorityId: 1,
      sender: {
        memberId: 24,
        loginId: "testuser1",
        nickname: "testuser1",
      },
      status: "PENDING",
      createdAt: "2023-10-13T16:22:01.98134",
    },
  ],
};

export const FILTERED_REQUESET_AUTHORITIES: IRequestAuthority[] = [
  {
    requestAuthorityId: 10,
    sender: {
      memberId: 111,
      loginId: "bluekey10",
      nickname: "블루키10",
    },
    status: "PENDING",
    createdAt: "2023-10-23T16:24:58.925513",
  },
  {
    requestAuthorityId: 8,
    sender: {
      memberId: 41,
      loginId: "bluekey8",
      nickname: "블루키7",
    },
    status: "PENDING",
    createdAt: "2023-10-22T18:24:58.925513",
  },
  {
    requestAuthorityId: 5,
    sender: {
      memberId: 32,
      loginId: "admin7890",
      nickname: "블루키_어드민",
    },
    status: "PENDING",
    createdAt: "2023-10-20T18:24:58.925513",
  },
  {
    requestAuthorityId: 2,
    sender: {
      memberId: 26,
      loginId: "bluekey2",
      nickname: "블루키2",
    },
    status: "PENDING",
    createdAt: "2023-10-16T16:24:58.925513",
  },
  {
    requestAuthorityId: 1,
    sender: {
      memberId: 24,
      loginId: "testuser1",
      nickname: "testuser1",
    },
    status: "PENDING",
    createdAt: "2023-10-13T16:22:01.98134",
  },
  {
    requestAuthorityId: 9,
    sender: {
      memberId: 42,
      loginId: "bluekey9",
      nickname: "블루키9",
    },
    status: "REJECTED",
    createdAt: "2023-10-22T20:24:58.925513",
  },
  {
    requestAuthorityId: 7,
    sender: {
      memberId: 40,
      loginId: "bluekey7",
      nickname: "블루키7",
    },
    status: "APPROVED",
    createdAt: "2023-10-21T19:24:58.925513",
  },
  {
    requestAuthorityId: 6,
    sender: {
      memberId: 35,
      loginId: "admin_123",
      nickname: "어드민123",
    },
    status: "APPROVED",
    createdAt: "2023-10-20T22:24:58.925513",
  },
  {
    requestAuthorityId: 4,
    sender: {
      memberId: 30,
      loginId: "bluekey4",
      nickname: "블루키4",
    },
    status: "REJECTED",
    createdAt: "2023-10-20T16:24:58.925513",
  },
  {
    requestAuthorityId: 3,
    sender: {
      memberId: 29,
      loginId: "bluekey3",
      nickname: "블루키3",
    },
    status: "APPROVED",
    createdAt: "2023-10-17T13:24:58.925513",
  },
];
