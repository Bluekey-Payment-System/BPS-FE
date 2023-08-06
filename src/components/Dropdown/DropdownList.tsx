import React from "react";

import styles from "./Dropdown.module.scss";

interface DropdownListProps {
  dropdownData: string[],
  handleInputValue: () => void
}

const DropdownList = ({ dropdownData, handleInputValue }: DropdownListProps) => {
  return (
    <div>
      {dropdownData.map((dropdownItem) => {
        return (
          <div className={styles.select} key={dropdownItem}>
            <input
              id={dropdownItem}
              type="radio"
              value={dropdownItem}
              className={styles.content}
              onChange={handleInputValue}
            />
            <label htmlFor={dropdownItem}>
              {dropdownItem}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default DropdownList;
