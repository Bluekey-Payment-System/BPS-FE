import React, { } from "react";
import {
  FieldValues, SubmitHandler, useForm,
} from "react-hook-form";

import { DevTool } from "@hookform/devtools";

import TextField from "@/components/common/Inputs/TextField/TextField";
import useToast from "@/hooks/useToast";
import TextFieldWithMaxBytes from "@/components/common/Inputs/TextFieldWithMaxBytes/TextFieldWithMaxBytes";
import PasswordField from "@/components/common/Inputs/PasswordInput/PasswordField";
import TextFieldWithCopy from "@/components/common/Inputs/TextFieldWithCopy/TextFieldWithCopy";
import TextFieldWithUnit from "@/components/common/Inputs/TextFieldWithUnit/TextFieldWithUnit";

const KennyPage = () => {
  const { showToast } = useToast();
  const {
    register,
    formState: { errors, defaultValues },
    handleSubmit,
    control,
    resetField,
    trigger,
  } = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues: {
      username: "kenny",
      address: "주소",
      email: "wnl383@naver.com",
      phone: "010-8413-2266",
      copy: "복사할내용",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div style={{
      width: "40%",
      height: "100%",
      padding: "20px",
    }}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("username", {
            pattern: {
              value: /^[a-zA-Z]+$/g,
              message: "영문 대소문자만 입력해주세요.",
            },
            onChange: () => { void trigger("username"); },
            onBlur: () => { console.log("dsds"); void trigger("username"); },
          })}
          errors={errors}
          label="안녕"
          placeholder="입력하세요"
          value={defaultValues?.username as string}
          onSave={() => { showToast("저장되었습니다."); }}
          resetField={resetField}
        />
        <TextField
          {...register("address", {
            validate: {
              seyoung: (v) => { return v === "seyoung" || "should be seyoung"; },
            },
          })}
          errors={errors}
          label="주소"
          value={defaultValues?.username as string}
        />
        <TextField
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
              message: "*올바른 이메일을 입력해주세요.",
            },
          })}
          errors={errors}
          label="이메일"
          value={defaultValues?.email as string}
        />
        <TextField
          {...register("email2", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
              message: "*올바른 이메일을 입력해주세요.",
            },
          })}
          errors={errors}
          label="이메일"
          // value={defaultValues?.email2 as string}
          placeholder="이메일을 입력하세요"
          bottomText="*해당 이메일로 정산 알림 메일이 송부됩니다."
        />
        <TextField
          {...register("phone", {
            pattern: {
              value: /^(010|011|016|017|018|019)-\d{4}-\d{4}$/g,
              message: "*올바른 전화번호를 입력해주세요.",
            },
            onBlur: () => { console.log("dsds"); void trigger("phone"); },
            onChange: () => { void trigger("phone"); },
          })}
          errors={errors}
          label="핸드폰번호"
          value={defaultValues?.phone as string}
          // bottomText="*해당 이메일로 정산 알림 메일이 송부됩니다."
          onSave={async ()=>{  
            return new Promise((resolve) => {
              setTimeout(() => {
                showToast("저장되었습니다.");
                resolve();
              }, 1000); 
          });}}
          resetField={resetField}
        />
        <PasswordField
          {...register("password", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
              message: "*올바른 이메일을 입력해주세요.",
            },
          })}
          errors={errors}
          label="비밀번호"
          type="password"
        />
        <TextFieldWithCopy
          {...register("some-text", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
              message: "*올바른 이메일을 입력해주세요.",
            },
          })}
          errors={errors}
          label="비밀번호"
          type="password"
        />
        <TextFieldWithMaxBytes
          {...register("max-bytes", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
              message: "*올바른 값을 입력해주세요.",
            },
          })}
          errors={errors}
          label="닉네임"
          maxBytes={20}
        />
        <br />
        *****************************
        <br />
        <TextFieldWithCopy
          {...register("copy")} 
          errors={errors} 
          label="카피"
          />
        <TextFieldWithUnit
          {...register("money")} 
          errors={errors} 
          label="금액"
          unit="원"
          />
        <input type="submit" />
        <TextField label="test" name="test" onSave={()=>{console.log("hey")}} errors={{}} />
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default KennyPage;
