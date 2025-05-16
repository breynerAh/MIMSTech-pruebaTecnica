import { Dispatch, SetStateAction } from "react";

export type TSelectProps = {
  data: {
    value: string;
    label: string;
  }[];
  setSelectedFont: Dispatch<SetStateAction<string>>;
  selectedFont: string;
};
