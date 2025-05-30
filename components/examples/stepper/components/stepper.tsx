import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type Orientation = "horizontal" | "vertical";
type StepState = "pending" | "active" | "completed" | "error";

interface StepperContextValue {
  activeStep: number;
  setStep: (step: number) => void;
  totalSteps: number;
  orientation: Orientation;
}

const StepperContext = React.createContext<StepperContextValue | undefined>(
  undefined,
);

function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) throw new Error("StepperStep must be used within Stepper");
  return context;
}

interface StepperProps {
  activeStep?: number;
  onStepChange?: (step: number) => void;
  orientation?: Orientation;
  children: React.ReactNode;
  className?: string;
}

export function Stepper({
  activeStep: controlledStep,
  onStepChange,
  orientation = "horizontal",
  children,
  className,
}: StepperProps) {
  const isControlled = controlledStep !== undefined;
  const [internalStep, setInternalStep] = React.useState(controlledStep ?? 0);
  const activeStep = isControlled ? controlledStep : internalStep;

  const childArray = React.Children.toArray(children);
  const totalSteps = childArray.length;

  const setStep = (step: number) => {
    if (!isControlled) setInternalStep(step);
    onStepChange?.(step);
  };

  return (
    <StepperContext.Provider
      value={{ activeStep, setStep, totalSteps, orientation }}
    >
      <nav aria-label="Progress" className="relative">
        {orientation === "horizontal" && (
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border z-0" />
        )}

        <ol
          className={cn(
            "relative z-10 flex justify-between",
            orientation === "vertical" ? "flex-col" : "flex-row",
            className,
          )}
        >
          {childArray}
        </ol>
      </nav>
    </StepperContext.Provider>
  );
}

interface StepperStepProps {
  index: number;
  state?: StepState;
  className?: string;
}

export function StepperStep({ index, state, className }: StepperStepProps) {
  const { activeStep, setStep, orientation } = useStepper();

  const derivedState =
    state ??
    (index < activeStep
      ? "completed"
      : index === activeStep
        ? "active"
        : "pending");

  return (
    <li
      data-state={derivedState}
      className={cn(
        "relative group transition-all duration-300",
        orientation === "horizontal" && "flex flex-col items-center",
        orientation === "vertical" && "flex flex-row items-start gap-4",
        className,
      )}
    >
      <div className="flex flex-col items-center space-y-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setStep(index)}
          data-state={derivedState}
          className={cn(
            "relative z-10 rounded-full border flex items-center justify-center transition-all duration-300 text-xs !size-7",
            "group-data-[state=pending]:bg-card group-data-[state=pending]:text-muted-foreground group-data-[state=pending]:border-border",
            "group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground group-data-[state=active]:border-primary",
            "group-data-[state=completed]:bg-primary group-data-[state=completed]:text-primary-foreground group-data-[state=completed]:border-primary",
          )}
        >
          <span
            className={cn(
              "transition-all duration-300",
              "group-data-[state=completed]:hidden",
            )}
          >
            {index + 1}
          </span>
          <Check
            className={cn(
              "size-3.5 absolute transition-all duration-300",
              "group-data-[state=completed]:block",
              "group-data-[state=pending]:hidden group-data-[state=active]:hidden",
            )}
          />
        </Button>
      </div>
    </li>
  );
}
