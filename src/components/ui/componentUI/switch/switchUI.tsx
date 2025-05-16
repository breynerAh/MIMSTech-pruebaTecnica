import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TSwitchProps } from "./types";

export function SwitchUI({ text }: TSwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">{text}</Label>
    </div>
  );
}
