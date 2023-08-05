import localFont from "next/font/local";

const Pretendard = localFont({
  src: [
    {
      path: "./fonts/Pretendard-Regular.subset.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-SemiBold.subset.woff",
      weight: "600",
      style: "normal",
    },
  ],
});

export default Pretendard;
