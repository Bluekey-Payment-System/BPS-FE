import {
  SubmitHandler, useFormContext,
} from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import { IHasSearchBarData } from "@/components/common/Dropdown/Dropdown.type";
import TextField from "@/components/common/Inputs/TextField/TextField";
import Spacing from "@/components/common/Layouts/Spacing";
import { IPostAlbumData } from "@/services/api/types/albums";
import useArtistList from "@/services/queries/artists/useArtistList";

import styles from "./AlbumForm.module.scss";

const cx = classNames.bind(styles);

interface IAlbumFieldValues extends IPostAlbumData {}
interface AlbumFormProps {
  submitBtnText: string;
  onSubmit: SubmitHandler<IAlbumFieldValues>;
}

/**
 * 앨범 폼(앨범 등록, 수정시 렌더링할 폼) 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param {string} submitBtnText submit버튼에 쓰일 텍스트
 * @param {Function} onSubmit submit핸들러
 * @example
 *
 * ```
 * const onSubmit = (data) => {await postAlbum("/api/albums", data)};
 * ...
 * <AlbumForm onSubmit={onSubmit} submitBtnText="앨범 등록하기" />
 * ```
 */
const AlbumForm = ({ submitBtnText, onSubmit }: AlbumFormProps) => {
  const artistList = useArtistList();
  const {
    register, formState: { errors }, handleSubmit, setValue, watch,
  } = useFormContext<IAlbumFieldValues>();

  return (
    <div className={cx("container")}>
      {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className={cx("form")} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="*앨범명 (한글)"
          {...register("name", {
            required: "*앨범명을 입력하세요.",
            validate: {
              hasContent: (value) => { return !!value?.trim() || "*앨범명을 입력하세요"; },
            },
          })}
          errors={errors}
        />
        <TextField
          label="*앨범명 (영문)"
          {...register("enName", {
            required: "*앨범명 (영문)을 입력하세요.",
            validate: {
              hasContent: (value) => { return !!value?.trim() || "*앨범명 (영문)을 입력하세요"; },
            },
          })}
          errors={errors}
        />
        <div className={cx("dropdownContainer")}>
          <span>대표 아티스트</span>
          <Dropdown<IHasSearchBarData>
            hasSearchBar
            dropdownListData={artistList}
            onClick={(value) => {
              setValue("memberId", (value.id));
            }}
            initialValue={artistList.find((item) => {
              return item.id === watch("memberId");
            })}
          />
          <input {...register("memberId")} type="hidden" />
          <Spacing size={14} />
        </div>
        <Spacing size={0} />
        <Button theme="dark" size="large" type="submit" style={{ marginTop: "26px", width: "218px" }}>{submitBtnText}</Button>
      </form>
    </div>
  );
};

export default AlbumForm;
