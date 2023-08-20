import { ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import ImageUploader from "@/components/common/ImageUploader/ImageUploader";
import TextField from "@/components/common/Inputs/TextField/TextField";
import TextFieldWithCopy from "@/components/common/Inputs/TextFieldWithCopy/TextFieldWithCopy";
import TextFieldWithUnit from "@/components/common/Inputs/TextFieldWithUnit/TextFieldWithUnit";
import ArtboardLayout from "@/components/common/Layouts/ArtboardLayout";
import MainLayout from "@/components/common/Layouts/MainLayout";
import SectionHr from "@/components/common/Layouts/SectionHr";
import { IArtistFieldValues } from "@/types/artist.types";

import styles from "./index.module.scss";
import { generateRandomStringWithRegex } from "./index.utils";

const cx = classNames.bind(styles);

const ArtistCreatePage = () => {
  const {
    register, handleSubmit, formState: { errors }, setValue,
  } = useForm<IArtistFieldValues>({
    mode: "onBlur",
    defaultValues: {
      password: generateRandomStringWithRegex(/^[a-zA-Z0-9@$!%*?&_-]*$/, 6, 18),
    },
  });

  const onSubmit: SubmitHandler<IArtistFieldValues> = (data) => {
    // TODO: /api/v1/artist 로 POST요청 (Content-Type: multipart/formData)
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(data));
  };

  return (
    <MainLayout title="아티스트 등록">
      <ArtboardLayout>
        <div className={cx("container")}>
          <section className={cx("profileImageSection")}>
            <h1 className={cx("title")}>아티스트 프로필 이미지 업로드</h1>
            <div className={cx("imageUploadContainer")}>
              <ImageUploader shape="circle" {...register("profileImage")} />
              <span className={cx("sizeLimitText")}>*이미지 크기는 6MB 이하로 업로드 해주세요.</span>
            </div>
          </section>
          <SectionHr />
          <section className={cx("artistInfoSection")}>
            <h1 className={cx("title")}>아티스트 계정 정보 입력</h1>
            {/* eslint-disable @typescript-eslint/no-misused-promises */}
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
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    const val = parseInt(e.target.value.replace(/\D/g, ""), 10);
                    setValue("commissionRate", Number.isNaN(val) ? undefined : val);
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
                errors={errors}
              />
              <Button type="submit" size="large" theme="dark" style={{ width: "218px", marginTop: "16px" }}>아티스트 등록</Button>
            </form>
          </section>
        </div>
      </ArtboardLayout>
    </MainLayout>
  );
};

export default ArtistCreatePage;
