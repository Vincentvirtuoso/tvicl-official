import React, { useEffect, useRef } from "react";
import FirstStep from "../section/propertyListingForm/steps/FirstStep";
import SecondStep from "../section/propertyListingForm/steps/SecondStep";
import ThirdStep from "../section/propertyListingForm/steps/ThirdStep";
import FourthStep from "../section/propertyListingForm/steps/FourthStep";
import SixthStep from "../section/propertyListingForm/steps/SixthStep";
import ReviewStep from "../section/propertyListingForm/steps/ReviewStep";
import NavigationButtons from "../section/propertyListingForm/NavigationButtons";
import MediaUploadStep from "../section/propertyListingForm/MediaUploadStep";
import { steps } from "../assets/propertyListingForm";
import { usePropertyAPI } from "../hooks/useProperty";
import { useToast } from "../context/ToastManager";
import { usePropertyListingForm } from "../hooks/usePropertyListingForm";

const AddProperty = () => {
  const { createProperty, isLoading } = usePropertyAPI();

  const {
    handleChange,
    errors,
    setErrors,
    setFormData,
    formData,
    validateStep,
    resetForm,
    setCanProceedStep5,
    checkingStep5,
    setCheckingStep5,
    step,
    setStep,
    removeContact,
    addContact,
    addPaymentPlan,
    paymentPlans,
    removePaymentPlan,
  } = usePropertyListingForm();

  const { addToast } = useToast();
  const divRef = useRef(null);

  /** 🚀 Submit to backend via hook */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid } = validateStep(step);
    if (!isValid) return;

    try {
      const formDataToSend = new FormData();

      // Allowed top-level fields
      const allowedFields = [
        "title",
        "description",
        "propertyType",
        "listingType",
        "furnishingStatus",
        "propertyCondition",
        "possessionStatus",
        "availableFrom",
        "transactionType",
      ];

      // Append allowed regular fields
      allowedFields.forEach((key) => {
        if (formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append nested objects
      formDataToSend.append(
        "contactPerson",
        JSON.stringify(formData.contactPerson)
      );
      formDataToSend.append("address", JSON.stringify(formData.address));
      formDataToSend.append("price", JSON.stringify(formData.price));
      formDataToSend.append(
        "rentalDetails",
        JSON.stringify(formData.rentalDetails)
      );
      formDataToSend.append(
        "paymentPlans",
        JSON.stringify(formData.paymentPlans)
      );
      formDataToSend.append(
        "amenities",
        JSON.stringify(formData.amenities || [])
      );

      // Append media files + metadata
      formData.media.forEach((item) => {
        if (item.file) {
          formDataToSend.append("mediaFiles", item.file);
          formDataToSend.append(
            "mediaData",
            JSON.stringify({
              category: item.category,
              subCategory: item.subCategory,
              type: item.type,
              isPrimary: item.isPrimary,
              caption: item.caption,
            })
          );
        }
      });

      const res = await createProperty(formDataToSend);

      addToast("Property listing created successfully!", "success");
      console.log("Created property:", res.data);
      resetForm();
    } catch (err) {
      console.error(err);
      addToast(
        err.response?.data?.message || "Failed to create property.",
        "error"
      );
    }
  };

  /** 🔄 Scroll to top when step changes */
  useEffect(() => {
    if (divRef.current && step > 1) {
      divRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  return (
    <div className="min-h-screen" ref={divRef}>
      <div className="">
        {/* Steps indicator */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-start justify-between gap-1 relative w-full py-4 px-2 flex-wrap">
            {steps.map((s) => {
              const isActive = step >= s.num;
              return (
                <div
                  key={s.num}
                  className="flex flex-col items-center flex-1 z-1"
                >
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300
              ${
                isActive
                  ? "bg-yellow-600 border-yellow-600 text-white shadow-md"
                  : "bg-white border-gray-300 text-gray-500"
              }`}
                  >
                    <s.icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`mt-2 text-xs font-semibold text-center whitespace-nowrap transition-colors duration-300
              ${isActive ? "text-yellow-700" : "text-gray-500"}`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {step === 1 && (
            <FirstStep
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}
          {step === 2 && (
            <SecondStep
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}
          {step === 3 && (
            <ThirdStep
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              setFormData={setFormData}
              addPaymentPlan={addPaymentPlan}
              paymentPlans={paymentPlans}
              removePaymentPlan={removePaymentPlan}
            />
          )}
          {step === 4 && (
            <FourthStep
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}
          {step === 5 && (
            <MediaUploadStep
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              setCanProceedStep5={setCanProceedStep5}
              checkingStep5={checkingStep5}
              setCheckingStep5={setCheckingStep5}
            />
          )}
          {step === 6 && (
            <SixthStep
              formData={formData}
              handleChange={handleChange}
              setFormData={setFormData}
              errors={errors}
              addContact={addContact}
              removeContact={removeContact}
            />
          )}
          {step === 7 && (
            <ReviewStep
              formData={formData}
              onSubmit={handleSubmit}
              setStep={setStep}
              isLoading={isLoading("createProperty")}
            />
          )}
          <NavigationButtons
            setStep={setStep}
            step={step}
            setCheckingStep5={setCheckingStep5}
            validateStep={validateStep}
            errors={errors}
          />
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
