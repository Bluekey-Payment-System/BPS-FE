import {
  ChangeEventHandler,
  ForwardedRef, InputHTMLAttributes, forwardRef, useEffect, useId, useState,
} from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import useForwardRef from "@/hooks/useForwardRef";
import { useAppSelector } from "@/redux/hooks";

import DefaultProfileImage from "../DefaultProfileImage/DefaultProfileImage";
import Orbit from "../Loading/Orbit";

import styles from "./ImageUploader.module.scss";

const cx = classNames.bind(styles);

interface ImageUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  shape: "circle" | "square";
  onUpload: (file: File) => Promise<void>;
  defaultUrl?: string | null;
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
const ImageUploader = forwardRef(({
  shape = "square", onUpload, defaultUrl, ...props
}: ImageUploaderProps, ref: ForwardedRef<HTMLInputElement>) => {
  const fileRef = useForwardRef(ref);
  const [previewUrl, setPreviewUrl] = useState<string>(defaultUrl ?? "");
  const [previousPreviewUrl, setPreviousPreviewUrl] = useState<string>(previewUrl);
  const [isUploading, setIsUploading] = useState(false);
  const uploaderId = useId();
  const loginId = useAppSelector((state) => { return state.user.member.loginId; });

  const handleChangeFile:ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsUploading(true);
      onUpload(file)
        .then(() => {
          setPreviousPreviewUrl(url);
        })
        .catch((err) => {
          setPreviewUrl(previousPreviewUrl);
          console.error(err);
        })
        .finally(() => {
          setIsUploading(false);
        });
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
        {!previewUrl && (
        <div className={cx("avatarContainer")}>
          {
            shape === "circle" ? <DefaultProfileImage userId={loginId} size={147} /> : <Image src="/images/default-album-cover-small.png" fill alt="기본 앨범 커버 이미지" />
          }
        </div>
        )}
        {isUploading && <div className={cx("loadingContainer")}><Orbit /></div>}
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
