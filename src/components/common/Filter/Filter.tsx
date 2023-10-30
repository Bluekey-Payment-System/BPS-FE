import { useState } from "react";

import classNames from "classnames/bind";
import Image from "next/image";

import FilterForm from "@/components/common/Filter/FilterForm/FilterForm";
import { MODAL_TYPE } from "@/types/enums/modal.enum";

import Modal from "../Modals/Modal";

import styles from "./Filter.module.scss";
import { IFilterOptions } from "./Filter.type";

const cx = classNames.bind(styles);

const Filter = ({ onSubmit }: { onSubmit: (options: IFilterOptions) => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className={cx("container")} onClick={() => { setOpen(true); }}>
        <Image src="/images/filter.svg" width={11} height={11} alt="필터" />
        <span className={cx("text")}>필터</span>
      </button>
      <Modal type={MODAL_TYPE.FORM} open={open} onClose={() => { setOpen(false); }}>
        <div style={{ position: "relative" }}>
          <FilterForm onSubmit={onSubmit} onSubmitSuccess={() => { setOpen(false); }} />
          <button
            className={cx("closeBtn")}
            onClick={() => { setOpen(false); }}
          >
            <Image src="/images/close.svg" fill alt="모달창 닫기" />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Filter;
