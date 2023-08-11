import { useState } from "react";

import Image from "next/image";

const EditButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickEditButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button type="button" onClick={handleClickEditButton}>
        <Image src="/images/kebab.svg" width={16} height={16} alt="더보기" />
      </button>
      {isOpen && <div>클릭!!</div>}
    </>
  );
};

export default EditButton;
