import React, { useEffect, useState } from "react";
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
import Modal from "@/components/common/Modals/Modal";
import AlertModal from "@/components/common/Modals/AlertModal/AlertModal";
import { MODAL_TYPE } from "@/types/enums/modal.enum";
import useAlertModal, { IUseAlertModalParam } from "@/hooks/useAlertModal";
import Button from "@/components/common/CommonBtns/Button/Button";
import Spacing from "@/components/common/Layouts/Spacing";
import ImageUploader from "@/components/common/ImageUploader/ImageUploader";
import ChangePasswordForm from "@/components/auth/ChangePasswordForm/ChangePasswordForm";

const KennyPage = () => {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isChangePassModalOpen, setIsChangePasswordOpen] = useState(false);
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
      address: "seyoung",
      email: "wnl383@naver.com",
      phone: "010-8413-2266",
      copy: "복사할내용",
    },
  });
  const alertModalProps: IUseAlertModalParam = {
    type:MODAL_TYPE.CONFIRM,
    title:"로그인 실패", 
    message: "로그인에 실패했습니다. 아이디/비밀번호를 다시 한번 확인해주세요.",
    onClickProceed: ()=>{showToast("재로그인 시도")},
    proceedBtnText: "재시도하기",
    closeBtnText: "닫기",
  }
  const { showAlertModal} = useAlertModal(alertModalProps);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  useEffect(()=>{
    console.log("isOpen", isOpen);
  }, [isOpen])
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
      <Button size="large" theme="dark" onClick={()=>{setIsOpen(true)}}>그냥 모달 오픈</Button>
      <br />
      <br />
    
      <Button size="large" theme="dark" onClick={()=>{setIsError(true)}}>에러 모달 오픈</Button>
      <Modal type="ERROR" open={isOpen} onClose={()=>{setIsOpen(false)}}>
        <div>나는 모달이다</div>
        <button onClick={()=>{setIsOpen(false)}}>닫기</button>
      </Modal>
      <AlertModal 
        type={MODAL_TYPE.CONFIRM} 
        open={isError} 
        title="로그인 실패" 
        onClose={()=>{setIsError(false)}} 
        message="로그인에 실패했습니다. 아이디/비밀번호를 다시 한번 확인해주세요."
        onClickProceed={()=>{setIsError(false);showToast("재로그인을 시도합니다")}}
        proceedBtnText="다시 시도하기"
        closeBtnText="닫기"
      />
      <br />
      <br />
      <Button size="large" theme="bright" onClick={()=>{showAlertModal()}}>useAlert모달로 열기</Button>
      <Spacing size={100} />
      <ImageUploader shape="circle" {...register("profileImg")} type="file"/>
      <br />
      <br />
      <br />
      <br />
      <Button size="large" theme="dark" onClick={()=>{setIsChangePasswordOpen(true)}}>비밀번호 변경</Button>
      <Modal type={MODAL_TYPE.FORM} open={isChangePassModalOpen} onClose={()=>{setIsChangePasswordOpen(false)}}>
        <ChangePasswordForm onComplete={()=>{setIsChangePasswordOpen(false); showToast("비밀번호가 변경되었습니다.")}}/>
      </Modal>
    </div>
  );
};

export default KennyPage;
