import React from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import Spacing from "@/components/common/Layouts/Spacing";

import styles from "./FallbackPageLayout.module.scss";

const cx = classNames.bind(styles);

const typeMap = {
  404: {
    image: {
      src: "/images/error-warning.png",
      width: 166,
      height: 170,
      alt: "에러 워닝",
    },
    title: "죄송합니다. 원하시는 페이지를 찾을 수 없습니다.",
  },
  error: {
    image: {
      src: "/images/error-warning.png",
      width: 166,
      height: 170,
      alt: "에러 워닝",
    },
    title: "잠시후 다시 확인해주세요.",
  },
  systemChecking: {
    image: {
      src: "/images/maintenence.png",
      width: 155,
      height: 170,
      alt: "시스템 점검",
    },
    title: "시스템 점검 중입니다.",
  },
  approvalWaiting: {
    image: {
      src: "/images/pending.png",
      width: 138,
      height: 170,
      alt: "신청 대기 중",
    },
    title: "관리자 권한 승인 대기중입니다.",
  },
  approvalRejected: {
    image: {
      src: "/images/rejected.png",
      width: 187,
      height: 170,
      alt: "신청 거절",
    },
    title: "관리자 권한 신청이 거절되었습니다.",
  },
};

interface FallbackPageLayoutProps {
  pageType: "404" | "error" | "systemChecking" | "approvalWaiting" | "approvalRejected"
  descriptions: string[][]
  buttonElements?: React.ReactNode
}

/**
 * #### Fallback 페이지에서 사용되는 레이아웃입니다.
 * ##### 사용처: 404, 에러, 점검 중, 권한 승인 대기/거절
 *
 * @param {string} pageType - 페이지 유형을 나타내는 문자열입니다.
 * "404" | "error" | "systemChecking" | "approvalWaiting" | "approvalRejected" 중 하나의 값이 올 수 있습니다.
 * @param {Array<Array<string>>} descriptions - 페이지에 표시할 설명 내용의 문자열 2차 배열입니다.
 * 한 1차 배열의 내용이 p 태그로 감싸지고, 2차 배열의 각 내용이 br 태그로 줄넘김처리 됩니다.
 * @param {React.ReactNode} buttonElements - 페이지에 표시할 버튼 요소입니다. 옵션으로 제공할 수 있습니다.
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 *
 */
const FallbackPageLayout = ({
  pageType,
  descriptions,
  buttonElements,
}: FallbackPageLayoutProps) => {
  return (
    <div className={cx("container")}>
      <div className={cx("logoWrapper")}>
        <Image src="/images/bluekey-music-insight-logo.svg" width={300} height={44} alt="로고" />
      </div>
      <Spacing size={16} />
      <div className={cx("imageWrapper")}>
        <Image
          src={typeMap[pageType].image.src}
          width={typeMap[pageType].image.width}
          height={typeMap[pageType].image.height}
          alt={typeMap[pageType].image.alt}
        />
      </div>
      <Spacing size={50} />
      <div className={cx("textContainer")}>
        <h1 className={cx("title")}>{typeMap[pageType].title}</h1>
        {descriptions.map((description, idx) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <p className={cx("description")} key={idx}>
              {description.map((textLine) => {
                return (
                  <React.Fragment key={textLine}>
                    {textLine}
                    <br />
                  </React.Fragment>
                );
              })}
            </p>
          );
        })}
      </div>
      {buttonElements && (
        <>
          <Spacing size={50} />
          <div className={cx("buttonWrapper")}>
            {buttonElements}
          </div>
        </>
      )}
    </div>
  );
};

export default FallbackPageLayout;
