import { SetStateAction } from "react";

export interface ISideNavList {
  id: number,
  content: string,
  path: string
}

export interface SideNavProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<SetStateAction<boolean>>,
}
