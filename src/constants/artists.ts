export const ARTISTS = [
  {
    memberId: 1,
    name: "혁기",
    enName: "hyunki",
  },
  {
    memberId: 2,
    name: "53X",
    enName: "53X",
  },
  {
    memberId: 3,
    name: "덤프",
    enName: "dump",
  },
  {
    memberId: 4,
    name: "이은성",
    enName: "이은성",
  },
  {
    memberId: 5,
    name: "SKY",
    enName: "SKY",
  },
  {
    memberId: 6,
    name: "블루키",
    enName: "블루키",
  },
];

export const DROPDOWN_ARTIST_LIST = ARTISTS.map((artistObj) => {
  return {
    id: artistObj.memberId,
    name: artistObj.name,
  };
});
