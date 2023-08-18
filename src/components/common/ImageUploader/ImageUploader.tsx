import {
  ForwardedRef, InputHTMLAttributes, forwardRef,
} from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import useForwardRef from "@/hooks/useForwardRef";

import styles from "./ImageUploader.module.scss";

const cx = classNames.bind(styles);

interface ImageUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  shape: "circle" | "square";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImageUploader = forwardRef(({ shape = "square", ...props }: ImageUploaderProps, ref: ForwardedRef<HTMLInputElement>) => {
  const fileRef = useForwardRef(ref);
  return (
    <>
      <button
        className={cx("container", `${shape}`)}
        onClick={() => { fileRef?.current?.click(); }}
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
      />
    </>
  );
});

export default ImageUploader;
