import { Input } from "../../input";

interface InputUIProps {
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}
export function InputUI({ onBlur }: InputUIProps) {
  return (
    <div className="relative w-full">
      <span
        className="material-symbols-outlined text-[#a702a456] absolute right-3 top-1/2 transform -translate-y-1/2"
        style={{ fontSize: "20px" }}
      >
        search
      </span>
      <Input
        type="text"
        onBlur={onBlur}
        className="bg-[#f0f0f0] shadow-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
      />
    </div>
  );
}
