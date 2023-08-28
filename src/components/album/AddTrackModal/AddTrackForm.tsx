import { ChangeEvent } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import { IHasSearchBarData } from "@/components/common/Dropdown/Dropdown.type";
import Checkbox from "@/components/common/Inputs/Checkbox/Checkbox";
import TextField from "@/components/common/Inputs/TextField/TextField";
import TextFieldWithUnit from "@/components/common/Inputs/TextFieldWithUnit/TextFieldWithUnit";
import Spacing from "@/components/common/Layouts/Spacing";
import { DROPDOWN_ARTIST_LIST } from "@/constants/artists";
import useAddAlbumTrack from "@/services/queries/albums/useAddAlbumTrack";
import { ITrackFieldValues } from "@/types/album.types";
import { IAlbumInfo } from "@/types/dto";

import styles from "./AddTrackForm.module.scss";

const cx = classNames.bind(styles);

interface AddTrackFormProps {
  albumInfo: IAlbumInfo;
  onClose: () => void;
}

const AddTrackForm = ({ albumInfo, onClose }: AddTrackFormProps) => {
  const {
    register, formState: { errors }, handleSubmit, control, watch, setValue,
  } = useForm<ITrackFieldValues>({
    mode: "onBlur",
    defaultValues: {
      artists: [{ name: "", memberId: 1 }],
    },
  });
  const {
    fields, append, remove,
  } = useFieldArray<ITrackFieldValues>({
    control,
    name: "artists",
  });
  const { mutateAsync, isLoading, isError } = useAddAlbumTrack(albumInfo.albumId);
  const onSubmit: SubmitHandler<ITrackFieldValues> = async (data) => {
    await mutateAsync(data);
    // eslint-disable-next-line no-console
    console.log(data);
    if (!isError) {
      onClose();
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={cx("container")} onSubmit={handleSubmit(onSubmit)}>
      <div className={cx("checkBoxContainer")}>
        <Checkbox label="블루키 오리지널 트랙" {...register("originalTrack")} />
      </div>
      <div className={cx("trackNameSection")}>
        <h2>수록곡 추가</h2>
        <div className={cx("inputArea")}>
          <TextField
            label="트랙명 (한글)"
            {...register("name")}
            placeholder="트랙명을 입력해주세요"
            errors={errors}
          />
          <TextField
            label="트랙명 (영문)"
            {...register("enName")}
            placeholder="영문 트랙명을 입력해주세요"
            errors={errors}
          />
        </div>
      </div>
      <div className={cx("divider")} />
      <div className={cx("trackMemberSection")}>
        <h2>수록곡의 아티스트 추가</h2>
        <div className={cx("addBtnContainer")}>
          <ChipButton
            size="large"
            onClick={() => {
              append({ memberId: null, name: "", commissionRate: 0 });
            }}
          >
            아티스트 추가
          </ChipButton>
        </div>
        <div className={cx("inputArea", "trackMember")}>
          <ul className={cx("artistInputList")}>
            {fields.map((field, index) => {
              return (
                <li key={field.id} className={cx("artistInputRow")}>
                  <div>
                    <div className={cx("dropdownContainer")}>
                      <span>대표 아티스트</span>
                      <Dropdown<IHasSearchBarData>
                        hasSearchBar
                        dropdownListData={DROPDOWN_ARTIST_LIST}
                        onClick={(value) => {
                          setValue(`artists.${index}.memberId`, value.id);
                          setValue(`artists.${index}.name`, value.name);
                        }}
                      />
                      <input {...register(`artists.${index}.memberId`)} type="hidden" />
                      <input {...register(`artists.${index}.name`)} type="hidden" />
                      <Spacing size={14} />
                    </div>
                    <TextFieldWithUnit
                      label="요율"
                      {...register(`artists.${index}.commissionRate`, {
                        setValueAs: (v: string) => {
                          const val = parseInt(v, 10);
                          return Number.isNaN(val) ? null : val;
                        },
                        onChange: (e: ChangeEvent<HTMLInputElement>) => {
                          const val = parseInt(e.target.value.replace(/\D/g, ""), 10);
                          setValue(`artists.${index}.commissionRate`, Number.isNaN(val) ? null : val);
                        },
                        min: {
                          value: 0,
                          message: "*0~100 사이의 값을 입력하세요.",
                        },
                        max: {
                          value: 100,
                          message: "*0~100 사이의 값을 입력하세요.",
                        },
                      })}
                      placeholder={watch("originalTrack") === true ? "블루키 오리지널 트랙은 요율을 설정할 수 없습니다." : "요율을 입력하세요."}
                      disabled={watch("originalTrack") === true}
                      errors={errors}
                      inputMode="numeric"
                      max={100}
                      step={10}
                      unit="%"
                    />
                  </div>
                  <div className={cx("deleteBtnContainer")}>
                    <ChipButton
                      size="small"
                      disabled={fields.length === 1}
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      삭제
                    </ChipButton>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Spacing size={26} />
      <div className={cx("buttonSection")}>
        <Button size="medium" theme="dark" type="submit">
          {isLoading ? "추가하는 중..." : "추가하기"}
        </Button>
        <Button size="medium" theme="bright" type="button" onClick={onClose}>창 닫기</Button>
      </div>
    </form>
  );
};

export default AddTrackForm;
