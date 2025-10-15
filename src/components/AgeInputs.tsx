import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface AgeInputsProps {
  currentAge: number;
  retirementAge: number;
  onCurrentAgeChange: (age: number) => void;
  onRetirementAgeChange: (age: number) => void;
}

export const AgeInputs = ({
  currentAge,
  retirementAge,
  onCurrentAgeChange,
  onRetirementAgeChange,
}: AgeInputsProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        Timeline
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="currentAge" className="text-sm font-medium">
            Current Age
          </Label>
          <Input
            id="currentAge"
            type="number"
            value={currentAge}
            onChange={(e) => onCurrentAgeChange(parseInt(e.target.value) || 0)}
            placeholder="30"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="retirementAge" className="text-sm font-medium">
            Target Retirement Age
          </Label>
          <Input
            id="retirementAge"
            type="number"
            value={retirementAge}
            onChange={(e) => onRetirementAgeChange(parseInt(e.target.value) || 0)}
            placeholder="65"
          />
        </div>
      </div>
    </Card>
  );
};
