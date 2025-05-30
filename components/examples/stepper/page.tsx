import { OrderStepper } from "./components/order-stepper";

export default function Page() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-lg">
        <OrderStepper />
      </div>
    </div>
  );
}
