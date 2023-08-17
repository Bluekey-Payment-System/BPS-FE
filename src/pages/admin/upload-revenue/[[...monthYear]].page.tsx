import classNames from "classnames/bind";
import { useRouter } from "next/router";

import MainLayoutWithDropdown from "@/components/common/Layouts/MainLayoutWithDropdown";

import styles from "./[[...monthYear]].module.scss";

const cx = classNames.bind(styles);

const UploadRevenuePage = () => {
  const router = useRouter();

  return (
    <MainLayoutWithDropdown
      title="정산 내역 업로드"
      dropdownElement={(
        <div className={cx("monthYearButton")}>
          2023년 8월
        </div>
    )}
    >
      <h1>
        monthYear:
        {" "}
        {router.query.monthYear}
      </h1>
    </MainLayoutWithDropdown>
  );
};

export default UploadRevenuePage;
