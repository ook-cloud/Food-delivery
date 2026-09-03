export function StepDots({ currentStep, totalSteps }) {
  return (
    <div className="flex justify-center items-center space-x-2 my-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index + 1 === currentStep ? "w-8 bg-black" : "w-2 bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
