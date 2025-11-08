import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const NavigationButtons = ({
  step,
  validateStep,
  setStep,
  setCheckingStep5,
}) => {
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const nextStep = () => {
    const { isValid, newErrors = {} } = validateStep(step);

    console.log(newErrors);

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, 7));
    } else {
      const firstKey = Object.keys(newErrors)[0];
      if (step === 5 && !isValid) {
        setCheckingStep5(true);
      }
      if (firstKey) {
        const targetInput = document.querySelector(`[name="${firstKey}"]`);
        if (targetInput) {
          // Smooth scroll to input
          targetInput.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          // Focus after short delay for smoother UX
          setTimeout(() => {
            targetInput.focus();

            // Add blinking highlight class
            targetInput.classList.add("blink-highlight");

            // Remove it after animation ends
            setTimeout(() => {
              targetInput.classList.remove("blink-highlight");
            }, 3000);
          }, 400);
        }
      }
    }
  };

  return (
    <div className="flex justify-between mt-10">
      {step > 1 ? (
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          <LuChevronLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      ) : (
        <div />
      )}

      {step < 7 && (
        <button
          type="button"
          onClick={nextStep}
          className="flex items-center px-6 py-2 bg-primary rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
        >
          Next
          <LuChevronRight className="w-5 h-5 ml-2" />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
