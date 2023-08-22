import { ChangeEvent } from "react";
import {
  SubmitHandler, useFormContext,
} from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import TextField from "@/components/common/Inputs/TextField/TextField";
import TextFieldWithCopy from "@/components/common/Inputs/TextFieldWithCopy/TextFieldWithCopy";
import TextFieldWithUnit from "@/components/common/Inputs/TextFieldWithUnit/TextFieldWithUnit";
import { IArtistFieldValues } from "@/types/artist.types";

import styles from "./ArtistUploadForm.module.scss";

const cx = classNames.bind(styles);

interface AlbumFormProps {
  submitBtnText: string;
  onSubmit: SubmitHandler<IArtistFieldValues>;
}
/**
 * 아티스트업로드 폼 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param {string} submitBtnText submit버튼에 쓰일 텍스트
 * @param {Function} onSubmit submit핸들러
 * @example
 *
 * ```
 * const onSubmit = (data) => {await postAlbum("/api/albums", data)};
 * ...
 * <ArtistUploadForm onSubmit={onSubmit} submitBtnText="앨범 등록하기" />
 * ```
 */
const ArtistUploadForm = ({ submitBtnText, onSubmit }: AlbumFormProps) => {
  const {
    register, formState: { errors }, handleSubmit, setValue,
  } = useFormContext<IArtistFieldValues>();
  return (
    <div className={cx("container")}>
      {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className={cx("form")} onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="*활동 예명(한글)"
          {...register("name", {
            required: "예명을 입력하세요.",
          })}
          errors={errors}
        />
        <TextField
          label="*활동 예명(영문)"
          {...register("enName", {
            required: "영문 예명을 입력하세요.",
          })}
          errors={errors}
        />
        <TextField
          label="*계정 아이디"
          {...register("loginId", {
            required: "*계정 아이디를 입력하세요.",
            minLength: {
              value: 5,
              message: "*아이디는 5자 이상으로 입력해주세요.",
            },
            maxLength: {
              value: 20,
              message: "*아이디는 20자 이하로 입력해주세요.",
            },
            pattern: {
              value: /[-_a-z0-9]$/,
              message: "*영문 소문자, 숫자, 특수기호(_),(-)만 사용 가능합니다.",
            },
            validate: {
              startsWithChar: (v: string) => { return /^[a-z]/g.test(v) || "*아이디의 첫 글자는 영문 소문자로 시작해야 합니다."; },
            },
          })}
          errors={errors}
          placeholder="5~20자의 영문 소문자, 숫자, 특수기호(_),(-) 사용"
        />
        <TextField
          label="계정 이메일"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
              message: "*올바른 이메일을 입력해주세요.",
            },
          })}
          errors={errors}
          bottomText="*해당 이메일로 정산 완료 메일이 발송됩니다."
        />
        <TextFieldWithCopy
          label="임시 비밀번호"
          {...register("password")}
          disabled
          bottomText="*분실시 아티스트 계정 관리 페이지에서 재발급 받을 수 있습니다."
          errors={errors}
        />
        <TextFieldWithUnit
          label="기본 요율(아티스트 측)"
          {...register("commissionRate", {
            setValueAs: (v: string) => { return parseInt(v, 10); },
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              const val = parseInt(e.target.value.replace(/\D/g, ""), 10);
              setValue("commissionRate", Number.isNaN(val) ? null : val);
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
          unit="%"
          bottomText="*트랙별로 기본 요율과 다른 요율을 적용할 수도 있습니다."
          inputMode="numeric"
          max={100}
          step={10}
          errors={errors}
        />
        <Button
          type="submit"
          size="large"
          theme="dark"
          style={{ width: "218px", marginTop: "16px" }}
        >
          {submitBtnText}
        </Button>
      </form>
    </div>
  );
};

export default ArtistUploadForm;
