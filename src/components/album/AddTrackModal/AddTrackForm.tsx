import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import Checkbox from "@/components/common/Inputs/Checkbox/Checkbox";
import TextField from "@/components/common/Inputs/TextField/TextField";
import TextFieldWithUnit from "@/components/common/Inputs/TextFieldWithUnit/TextFieldWithUnit";
import Spacing from "@/components/common/Layouts/Spacing";

import styles from "./AddTrackForm.module.scss";

const cx = classNames.bind(styles);

const AddTrackForm = () => {
  return (
    <form className={cx("container")}>
      <div className={cx("checkBoxContainer")}>
        <Checkbox label="블루키 오리지널 트랙" />
      </div>
      <div className={cx("trackNameSection")}>
        <h2>수록곡 추가</h2>
        <div className={cx("inputArea")}>
          <TextField label="트랙명 (한글)" placeholder="트랙명을 입력해주세요" errors={{}} />
          <TextField label="트랙명 (영문)" placeholder="영문 트랙명을 입력해주세요" errors={{}} />
        </div>
      </div>
      <div className={cx("divider")} />
      <div className={cx("trackMemberSection")}>
        <h2>수록곡의 아티스트 추가</h2>
        <div className={cx("addBtnContainer")}>
          <ChipButton size="large">아티스트 추가</ChipButton>
        </div>
        <div className={cx("inputArea")}>
          <div className={cx("deleteBtnContainer")}>
            <ChipButton size="small">삭제</ChipButton>
          </div>
          <TextField label="아티스트명" placeholder="트랙명을 입력해주세요" errors={{}} />
          <TextFieldWithUnit label="요율" placeholder="영문 트랙명을 입력해주세요" errors={{}} unit="%" />
        </div>
      </div>
      <Spacing size={26} />
      <div className={cx("buttonSection")}>
        <Button size="medium" theme="dark" type="submit">추가하기</Button>
        <Button size="medium" theme="bright" type="button">창 닫기</Button>
      </div>
    </form>
  );
};

export default AddTrackForm;
