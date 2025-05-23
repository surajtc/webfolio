import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontalIcon } from "lucide-react";

export function ChatOptions() {
  return (
    <div className="space-y-6">
      <div className="px-4 py-2 flex items-center text-sm font-medium text-muted-foreground">
        <SlidersHorizontalIcon className="h-4 w-4 mr-2" />
        My preferences
      </div>

      <div className="space-y-4 px-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase">
          Chat presets
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: "Model", options: ["Chat 4.0", "Chat 3.5"] },
            { label: "Response format", options: ["text", "html"] },
            { label: "Writing style", options: ["Concise", "Detailed"] },
            { label: "Mode", options: ["Chatbot", "Assistant"] },
          ].map(({ label, options }) => (
            <div key={label} className="grid grid-cols-2 gap-4 min-w-[240px]">
              <span className="text-sm font-medium text-muted-foreground mb-1">
                {label}
              </span>
              <Select defaultValue={options[0]}>
                <SelectTrigger size="sm">
                  <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      {/* Configurations */}
      <div className="space-y-4 px-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase">
          Configurations
        </h3>
        {[
          {
            label: "Temperature",
            defaultValue: [1],
            min: 0,
            max: 1,
            step: 0.01,
          },
          {
            label: "Maximum length",
            defaultValue: [2048],
            min: 1,
            max: 4096,
            step: 1,
          },
          {
            label: "Top P",
            defaultValue: [1],
            min: 0,
            max: 1,
            step: 0.01,
          },
        ].map(({ label, defaultValue, min, max, step }) => (
          <div key={label} className="flex flex-col">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-muted-foreground">
                {label}
              </span>
              <span className="text-sm text-muted-foreground">
                {defaultValue[0]}
              </span>
            </div>
            <Slider
              defaultValue={defaultValue}
              min={min}
              max={max}
              step={step}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
