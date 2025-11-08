import {
  LuTriangleAlert,
  LuLightbulb,
  LuCirclePlus,
  LuTrash2,
} from "react-icons/lu";
import { transactionTypes } from "../../../assets/propertyListingForm";
import PriceInput from "./PriceInput";

const ThirdStep = ({
  formData,
  handleChange,
  addPaymentPlan,
  // paymentPlans,
  removePaymentPlan,
  errors,
}) => {
  const price = formData.price || { amount: "", negotiable: false };
  const rental = formData.rentalDetails || {};
  const paymentPlans = formData.paymentPlans || [];
  const isForSale = formData.listingType === "For Sale";
  const isForRent =
    formData.listingType === "For Rent" || formData.listingType === "Short Let";

  return (
    <div className="space-y-8">
      {/* Step header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Pricing & Financials
        </h2>
        <p className="text-gray-600">
          Define the price, payment options, and any applicable rent or fees.
        </p>
      </div>

      {/* Base Price */}
      <PriceInput price={price} handleChange={handleChange} errors={errors} />

      {/* Transaction Type (For Sale) */}
      {isForSale && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Transaction Type *
          </label>
          <select
            name="transactionType"
            value={formData.transactionType || ""}
            onChange={handleChange}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all ${
              errors.transactionType
                ? "border-red-500 bg-red-50"
                : "border-gray-400/20"
            }`}
          >
            <option value="">Select transaction type</option>
            {transactionTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {errors.transactionType && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <LuTriangleAlert /> {errors.transactionType}
            </p>
          )}
        </div>
      )}

      {/* Payment Plans (for Sale with Installments) */}
      {isForSale && formData.transactionType === "Installments" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            Payment Plans
            <button
              type="button"
              onClick={addPaymentPlan}
              className="flex items-center text-yellow-700 hover:text-yellow-800 font-medium text-sm"
            >
              <LuCirclePlus className="w-4 h-4 mr-1" /> Add Plan
            </button>
          </h3>
          {paymentPlans.length === 0 && (
            <p className="text-sm text-gray-500 italic">
              Add at least one plan for installment payments.
            </p>
          )}
          <div className="space-y-4 mt-2">
            {paymentPlans.map((plan, index) => (
              <div
                key={index}
                className="p-4 border-2 border-gray-400/20 rounded-lg relative bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => removePaymentPlan(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <LuTrash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Plan Name *
                    </label>
                    <input
                      type="text"
                      name={`paymentPlans[${index}].name`}
                      value={plan.name || ""}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 rounded-lg ${
                        errors[`paymentPlan_${index}_name`]
                          ? "border-red-500 bg-red-50"
                          : "border-gray-400/20"
                      }`}
                      placeholder="e.g., Initial Deposit"
                    />
                    {errors[`paymentPlan_${index}_name`] && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <LuTriangleAlert />{" "}
                        {errors[`paymentPlan_${index}_name`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Amount *
                    </label>
                    <input
                      type="number"
                      name={`paymentPlans[${index}].amount`}
                      value={plan.amount || ""}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 rounded-lg ${
                        errors[`paymentPlan_${index}_amount`]
                          ? "border-red-500 bg-red-50"
                          : "border-gray-400/20"
                      }`}
                      placeholder="e.g., 1000000"
                    />
                    {errors[`paymentPlan_${index}_amount`] && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <LuTriangleAlert />{" "}
                        {errors[`paymentPlan_${index}_amount`]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Type *
                    </label>
                    <select
                      name={`paymentPlans[${index}].type`}
                      value={plan.type || ""}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 rounded-lg ${
                        errors[`paymentPlan_${index}_type`]
                          ? "border-red-500 bg-red-50"
                          : "border-gray-400/20"
                      }`}
                    >
                      <option value="">Select type</option>
                      <option value="Deposit">Deposit</option>
                      <option value="Milestone">Milestone</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Balloon">Balloon</option>
                    </select>
                    {errors[`paymentPlan_${index}_type`] && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <LuTriangleAlert />{" "}
                        {errors[`paymentPlan_${index}_type`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Due in (Months)
                    </label>
                    <input
                      type="number"
                      name={`paymentPlans[${index}].dueInMonths`}
                      value={plan.dueInMonths || ""}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 rounded-lg ${
                        errors[`paymentPlan_${index}_dueInMonths`]
                          ? "border-red-500 bg-red-50"
                          : "border-gray-400/20"
                      }`}
                      placeholder="e.g., 6"
                    />
                    {errors[`paymentPlan_${index}_dueInMonths`] && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <LuTriangleAlert />{" "}
                        {errors[`paymentPlan_${index}_dueInMonths`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rental Details (For Rent / Short Let) */}
      {isForRent && (
        <div className="space-y-6 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Rental Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rent Frequency
              </label>
              <select
                name="rentalDetails.rentFrequency"
                value={formData.rentalDetails.rentFrequency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Security Deposit (NGN)
              </label>
              <input
                type="number"
                name="rentalDetails.depositAmount"
                value={formData.rentalDetails.depositAmount}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lease Duration (Months)
              </label>
              <input
                type="number"
                name="rentalDetails.leaseDurationMonths"
                value={formData.rentalDetails.leaseDurationMonths}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Charge (NGN)
              </label>
              <input
                type="number"
                name="rentalDetails.serviceCharge.amount"
                value={formData.rentalDetails.serviceCharge.amount}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Charge Frequency
              </label>
              <select
                name="rentalDetails.serviceCharge.frequency"
                value={formData.rentalDetails.serviceCharge.frequency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Agency Fee (%)
              </label>
              <input
                type="number"
                name="rentalDetails.agencyFeePercent"
                value={formData.rentalDetails.agencyFeePercent}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., 10"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Caution Fee (NGN)
              </label>
              <input
                type="number"
                name="rentalDetails.cautionFee"
                value={formData.rentalDetails.cautionFee}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              name="rentalDetails.petsAllowed"
              checked={formData.rentalDetails.petsAllowed}
              onChange={handleChange}
              className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label className="ml-3 text-sm font-medium text-gray-700">
              Pets Allowed
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Tenants
            </label>
            <select
              name="rentalDetails.preferredTenants"
              value={formData.rentalDetails.preferredTenants}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="Anyone">Anyone</option>
              <option value="Family">Family</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Corporate">Corporate</option>
            </select>
          </div>
        </div>
      )}
      {/* Pro Tip */}
      <div className="bg-blue-400/10 border-2 border-blue-200 rounded-lg p-3">
        <h4 className="font-semibold text-blue-900 mb-2 text-sm flex items-center gap-1">
          <LuLightbulb /> Pro Tip
        </h4>
        <p className="text-xs text-blue-800">
          Clearly stating your payment plans or rent structure helps attract
          more serious buyers and renters who understand your terms upfront.
        </p>
      </div>
    </div>
  );
};

export default ThirdStep;
