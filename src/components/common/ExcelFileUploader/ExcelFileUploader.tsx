import React from "react";

import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";

import useToast from "@/hooks/useToast";
import { useUploadHistoryPost } from "@/services/queries/upload-revenue/useRevenueUploadHistory";

import Loading from "../Loading/Loading";

import styles from "./ExcelFileUploader.module.scss";

const cx = classNames.bind(styles);

/**
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @returns 엑셀 파일 업로드 박스
 */
const ExcelFileUploader = () => {
  const queryClient = useQueryClient();

  const { showToast } = useToast();
  const { postUploadHistory, isLoading } = useUploadHistoryPost(queryClient);

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
      postUploadHistory({ file: droppedFile, uploadAt: "2023-08" });
      // showToast(`Dropped file: ${droppedFile.name}`);
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

  if (isLoading) {
    return <Loading width={730} height={222} />;
  }

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
          파일 유형: xlsx, xls
        </p>
        <input
          type="file"
          id="fileUpload"
          onChange={handleChangeInput}
          accept=".xlsx, .xls"
          className={cx("uploadInput")}
        />
      </label>
    </div>
  );
};

export default ExcelFileUploader;
