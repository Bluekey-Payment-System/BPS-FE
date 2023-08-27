import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import Checkbox from "@/components/common/Inputs/Checkbox/Checkbox";
import TextField from "@/components/common/Inputs/TextField/TextField";
import TextFieldWithUnit from "@/components/common/Inputs/TextFieldWithUnit/TextFieldWithUnit";
import Spacing from "@/components/common/Layouts/Spacing";
import useAddAlbumTrack from "@/services/queries/albums/useAddAlbumTrack";
import { ITrackFieldValues } from "@/types/album.types";
import { IAlbumInfo } from "@/types/dto";

import styles from "./AddTrackForm.module.scss";

const cx = classNames.bind(styles);

const AddTrackForm = ({ albumInfo }: { albumInfo: IAlbumInfo }) => {
  const {
    register, formState: { errors }, handleSubmit, control,
  } = useForm<ITrackFieldValues>({
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
  const { mutate, isLoading } = useAddAlbumTrack(albumInfo.albumId);
  const onSubmit: SubmitHandler<ITrackFieldValues> = (data) => {
    mutate(data);
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
        <div className={cx("inputArea")}>
          <ul className={cx("artistInputList")}>
            {fields.map((field, index) => {
              return (
                <li key={field.id} className={cx("artistInputRow")}>
                  <TextField
                    label="아티스트명"
                    {...register(`artists.${index}.name`)}
                    placeholder="아티스트를 입력해주세요"
                    errors={errors}
                  />
                  <TextFieldWithUnit
                    label="요율"
                    {...register(`artists.${index}.commissionRate`)}
                    placeholder="영문 트랙명을 입력해주세요"
                    errors={{}}
                    unit="%"
                  />
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
        <Button size="medium" theme="bright" type="button">창 닫기</Button>
      </div>
    </form>
  );
};

export default AddTrackForm;
