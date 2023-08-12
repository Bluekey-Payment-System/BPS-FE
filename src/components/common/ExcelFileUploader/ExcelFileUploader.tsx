import React, { useState } from "react";

import styles from "./ExcelFileUploader.module.scss"; // 스타일 파일

const ExcelFileUploader = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleUploadFile = (droppedFiles: File[]) => {
    // 여기서 드롭된 파일을 처리하면 됩니다.
    console.log("Dropped files:", droppedFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleUploadFile(droppedFiles);
  };

  return (
    <div
      style={{
        width: 500, height: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "aliceblue",
      }}
      className={`${styles.fileDrop} ${isDragging ? styles.dragging : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        className={isDragging ? "DragDrop-File-Dragging" : "DragDrop-File"}
        htmlFor="fileUpload"
        style={{ cursor: "pointer" }}
      >
        File Drag and Drop
        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          onChange={(e) => { return console.log(e); }}
        />
      </label>
      <p>
        {isDragging ? "Drop here" : "Drag and drop files here"}
      </p>
    </div>
  );
};

export default ExcelFileUploader;
