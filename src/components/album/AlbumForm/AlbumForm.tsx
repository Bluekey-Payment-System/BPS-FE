import {
  SubmitHandler, useFormContext,
} from "react-hook-form";

import classNames from "classnames/bind";

import Button from "@/components/common/CommonBtns/Button/Button";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import TextField from "@/components/common/Inputs/TextField/TextField";
import Spacing from "@/components/common/Layouts/Spacing";
import { IAlbumFieldValues } from "@/types/album.types";
import formatDropdownList from "@/utils/formatDropdownList";

import styles from "./AlbumForm.module.scss";

const cx = classNames.bind(styles);

interface AlbumFormProps {
  submitBtnText: string;
  onSubmit: SubmitHandler<IAlbumFieldValues>;
}

const artist = [
  // TODO: db에 있는 모든 아티스트 names와 pk를 가져와서(api) 여기에 뿌리기
  { artistId: 1, artistName: "혁기" },
  { artistId: 2, artistName: "지미가드너" },
  { artistId: 3, artistName: "53x" },
  { artistId: 4, artistName: "송민섭" },
  { artistId: 5, artistName: "김여름" },
  { artistId: 6, artistName: "이은성" },
];
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
  const {
    register, formState: { errors }, handleSubmit, setValue,
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
          <Dropdown
            hasSearchBar
            dropdownListData={formatDropdownList(artist)}
            onClick={(value) => { setValue("memberId", (value.id)); }}
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
