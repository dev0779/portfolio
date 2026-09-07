import { useNavigate, useParams } from "react-router-dom";

import { productSteps } from "../productSteps";

export const ProductWizard = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const currentIndex = productSteps.findIndex(
    (step) => step.slug === slug,
  );

  const handleNext = () => {
    const nextStep = productSteps[currentIndex + 1];

    if (!nextStep) {
      return;
    }

    navigate(`/demoprojects/product/${nextStep.slug}`);
  };

  const handlePrevious = () => {
    const previousStep =
      productSteps[currentIndex - 1];

    if (!previousStep) {
      return;
    }

    navigate(
      `/demoprojects/product/${previousStep.slug}`,
    );
  };

  return (
    <div>
      <div>
        {productSteps.map((step) => (
          <button
            key={step.slug}
            onClick={() =>
              navigate(
                `/demoprojects/product/${step.slug}`,
              )
            }
          >
            {step.label}
          </button>
        ))}
      </div>

      <div>
        <button
          onClick={handlePrevious}
          disabled={currentIndex <= 0}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={
            currentIndex === productSteps.length - 1
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};