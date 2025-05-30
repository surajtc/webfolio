"use client";
import { useState } from "react";
import { Stepper, StepperStep } from "./stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Banknote,
  CheckCircle,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleDollarSign,
  CreditCard,
} from "lucide-react";
import { AnimatePresence, motion, usePresenceData } from "motion/react";

function CheckoutStep() {
  return (
    <div className="space-y-4 py-4">
      <h3 className="text-lg font-semibold tracking-tight">Checkout</h3>
      <div className="space-y-4 text-sm bg-input/50 px-2 py-4 rounded-md">
        <div className="flex justify-between">
          <span>Wireless Mouse</span>
          <span>$25.00</span>
        </div>
        <div className="flex justify-between">
          <span>USB-C Cable</span>
          <span>$15.00</span>
        </div>
        <div className="h-px bg-border my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>$40.00</span>
        </div>
      </div>
    </div>
  );
}

function ShippingStep() {
  return (
    <form className="space-y-4 py-4 [&_label]:text-xs [&_label]:pb-1 [&_label]:text-muted-foreground">
      <h3 className="text-lg font-semibold tracking-tight">Shipping Address</h3>

      <div>
        <Label htmlFor="full-name">Full Name</Label>
        <Input id="full-name" defaultValue="John Doe" />
      </div>

      <div>
        <Label htmlFor="street-address">Street Address</Label>
        <Input id="street-address" defaultValue="123 Main Street" />
      </div>

      <div>
        <Label htmlFor="city">City</Label>
        <Input id="city" defaultValue="Springfield" />
      </div>

      <div>
        <Label htmlFor="zip">ZIP / Postal Code</Label>
        <Input id="zip" defaultValue="12345" />
      </div>
    </form>
  );
}

function PaymentStep() {
  return (
    <div className="space-y-4 py-4">
      <h3 className="text-lg font-semibold tracking-tight">Payment Method</h3>
      <RadioGroup defaultValue="credit" className="grid grid-cols-2 gap-3">
        <div>
          <RadioGroupItem value="credit" id="credit" className="peer sr-only" />
          <Label
            htmlFor="credit"
            className="flex items-center gap-2 px-4 py-6 rounded-md transition-colors cursor-pointer
              bg-input/50 border border-transparent peer-data-[state=checked]:bg-input peer-data-[state=checked]:border-border"
          >
            <CreditCard className="w-5 h-5" />
            Credit Card
          </Label>
        </div>

        <div>
          <RadioGroupItem value="debit" id="debit" className="peer sr-only" />
          <Label
            htmlFor="debit"
            className="flex items-center gap-2 px-4 py-6 rounded-md transition-colors cursor-pointer
              bg-input/50 border border-transparent peer-data-[state=checked]:bg-input peer-data-[state=checked]:border-border"
          >
            <CircleDollarSign className="w-5 h-5" />
            Debit Card
          </Label>
        </div>

        <div>
          <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
          <Label
            htmlFor="paypal"
            className="flex items-center gap-2 px-4 py-6 rounded-md transition-colors cursor-pointer
              bg-input/50 border border-transparent peer-data-[state=checked]:bg-input peer-data-[state=checked]:border-border"
          >
            <Banknote className="w-5 h-5" />
            PayPal
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

function StepSlide({ children }: { children: React.ReactNode }) {
  const direction = usePresenceData();

  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -24 }}
      transition={{
        type: "spring",
        visualDuration: 0.15,
        bounce: 0.08,
      }}
      className="overflow-x-hidden px-3 min-h-[340px]"
    >
      {children}
    </motion.div>
  );
}

function ConfirmationStep() {
  return (
    <div className="text-center pt-[120px]">
      <CheckCircle className="size-8 mx-auto text-chart-2" />
      <h2 className="text-lg font-semibold tracking-tight">Order Confirmed!</h2>
      <p className="text-xs text-muted-foreground">
        We've emailed your receipt and shipping details.
      </p>
    </div>
  );
}

export function OrderStepper() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const steps = [
    { title: "Checkout", component: <CheckoutStep /> },
    { title: "Shipping", component: <ShippingStep /> },
    { title: "Payment", component: <PaymentStep /> },
    { title: "Confirmation", component: <ConfirmationStep /> },
  ];

  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const prev = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  return (
    <div className="bg-card rounded-xl border p-6 space-y-6 min-w-[320px] w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold tracking-tight">Place your order</h3>
      <Stepper activeStep={step} onStepChange={setStep}>
        {steps.map((s, i) => (
          <StepperStep key={s.title} index={i} />
        ))}
      </Stepper>

      <div className="">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <StepSlide key={step}>{steps[step].component}</StepSlide>
        </AnimatePresence>
      </div>

      <div className="flex justify-between">
        {step > 0 ? (
          <Button onClick={prev} size="sm" variant="ghost">
            <ChevronLeftIcon />
            Previous
          </Button>
        ) : (
          <div />
        )}
        <Button onClick={next} size="sm">
          {step === steps.length - 1 ? (
            "Finish"
          ) : (
            <>
              Next
              <ChevronRightIcon />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
