type History = {
  term: string;
  timestamp: string;
};

export type TModalProps = {
  title: string;
  onClick: () => void;
  history: History[];
};
