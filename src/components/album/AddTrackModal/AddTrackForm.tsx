import { ChangeEvent, useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import ChipButton from "@/components/common/CommonBtns/ChipButton/ChipButton";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import Checkbox from "@/components/common/Inputs/Checkbox/Checkbox";
import TextField from "@/components/common/Inputs/TextField/TextField";
import TextFieldWithUnit from "@/components/common/Inputs/TextFieldWithUnit/TextFieldWithUnit";
import Spacing from "@/components/common/Layouts/Spacing";
import useArtistList from "@/services/queries/artists/useArtistList";
import useAddAlbumTrack from "@/services/queries/tracks/useAddAlbumTrack";
import { ITrackFieldValues } from "@/types/album.types";
import { ITrackInfo } from "@/types/dto";

import styles from "./AddTrackForm.module.scss";

const cx = classNames.bind(styles);

interface AddTrackFormProps {
  albumId: number;
  onClose: () => void;
  trackInfo?: ITrackInfo;
}

const AddTrackForm = ({ albumId, onClose, trackInfo }: AddTrackFormProps) => {
  const artistList = useArtistList();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    trigger,
    setValue,
    clearErrors,
    reset,
    getValues,
  } = useForm<ITrackFieldValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      name: trackInfo?.name ?? "",
      enName: trackInfo?.enName ?? "",
      artists: trackInfo?.artists ?? [{ name: "", memberId: -1, commissionRate: null }],
      isOriginalTrack: trackInfo?.originalTrack ?? false,
    },
  });
  const {
    fields, append, remove, replace,
  } = useFieldArray<ITrackFieldValues>({
    control,
    name: "artists",
  });
  const { mutateAsync: addTrack, isLoading, isError } = useAddAlbumTrack(albumId);
  const onSubmit: SubmitHandler<ITrackFieldValues> = async (data) => {
    await addTrack(data);
    if (!isError) {
      reset();
      onClose();
    }
  };

  // 트랙 수정 모드인 경우 인풋 값들을 세팅하기 위한 Effect
  useEffect(() => {
    reset({
      name: trackInfo?.name ?? "",
      enName: trackInfo?.enName ?? "",
      artists: trackInfo?.artists ?? [{ name: "", memberId: -1, commissionRate: null }],
      isOriginalTrack: trackInfo?.originalTrack ?? false,
    });
  }, [trackInfo, reset, getValues]);

  // 트랙 수정 모드인 경우 기존 아티스트로 다이나믹 인풋값들을 최초 세팅하기 위한 Effect
  useEffect(() => {
    if (trackInfo) {
      replace(trackInfo.artists.map((artist) => {
        return {
          memberId: artist.memberId,
          name: artist.name,
          enName: artist.enName,
          commissionRate: watch("isOriginalTrack") === true ? null : artist.commissionRate,
        };
      }));
    }
  }, [append, trackInfo, watch, replace]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={cx("container")} onSubmit={handleSubmit(onSubmit)}>
      <div className={cx("checkBoxContainer")}>
        <Checkbox
          label="블루키 오리지널 트랙"
          {...register("isOriginalTrack", {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange: async (e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                setValue("isOriginalTrack", true);
                fields.forEach((_, index) => {
                  setValue(`artists.${index}.commissionRate`, null);
                });
                await trigger(fields.map((_, idx) => { return `artists.${idx}.commissionRate` as const; }));
              }
            },
          })}
          defaultValue={trackInfo?.originalTrack.toString()}
        />
      </div>
      <div className={cx("trackNameSection")}>
        <h2>수록곡 추가</h2>
        <div className={cx("inputArea")}>
          <TextField
            label="트랙명 (한글)"
            {...register("name", {
              required: "*트랙명을 입력하세요.",
            })}
            placeholder="트랙명을 입력해주세요"
            errors={errors}
          />
          <TextField
            label="트랙명 (영문)"
            {...register("enName", {
              required: "*트랙명 (영문)을 입력하세요",
            })}
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
              append({
                memberId: -1, enName: "", name: "", commissionRate: watch("isOriginalTrack") === true ? null : 0,
              });
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
                    {watch(`artists.${index}.memberId`) === null
                      ? (
                        <TextField
                          label="아티스트"
                          {...register(`artists.${index}.name`, {
                            required: "*아티스트명을 입력하세요.",
                          })}
                          placeholder="아티스트명을 입력하세요."
                          errors={errors}
                          isError={!!errors.artists?.[index]?.name}
                          bottomText={errors.artists?.[index]?.name?.message}
                        />
                      )
                      : (
                        <div className={cx("dropdownContainer")}>
                          <span>아티스트</span>
                          <Dropdown
                            hasSearchBar
                            dropdownListData={artistList}
                            onClick={(value) => {
                              setValue(`artists.${index}.memberId`, value.id);
                              setValue(`artists.${index}.name`, value.name);
                              setValue(`artists.${index}.commissionRate`, value.commissionRate || 0);
                            }}
                            initialValue={
                              trackInfo ? artistList.find((item) => {
                                return item.id === trackInfo.artists[index]?.memberId;
                              }) : undefined
                            }
                          />
                          <input
                            {...register(`artists.${index}.memberId`, {
                              validate: (v) => {
                                return (v && (v !== -1)) || "*아티스트를 선택하세요.";
                              },
                            })}
                            type="hidden"
                          />
                          <input {...register(`artists.${index}.name`)} type="hidden" />
                          <span className={cx("dropdownError")}>
                            {errors.artists?.[index]?.memberId?.message
                              ?? errors.artists?.[index]?.name?.message ?? ""}
                          </span>
                        </div>
                      )}
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
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onBlur: async () => {
                          await trigger(fields.map((_, idx) => { return `artists.${idx}.commissionRate` as const; }));
                        },
                        min: {
                          value: 0,
                          message: "*요율은 0 미만일 수 없습니다.",
                        },
                        max: {
                          value: 100,
                          message: "*요울은 100 초과일 수 없습니다.",
                        },
                        validate: {
                          totalLowerThan100: (v) => {
                            if (v === null) return true;
                            const result = fields.reduce((acc, _, idx) => {
                              const watchTarget = watch(`artists.${idx}.commissionRate`) || 0;
                              return acc + watchTarget;
                            }, 0) <= 100;
                            return result || "*아티스트별 요율의 총합은 100을 넘길 수 없습니다.";
                          },
                          shouldBeNumber: (v) => {
                            if (watch(`artists.${index}.memberId`) && !watch("isOriginalTrack")) {
                              return v !== null || "*요율을 입력하세요.";
                            } return true;
                          },
                        },
                      })}
                      placeholder={
                        // eslint-disable-next-line no-nested-ternary
                        watch("isOriginalTrack") === true
                          ? "블루키 오리지널 트랙은 요율을 설정할 수 없습니다."
                          : watch(`artists.${index}.memberId`) === null
                            ? "계약 외 아티스트는 요율을 지정할 수 없습니다"
                            : "요율을 입력하세요."
                      }
                      disabled={watch("isOriginalTrack") || watch(`artists.${index}.memberId`) === null}
                      errors={errors}
                      isError={!!errors.artists?.[index]?.commissionRate}
                      bottomText={errors.artists?.[index]?.commissionRate?.message}
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
                  <div className={cx("checkUnregisteredArtistContainer")}>
                    <Checkbox
                      label="계약 외 아티스트"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.checked) {
                          setValue(`artists.${index}.memberId`, null);
                          setValue(`artists.${index}.commissionRate`, null);
                          clearErrors(`artists.${index}.commissionRate`);
                        } else setValue(`artists.${index}.memberId`, -1);
                      }}
                    />
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
