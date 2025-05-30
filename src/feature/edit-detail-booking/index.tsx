import { useState } from "react";
import MapSelector from "./map-selector";
import { BasicInfoStep } from "./steps/basic-info";
import ContactStep from "./steps/contact";
import VerificationDataStep from "./steps/verification-data";
import { FormStepProps } from "./types";
import useForm from "./use-form";
import { X } from "lucide-react";
import { AdditionalInfoOneStep } from "./steps/additional-info-one";
import { AdditionalInfoTwoStep } from "./steps/additional-info-two";
import { useParams } from "react-router";

export default function EditDetailBookingForm() {
  const { bookingId } = useParams();
  const {
    clue: { clueIsView, setClueIsView, clueIsInput, setClueIsInput },
    steps,
    form: { formData, updateFormData, handleSubmit },
    step: { currentStep, handleNext, handleBack },
  } = useForm(bookingId);

  const renderStep = () => {
    const props: FormStepProps = {
      formData,
      updateFormData,
      onNext: handleNext,
      onBack: handleBack,
      isLastStep: currentStep === steps.length - 1,
    };

    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            {...props}
            clueIsInput={clueIsInput}
            setClueIsInput={setClueIsInput}
          />
        );
      case 2:
        return <ContactStep {...props} />;
      case 3:
        return <AdditionalInfoOneStep {...props} />;
      case 4:
        return <AdditionalInfoTwoStep {...props} />;
      case 5:
        return <VerificationDataStep {...props} />;

      default:
        return null;
    }
  };

  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  console.log("coordinates", coordinates);

  const setCoordinatesHandle = (e: [number, number] | null) => {
    // console.log("setCoordinatesHandle", e);
    setCoordinates(e);

    updateFormData({
      loadingLocation: {
        name: formData?.loadingLocation?.name,
        coordinates: e,
      },
    });
  };

  const renderClue = (clueIsView: boolean) => {
    if (clueIsView) {
      return (
        <div className="z-[999] absolute top-10 left-12 border bg-white text-primary py-4 px-6 rounded-[30px] max-w-lg flex gap-6 items-center">
          <X
            className="w-6 h-6 shrink-0 hover:cursor-pointer"
            onClick={() => setClueIsView(false)}
          />
          <span className="text-base font-normal">
            Вы можете указать место погрузки прямо на карте, дле этого нажмите в
            нужную вам область
          </span>
        </div>
      );
    }
    return;
  };
  return (
    <div className="relative grid grid-cols-2 gap-24 xl:gap-0 w-screen h-full">
      {renderClue(clueIsView)}
      <div className="">
        <MapSelector
          formData={formData}
          setCoordinates={setCoordinatesHandle}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-10  max-w-lg w-full py-10">
          <h5 className="text-xl font-medium">
            {steps[currentStep - 1].title}
          </h5>
          {renderStep()}

          {currentStep <= steps.length && (
            <div className="flex justify-end gap-3">
              {currentStep > 1 && (
                <button
                  className="bg-[#E8F1FF] text-[#62A3FC] px-6 py-3 rounded-[30px] text-base font-semibold"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Предыдущий этап
                </button>
              )}
              <button
                className="bg-[#62A3FC] text-white px-6 py-3 rounded-[30px] text-base font-semibold"
                onClick={
                  currentStep === steps.length ? handleSubmit : handleNext
                }
              >
                {currentStep === steps.length
                  ? "Отредактировать заявку"
                  : "Следующий этап"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
