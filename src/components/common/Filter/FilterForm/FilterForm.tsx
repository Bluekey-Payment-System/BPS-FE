/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from "classnames/bind";

import useArtistList from "@/services/queries/artists/useArtistList";

import Button from "../../CommonBtns/Button/Button";
import Dropdown from "../../Dropdown/Dropdown";
import Spacing from "../../Layouts/Spacing";

import styles from "./FilterForm.module.scss";
import MultiRangeSlider from "./MultiRangeSlider";

const cx = classNames.bind(styles);
/**
 * 검색 필터 폼 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param onSubmitSuccess {Function} 폼을 제출한 후에 할 작업을 실행하는 콜백함수입니다. 폼을 제출하는 함수가 아님에 주의하세요.
 * @example
 * ```
 * const [open, isOpen] = useState(false);
 * ...
 * return (
 *   <button onClick={()=>{setOpen(true)}}>필터 모달 오픈</button>
 *   <Modal>
 *     <FilterForm onSubmit={()=>{setOpen(false)}} /> // 폼을 제출하면 모달 닫기
 *   </Modal>
 * );
 * ```
 */
const FilterForm = ({ onSubmitSuccess }:{ onSubmitSuccess: () => void }) => {
  const artistList = useArtistList();
  return (
    <form className={cx("container")} onSubmit={(e) => { e.preventDefault(); onSubmitSuccess(); }}>
      <h2 className={cx("formHeading")}>
        필터
      </h2>
      <div className={cx("formBody")}>
        <div className={cx("row")}>
          <label htmlFor="memberId">
            <input type="hidden" name="memberId" />
            아티스트명
          </label>
          <div className={cx("inputArea")}>
            <Dropdown
              hasSearchBar
              dropdownListData={artistList}
              onClick={() => {}}
            />
          </div>
        </div>
        <div className={cx("row")}>
          <label>매출액</label>
          <div className={cx("inputArea")}>
            <input type="number" className={cx("rangeField")} placeholder="최소 금액" />
            <span>원 ~</span>
            <input type="number" className={cx("rangeField")} placeholder="최대 금액" />
            <span>원</span>
          </div>
        </div>
        <div className={cx("row")}>
          <label>회사이익</label>
          <div className={cx("inputArea")}>
            <input type="number" className={cx("rangeField")} placeholder="최소 금액" />
            <span>원 ~</span>
            <input type="number" className={cx("rangeField")} placeholder="최대 금액" />
            <span>원</span>
          </div>
        </div>
        <div className={cx("row")}>
          <label>정산액</label>
          <div className={cx("inputArea")}>
            <input type="number" className={cx("rangeField")} placeholder="최소 금액" />
            <span>원 ~</span>
            <input type="number" className={cx("rangeField")} placeholder="최대 금액" />
            <span>원</span>
          </div>
        </div>
        <div className={cx("row")}>
          <label>요율</label>
          <div className={cx("inputArea", "commissionRate")}>
            <div className={cx("sliderContainer")}>
              <MultiRangeSlider min={0} max={100} />
            </div>
          </div>
        </div>
        <Spacing size={11} />
        <div className={cx("hr")} />
      </div>
      <div className={cx("formFooter")}>
        <Button theme="dark" size="small" type="submit">적용</Button>
      </div>
    </form>
  );
};

export default FilterForm;
