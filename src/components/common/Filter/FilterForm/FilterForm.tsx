/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useCallback } from "react";

import classNames from "classnames/bind";
import { useRouter } from "next/router";

import useArtistList from "@/services/queries/artists/useArtistList";

import Button from "../../CommonBtns/Button/Button";
import Dropdown from "../../Dropdown/Dropdown";
import Spacing from "../../Layouts/Spacing";
import { IFilterOptions } from "../Filter.type";

import styles from "./FilterForm.module.scss";
import MultiRangeSlider from "./MultiRangeSlider";

const cx = classNames.bind(styles);

interface FilterFormProps {
  onSubmit: (options: IFilterOptions) => void,
  onSubmitSuccess: () => void
}

/**
 * 검색 필터 폼 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param onSubmit {Function} 폼을 제출할 때 실행하는 콜백함수입니다.
 * @param onSubmitSuccess {Function} 폼을 제출한 후에 할 작업을 실행하는 콜백함수입니다. 폼을 제출하는 함수가 아님에 주의하세요.
 * @example
 * ```
 * const [open, isOpen] = useState(false);
 * ...
 * return (
 *   <button onClick={()=>{setOpen(true)}}>필터 모달 오픈</button>
 *   <Modal>
 *     <FilterForm onSubmit={onSubmit} onSubmitSuccess={()=>{setOpen(false)}} />
 *   </Modal>
 * );
 * ```
 */
const FilterForm = ({ onSubmit, onSubmitSuccess }: FilterFormProps) => {
  const artistList = useArtistList();

  const router = useRouter();
  const {
    mId = "", revFr = "", revTo = "", netFr = "", netTo = "", setFr = "", setTo = "", comFr = "", comTo = "",
  } = router.query;
  const initialOptions = {
    mId, revFr, revTo, netFr, netTo, setFr, setTo, comFr, comTo,
  };
  const [options, setOptions] = useState(initialOptions as IFilterOptions);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prevOptions) => { return { ...prevOptions, [e.target.name]: e.target.value }; });
  };

  const handleChangeComRatioRange = useCallback((min: number, max: number) => {
    setOptions((prevOptions) => { return { ...prevOptions, comFr: String(min), comTo: String(max) }; });
  }, []);

  return (
    <form className={cx("container")} onSubmit={(e) => { e.preventDefault(); onSubmit(options); onSubmitSuccess(); }}>
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
              onClick={(value) => { setOptions((prevOptions) => { return { ...prevOptions, mId: String(value.id) }; }); }}
              initialValue={artistList.find((artist) => { return artist.id === Number(options.mId); })}
            />
          </div>
        </div>
        <div className={cx("row")}>
          <label>매출액</label>
          <div className={cx("inputArea")}>
            <input type="number" className={cx("rangeField")} placeholder="최소 금액" name="revFr" value={options.revFr} onChange={handleChangeInput} />
            <span>원 ~</span>
            <input type="number" className={cx("rangeField")} placeholder="최대 금액" name="revTo" value={options.revTo} onChange={handleChangeInput} />
            <span>원</span>
          </div>
        </div>
        <div className={cx("row")}>
          <label>회사이익</label>
          <div className={cx("inputArea")}>
            <input type="number" className={cx("rangeField")} placeholder="최소 금액" name="netFr" value={options.netFr} onChange={handleChangeInput} />
            <span>원 ~</span>
            <input type="number" className={cx("rangeField")} placeholder="최대 금액" name="netTo" value={options.netTo} onChange={handleChangeInput} />
            <span>원</span>
          </div>
        </div>
        <div className={cx("row")}>
          <label>정산액</label>
          <div className={cx("inputArea")}>
            <input type="number" className={cx("rangeField")} placeholder="최소 금액" name="setFr" value={options.setFr} onChange={handleChangeInput} />
            <span>원 ~</span>
            <input type="number" className={cx("rangeField")} placeholder="최대 금액" name="setTo" value={options.setTo} onChange={handleChangeInput} />
            <span>원</span>
          </div>
        </div>
        <div className={cx("row")}>
          <label>요율</label>
          <div className={cx("inputArea", "commissionRate")}>
            <div className={cx("sliderContainer")}>
              <MultiRangeSlider min={0} max={100} initialMinValue={Number(options.comFr)} initialMaxValue={Number(options.comTo)} onChangeValue={handleChangeComRatioRange} />
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
