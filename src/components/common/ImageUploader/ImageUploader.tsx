import {
  ChangeEventHandler,
  ForwardedRef, InputHTMLAttributes, forwardRef, useEffect, useId, useState,
} from "react";

import Avatar from "boring-avatars";
import classNames from "classnames/bind";
import Image from "next/image";

import getRandomProfileIndex from "@/components/layout/GNB/GNB.utils";
import { COMBINATION_COLORS, RANDOM_PROFILES } from "@/constants/randomProfileList";
import useForwardRef from "@/hooks/useForwardRef";
import { useAppSelector } from "@/redux/hooks";

import styles from "./ImageUploader.module.scss";

const cx = classNames.bind(styles);

interface ImageUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  shape: "circle" | "square";
  defaultUrl?: string | null;
}
/**
 * 이미지 업로더 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param {string} shape 업로더의 모양 - `circle` 또는 `square`
 * @param {string} defaultUrl 이미지 업로더에 디폴트 이미지가 있다면 해당 url
 * @param {InputHTMLAttributes} ...props input 엘리먼트의 attributes
 * @example
 * ```
 * <ImageUploader shape="circle" name="profileImage" onChange={handleChange}/>
 * <ImageUploader shape="square" name="albumCoverImage" onChange={handleChange}/>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImageUploader = forwardRef(({ shape = "square", defaultUrl, ...props }: ImageUploaderProps, ref: ForwardedRef<HTMLInputElement>) => {
  const fileRef = useForwardRef(ref);
  const [previewUrl, setPreviewUrl] = useState<string>(defaultUrl ?? "");
  const uploaderId = useId();
  const loginId = useAppSelector((state) => { return state.user.member!.loginId; });

  const handleChangeFile:ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
    props.onChange?.(e);
  };

  useEffect(() => {
    const uploaderElem = document.getElementById(`${uploaderId}`) as HTMLButtonElement;
    if (previewUrl) {
      uploaderElem.style.backgroundImage = `url(${previewUrl})`;
      uploaderElem.style.backgroundSize = "cover";
      uploaderElem.style.backgroundPosition = "center";
    }
  }, [previewUrl, uploaderId]);

  return (
    <>
      <button
        className={cx("container", `${shape}`)}
        onClick={() => { fileRef?.current?.click(); }}
        id={uploaderId}
      >
        {!previewUrl && <Avatar size={147} name={RANDOM_PROFILES[getRandomProfileIndex(loginId)]} variant="marble" colors={COMBINATION_COLORS} />}
        <div className={cx("deck")}>
          <div className={cx("uploadIcon")}>
            <Image src="/images/upload-small.svg" fill alt="업로드 아이콘" />
          </div>
        </div>
      </button>
      <input
        className={cx("hidden")}
        ref={fileRef}
        {...props}
        type="file"
        accept="image/*"
        onChange={handleChangeFile}
      />
    </>
  );
});

export default ImageUploader;
