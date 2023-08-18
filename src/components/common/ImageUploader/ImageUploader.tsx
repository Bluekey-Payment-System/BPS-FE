import {
  ChangeEventHandler,
  ForwardedRef, InputHTMLAttributes, forwardRef, useEffect, useId, useState,
} from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import useForwardRef from "@/hooks/useForwardRef";

import styles from "./ImageUploader.module.scss";

const cx = classNames.bind(styles);

interface ImageUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  shape: "circle" | "square";
}
/**
 * 이미지 업로더 컴포넌트
 * @author [SeyoungCho](https://github.com/seyoungcho)
 * @param {string} shape 업로더의 모양 - `circle` 또는 `square`
 * @param {InputHTMLAttributes} ...props input 엘리먼트의 attributes
 * @example
 * ```
 * <ImageUploader shape="circle" name="profileImage" onChange={handleChange}/>
 * <ImageUploader shape="square" name="albumCoverImage" onChange={handleChange}/>
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImageUploader = forwardRef(({ shape = "square", ...props }: ImageUploaderProps, ref: ForwardedRef<HTMLInputElement>) => {
  const fileRef = useForwardRef(ref);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const uploaderId = useId();

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
