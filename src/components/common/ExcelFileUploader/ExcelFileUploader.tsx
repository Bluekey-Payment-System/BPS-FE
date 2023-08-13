import React from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import useToast from "@/hooks/useToast";

import styles from "./ExcelFileUploader.module.scss";

const cx = classNames.bind(styles);

const ExcelFileUploader = () => {
  const { showToast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUploadFile = (droppedFile: File) => {
    const fileExtension = droppedFile.name.split(".").pop();

    if (!(fileExtension === "xlsx" || fileExtension === "xls")) {
      showToast(`[Error] 감지된 파일 확장자 (${fileExtension})`);
    } else {
      // 파일 업로드 처리
      showToast(`Dropped file: ${droppedFile.name}`);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    handleUploadFile(droppedFiles[0]);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = e.target.files;
      handleUploadFile(selectedFiles[0]);
    }
  };

  return (
    <div
      className={cx("uploadContainer")}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label
        className={cx("clickableArea")}
        htmlFor="fileUpload"
      >
        <Image src="/images/upload.svg" width={33} height={33} alt="액셀 파일 업로드" />
        <h3 className={cx("dragDrop")}>Drag & Drop</h3>
        <p className={cx("message")}>
          이곳에 파일을 끌어다 놓으면 파일이 업로드됩니다.
          <br />
          파일 유형: xslx, xls
        </p>
        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          onChange={handleChangeInput}
          accept=".xlsx, .xls"
        />
      </label>
    </div>
  );
};

export default ExcelFileUploader;
