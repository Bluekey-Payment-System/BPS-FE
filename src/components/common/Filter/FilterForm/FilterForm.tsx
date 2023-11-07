/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useRef } from "react";

import classNames from "classnames/bind";
import { useRouter } from "next/router";

import useArtistList from "@/services/queries/artists/useArtistList";

import Button from "../../CommonBtns/Button/Button";
import Dropdown from "../../Dropdown/Dropdown";
import Spacing from "../../Layouts/Spacing";
import { IFilterOptions } from "../Filter.type";

import styles from "./FilterForm.module.scss";
import MultiRangeSlider from "./MultiRangeSlider";
import { ISliderRefsObj } from "./MultiRangeSlider.type";

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
  const [isDropdownReset, setIsDropdownReset] = useState(false);
  const [isSliderReset, setIsSliderReset] = useState(false);

  const router = useRouter();
  const {
    mId = "", revFr = "", revTo = "", netFr = "", netTo = "", setFr = "", setTo = "", comFr = "", comTo = "",
  } = router.query;
  const initialOptions = {
    mId, revFr, revTo, netFr, netTo, setFr, setTo, comFr, comTo,
  } as IFilterOptions;
  const [mIdValue, setMIdValue] = useState(initialOptions.mId);
  const revFrRef = useRef<HTMLInputElement>(null);
  const revToRef = useRef<HTMLInputElement>(null);
  const netFrRef = useRef<HTMLInputElement>(null);
  const netToRef = useRef<HTMLInputElement>(null);
  const setFrRef = useRef<HTMLInputElement>(null);
  const setToRef = useRef<HTMLInputElement>(null);
  const comRefs = useRef<ISliderRefsObj>({
    comFrRef: null,
    comToRef: null,
  });

  const handleSubmitFilterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = {
      mId: mIdValue,
      revFr: revFrRef.current?.value ?? "",
      revTo: revToRef.current?.value ?? "",
      netFr: netFrRef.current?.value ?? "",
      netTo: netToRef.current?.value ?? "",
      setFr: setFrRef.current?.value ?? "",
      setTo: setToRef.current?.value ?? "",
      comFr: comRefs.current.comFrRef?.value ?? "",
      comTo: comRefs.current.comToRef?.value ?? "",
    };
    onSubmit(options);
    onSubmitSuccess();
  };

  const handleClickResetButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDropdownReset(true);
    setMIdValue("");
    setIsSliderReset(true);
    if (revFrRef.current && revToRef.current
      && netFrRef.current && netToRef.current
      && setFrRef.current && setToRef.current
      && comRefs.current.comFrRef && comRefs.current.comToRef) {
      revFrRef.current.value = "";
      revToRef.current.value = "";
      netFrRef.current.value = "";
      netToRef.current.value = "";
      setFrRef.current.value = "";
      setToRef.current.value = "";
    }
  };

  return (
    <form className={cx("container")} onSubmit={handleSubmitFilterForm}>
      <h2 className={cx("formHeading")}>
        필터
      </h2>
      <div className={cx("formBody")}>
        <div className={cx("row")}>
          <label htmlFor="memberId">
            <input type="hidden" name="memberId" value={mIdValue} />
            아티스트명
          </label>
          <div className={cx("inputArea")}>
            <Dropdown
              hasSearchBar
              dropdownListData={artistList}
              onClick={(value) => { setIsDropdownReset(false); setMIdValue(String(value.id)); }}
              initialValue={artistList.find((artist) => { return artist.id === Number(initialOptions.mId); })}
              isReset={isDropdownReset}
            />
          </div>
        </div>
        <div className={cx("row")}>
          <label>매출액</label>
          <div className={cx("inputArea")}>
            <input type="number" className={cx("rangeField")} placeholder="최소 금액" ref={revFrRef} defaultValue={initialOptions.revFr} />
            <span>원 ~</span>
            <input type="number" className={cx("rangeField")} placeholder="최대 금액" ref={revToRef} defaultValue={initialOptions.revTo} />
            <span>원</span>
          </div>
        </div>
        <div className={cx("row")}>
          <label>회사이익</label>
          <div className={cx("inputArea")}>
            <input type="number" className={cx("rangeField")} placeholder="최소 금액" ref={netFrRef} defaultValue={initialOptions.netFr} />
            <span>원 ~</span>
            <input type="number" className={cx("rangeField")} placeholder="최대 금액" ref={netToRef} defaultValue={initialOptions.netTo} />
            <span>원</span>
          </div>
        </div>
        <div className={cx("row")}>
          <label>정산액</label>
          <div className={cx("inputArea")}>
            <input type="number" className={cx("rangeField")} placeholder="최소 금액" ref={setFrRef} defaultValue={initialOptions.setFr} />
            <span>원 ~</span>
            <input type="number" className={cx("rangeField")} placeholder="최대 금액" ref={setToRef} defaultValue={initialOptions.setTo} />
            <span>원</span>
          </div>
        </div>
        <div className={cx("row")}>
          <label>요율</label>
          <div className={cx("inputArea", "commissionRate")}>
            <div className={cx("sliderContainer")}>
              <MultiRangeSlider
                min={0}
                max={100}
                initialMinValue={Number(initialOptions.comFr)}
                initialMaxValue={Number(initialOptions.comTo)}
                isReset={isSliderReset}
                setIsReset={setIsSliderReset}
                ref={comRefs}
              />
            </div>
          </div>
        </div>
        <Spacing size={11} />
        <div className={cx("hr")} />
      </div>
      <div className={cx("formFooter")}>
        <button className={cx("resetButton")} onClick={handleClickResetButton}>필터 초기화</button>
        <Button theme="dark" size="small" type="submit">적용</Button>
      </div>
    </form>
  );
};

export default FilterForm;
