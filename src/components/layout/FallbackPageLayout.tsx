import React from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import Spacing from "@/components/common/Layouts/Spacing";
import {
  APPROVAL_PENDING_TYPE_OBJ,
  APPROVAL_REJECTED_TYPE_OBJ,
  ERROR_TYPE_OBJ,
  MAINTENANCE_TYPE_OBJ,
  NOTFOUND_TYPE_OBJ,
} from "@/constants/fallbackPageLayout";

import styles from "./FallbackPageLayout.module.scss";

const cx = classNames.bind(styles);

const typeObjMap = {
  notFound: NOTFOUND_TYPE_OBJ,
  error: ERROR_TYPE_OBJ,
  maintenance: MAINTENANCE_TYPE_OBJ,
  approvalPending: APPROVAL_PENDING_TYPE_OBJ,
  approvalRejected: APPROVAL_REJECTED_TYPE_OBJ,
};

interface FallbackPageLayoutProps {
  pageType: "notFound" | "error" | "maintenance" | "approvalPending" | "approvalRejected"
  description: string | string[]
  buttonElements?: React.ReactNode
}

/**
 * #### Fallback 페이지에서 사용되는 레이아웃입니다.
 * ##### 사용처: 404, 에러, 점검 중, 권한 승인 대기/거절
 *
 * @param {string} pageType - 페이지 유형을 나타내는 문자열입니다.
 * "notFound" | "error" | "maintenance" | "approvalPending" | "approvalRejected" 중 하나의 값이 올 수 있습니다.
 * @param {Array<string> | string} description - 페이지에 표시할 설명 내용입니다.
 * 한 단락인 경우 string, 두 단락 이상인 경우 string[]으로 제공할 수 있습니다.
 * 백틱 + 엔터를 통해 줄넘김을 표시할 수 있습니다.
 * @param {React.ReactNode} buttonElements - 페이지에 표시할 버튼 요소입니다. 옵션으로 제공할 수 있습니다.
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 *
 */
const FallbackPageLayout = ({
  pageType,
  description,
  buttonElements,
}: FallbackPageLayoutProps) => {
  return (
    <div className={cx("container")}>
      <div className={cx("logoWrapper")}>
        <Image src="/images/bluekey-insight-logo.svg" width={229} height={44} alt="로고" />
      </div>
      <Spacing size={16} />
      <div className={cx("imageWrapper")}>
        <Image
          src={typeObjMap[pageType].image.src}
          width={typeObjMap[pageType].image.width}
          height={typeObjMap[pageType].image.height}
          alt={typeObjMap[pageType].image.alt}
        />
      </div>
      <Spacing size={50} />
      <div className={cx("textContainer")}>
        <h1 className={cx("title")}>{typeObjMap[pageType].title}</h1>
        {typeof description === "string"
          ? <p className={cx("description")}>{description}</p>
          : description.map((paragraph) => {
            return (
              <p key={paragraph} className={cx("description")}>{paragraph}</p>
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
