import classNames from "classnames/bind";

import styles from "./SectionHr.module.scss";

const cx = classNames.bind(styles);

/**
 * #### 섹션 간의 구분선입니다. 구분선 위, 아래 마진이 적용되어 있습니다.
 *
 * @author 연우킴(drizzle96) [Github](https://github.com/drizzle96)
 * @param {boolean} isThick - 두꺼운 구분선인지 여부를 나타냅니다. 기본값은 false입니다.
 * isThick을 주지 않을 시 1px, isThick을 주면 10px의 구분선이 생깁니다.
 *
 */
const SectionHr = ({ isThick = false }: { isThick?: boolean }) => {
  return (
    <hr className={cx("hr", { isThick })} />
  );
};

export default SectionHr;
