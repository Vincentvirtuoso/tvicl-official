/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, memo, useRef } from "react";
import { FaVideo, FaCheckCircle } from "react-icons/fa";
import { LuCamera, LuInfo, LuCircleAlert, LuFileText } from "react-icons/lu";
import { generateMediaCategories } from "../../assets/propertyListingForm";
import FileUpload from "./FileUpload";
import { useToast } from "../../context/ToastManager";

const MediaUploadStep = ({
  formData,
  setFormData,
  errors,
  setCanProceedStep5,
  checkingStep5,
  setCheckingStep5,
  setErrors,
}) => {
  const [mediaCategories, setMediaCategories] = useState({});
  const [videoLink, setVideoLink] = useState(formData.videoUrl || "");
  const [activeCategory, setActiveCategory] = useState(null);
  // const [isValidatingVideo, setIsValidatingVideo] = useState(false);

  const { addToast } = useToast();

  const uploadSectionRef = useRef(null);

  // 📊 Memoized categories to prevent unnecessary recalculations
  const categories = useMemo(() => {
    const initial = generateMediaCategories(formData);
    return [
      ...initial,
      {
        id: "legalDocs",
        label: "Legal Documents",
        description:
          "Upload property ownership and approval documents (PDF or Image).",
        icon: <LuFileText className="text-primary inline-flex" />,
        required: false,
      },
    ];
  }, [
    formData.bedrooms,
    formData.bathrooms,
    formData.kitchens,
    formData.balconies,
    formData.additionalRooms,
  ]);

  // 🔄 Initialize and organize media by category
  useEffect(() => {
    const existingMedia = formData.media || [];
    const legalDocs = formData.legalDocuments || {};
    const organized = {};

    // Initialize all media categories
    categories.forEach((cat) => {
      organized[cat.id] = [];
    });

    // Organize existing media by category
    existingMedia.forEach((mediaItem) => {
      if (organized[mediaItem.category]) {
        organized[mediaItem.category].push(mediaItem);
      }
    });

    // ✅ Add legal document categories (e.g., C of O, Survey Plan, etc.)
    organized["legalDocs"] = [];

    Object.entries(legalDocs).forEach(([key, doc]) => {
      if (doc?.url) {
        organized["legalDocs"].push({
          id: key,
          url: doc.url,
          type: "document",
          label: key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase()),
          present: doc.present || false,
        });
      }
    });

    // ✅ Update state
    setMediaCategories(organized);

    // Set first category active if none selected
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, formData.media?.length, formData.legalDocuments]);

  // 📂 Handle File Uploads with comprehensive validation
  const handleFilesChange = (categoryId, e, subCategory) => {
    const files = Array.from(e.target.files);
    const category = categories.find((c) => c.id === categoryId);
    const current = mediaCategories[categoryId] || [];

    if (!category || files.length === 0) return;

    const MAX_FILE_SIZE_MB = 10;
    const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

    // ✅ Handle different accepted types
    const ALLOWED_TYPES =
      categoryId === "legalDocs"
        ? ["application/pdf", "image/jpeg", "image/png", "image/webp"]
        : ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic"];

    const validFiles = [];
    const invalidFiles = [];

    files.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
        invalidFiles.push(`${file.name} (invalid format)`);
      } else if (file.size > MAX_FILE_SIZE) {
        invalidFiles.push(`${file.name} exceeds ${MAX_FILE_SIZE_MB}MB`);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      addToast(
        `${invalidFiles.length} file(s) rejected:\n${invalidFiles.join("\n")}`,
        "error"
      );
      return;
    }

    // ⚖️ Legal Docs stored differently
    if (categoryId === "legalDocs") {
      const updatedDocs = { ...formData.legalDocuments };

      validFiles.forEach((file) => {
        const key = subCategory;
        if (!key) return;

        console.log(file);

        updatedDocs[key] = {
          present: true,
          url: URL.createObjectURL(file),
          file,
          type: file?.type?.split("/")?.[0] || "document",
        };
      });

      setFormData((prev) => ({
        ...prev,
        legalDocuments: updatedDocs,
      }));

      console.log(updatedDocs);
      console.log(validFiles);

      addToast(`✓ ${validFiles.length} legal document(s) added`, "success");
      return;
    }

    // 📸 Normal media uploads
    const newMediaItems = validFiles.map((file) => ({
      url: URL.createObjectURL(file),
      file,
      type: "image",
      category: categoryId,
      subCategory:
        categoryId === "cover"
          ? "cover"
          : subCategory
          ? subCategory
          : "gallery",
      caption: "",
      isPrimary: categoryId === "cover" && current.length === 0,
      uploadedAt: new Date().toISOString(),
    }));

    updateMediaState(categoryId, [...current, ...newMediaItems]);

    if (errors[categoryId]) {
      setErrors((prev) => ({ ...prev, [categoryId]: null }));
    }

    addToast(
      `✓ ${validFiles.length} file${
        validFiles.length > 1 ? "s" : ""
      } added to ${category.label}`,
      "success"
    );
  };

  // ✏️ Update caption
  const handleCaptionChange = (categoryId, index, caption) => {
    const updatedCategory = mediaCategories[categoryId].map((item, idx) =>
      idx === index ? { ...item, caption } : item
    );
    updateMediaState(categoryId, updatedCategory);
  };

  // ⭐ Set primary cover image
  const handleSetPrimary = (categoryId, index) => {
    if (categoryId !== "cover") return;

    const updatedCategory = mediaCategories[categoryId].map((item, idx) => ({
      ...item,
      isPrimary: idx === index,
    }));

    updateMediaState(categoryId, updatedCategory);
    addToast("✓ Primary cover image updated", "success");
  };

  // ❌ Remove file
  const removeFile = (categoryId, index) => {
    const updatedCategory = mediaCategories[categoryId].filter(
      (_, i) => i !== index
    );

    // If removing primary cover, set first remaining as primary
    if (categoryId === "cover" && updatedCategory.length > 0) {
      const hadPrimary = mediaCategories[categoryId][index]?.isPrimary;
      if (hadPrimary) {
        updatedCategory[0].isPrimary = true;
      }
    }

    updateMediaState(categoryId, updatedCategory);
  };

  // 🔄 Centralized state update helper
  const updateMediaState = (categoryId, updatedCategoryData) => {
    const updatedCategories = {
      ...mediaCategories,
      [categoryId]: updatedCategoryData,
    };

    setMediaCategories(updatedCategories);

    // Flatten to array for formData
    const allMedia = Object.values(updatedCategories).flat();
    setFormData((prev) => ({ ...prev, media: allMedia }));
  };

  // 🎥 Handle video URL with validation
  const handleVideoChange = (e) => {
    const val = e.target.value.trim();
    setVideoLink(val);

    if (!val) {
      setFormData((prev) => ({ ...prev, videoUrl: "" }));
      return;
    }

    // Simple validation for YouTube/Vimeo
    const isValid =
      val.includes("youtube.com") ||
      val.includes("youtu.be") ||
      val.includes("vimeo.com");

    if (isValid) {
      setFormData((prev) => ({ ...prev, videoUrl: val }));
    }
  };

  // 📊 Calculate progress
  const getCategoryProgress = (category) => {
    const files = mediaCategories[category.id] || [];
    const count = files.length;
    const min = category.minImages || 0;

    if (category.required) {
      return count >= min ? "complete" : "incomplete";
    }
    return count > 0 ? "complete" : "optional";
  };

  // 📈 Overall progress stats

  const progressStats = useMemo(() => {
    const totalRequired = categories.filter((c) => c.required).length;
    const completedRequired = categories.filter(
      (c) => c.required && getCategoryProgress(c) === "complete"
    ).length;
    const totalUploaded = Object.values(mediaCategories).flat().length;

    return {
      totalRequired,
      completedRequired,
      percentage:
        totalRequired > 0 ? (completedRequired / totalRequired) * 100 : 0,
      totalUploaded,
      isComplete: completedRequired === totalRequired,
    };
  }, [categories, mediaCategories, getCategoryProgress]);
  useEffect(() => {
    if (errors.media) {
      addToast(errors.media, "error");
    }
    if (errors.imagesCount) {
      addToast(errors.imagesCount, "error");
    }
  }, [errors]);

  useEffect(() => {
    if (!progressStats.isComplete && checkingStep5) {
      addToast(
        "Please complete all required media uploads before continuing.",
        "error"
      );

      // Smooth scroll to the first incomplete category
      const firstIncomplete = categories.find(
        (c) => c.required && getCategoryProgress(c) !== "complete"
      );
      if (firstIncomplete) {
        const targetSection = document.querySelector(
          `#category-${firstIncomplete.id}`
        );
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          setTimeout(() => {
            targetSection?.focus?.();

            // Add blinking highlight class
            targetSection.classList.add("animate-shake");

            // Remove it after animation ends
            setTimeout(() => {
              targetSection.classList.remove("animate-shake");
            }, 3000);
          }, 500);
        }
      }
      setCheckingStep5(false);
      return;
    }
    setCanProceedStep5(true);
  }, [formData, checkingStep5]);

  useEffect(() => {
    if (!uploadSectionRef.current) return;
    uploadSectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    const targetBtn = document.querySelector("#uploadFiles");
    setTimeout(() => {
      targetBtn.focus();

      // Add blinking highlight class
      targetBtn.classList.add("animate-shake");

      // Remove it after animation ends
      setTimeout(() => {
        targetBtn.classList.remove("animate-shake");
      }, 3000);
    }, 500);
  }, [activeCategory]);

  return (
    <div className="space-y-6 pb-8">
      {/* Header with Stats */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <LuCamera className="text-primary" />
              Upload Property Media
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              High-quality photos significantly increase viewer interest and
              inquiries
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {progressStats.totalUploaded}
            </div>
            <div className="text-xs text-gray-500">Photos Uploaded</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              {progressStats.isComplete ? (
                <>
                  <FaCheckCircle className="text-green-500" />
                  All Required Sections Complete
                </>
              ) : (
                <>
                  <LuCircleAlert className="text-yellow-500" />
                  Required Sections: {progressStats.completedRequired}/
                  {progressStats.totalRequired}
                </>
              )}
            </span>
            <span className="text-sm font-bold text-primary">
              {Math.round(progressStats.percentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-500 ease-out ${
                progressStats.isComplete
                  ? "bg-gradient-to-r from-green-400 to-green-600"
                  : "bg-gradient-to-r from-yellow-400 to-primary"
              }`}
              style={{ width: `${progressStats.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Category Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const progress = getCategoryProgress(cat);
          const files = mediaCategories[cat.id] || [];
          const isActive = activeCategory === cat.id;
          const isComplete = progress === "complete";

          return (
            <button
              key={cat.id}
              type="button"
              id={`category-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                isActive
                  ? "border-primary bg-yellow-50 shadow-lg scale-105"
                  : isComplete
                  ? "border-green-300 bg-green-50 hover:border-green-400"
                  : cat.required
                  ? "border-gray-300 bg-white hover:border-gray-400 hover:shadow-md"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              {/* Badge for required/complete */}
              {cat.required && !isComplete && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Required
                </span>
              )}
              {isComplete && (
                <FaCheckCircle
                  className="absolute -top-2 -right-2 text-green-500 bg-white rounded-full"
                  size={20}
                />
              )}

              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="text-xs font-semibold text-gray-800 mb-1 truncate">
                {cat.label}
              </div>
              <div className="flex items-center justify-center gap-1 text-xs">
                <span className="font-bold text-primary">{files.length}</span>
                <span className="text-gray-500">
                  {cat.maxImages ? `/ ${cat.maxImages}` : ""}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Category Upload Section */}
      {activeCategory &&
        (activeCategory === "legalDocs" ? (
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 rounded-lg">
                <LuFileText className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Legal Documents
                </h3>
                <p className="text-sm text-gray-600">
                  Upload official documents like Certificate of Occupancy or
                  Survey Plan.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { key: "cOfO", label: "Certificate of Occupancy (C of O)" },
                { key: "surveyPlan", label: "Survey Plan" },
                { key: "deedOfAssignment", label: "Deed of Assignment" },
                { key: "governorsConsent", label: "Governor's Consent" },
              ].map((doc) => (
                <FileUpload
                  key={doc.key}
                  label={doc.label}
                  name={`legalDocs-${doc.key}`}
                  id={doc.key}
                  icon={<LuFileText className="text-blue-500" />}
                  description="Upload PDF or image format"
                  accept=".pdf,image/*"
                  isFile="legalDocs"
                  preview={
                    formData.legalDocuments?.[doc.key]?.url
                      ? [formData.legalDocuments[doc.key]]
                      : []
                  }
                  maxFiles={1}
                  handleFilesChange={handleFilesChange}
                  removeFile={() => {
                    setFormData((prev) => ({
                      ...prev,
                      legalDocuments: {
                        ...prev.legalDocuments,
                        [doc.key]: { present: false, url: "" },
                      },
                    }));
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            ref={uploadSectionRef}
          >
            {(() => {
              const category = categories.find((c) => c.id === activeCategory);
              const files = mediaCategories[activeCategory] || [];
              const progress = getCategoryProgress(category);

              return (
                <FileUpload
                  key={category.id}
                  icon={category.icon}
                  label={category.label}
                  description={category.description}
                  required={category.required}
                  minFiles={category.minImages}
                  maxFiles={category.maxImages}
                  progress={progress}
                  accept="image/*"
                  name={category.id}
                  id={category.id}
                  preview={files}
                  errors={errors}
                  uploadPlaceholder="Upload Photos"
                  allowCaption
                  isCoverable={category.id === "cover"}
                  onSetPrimary={handleSetPrimary}
                  handleFilesChange={handleFilesChange}
                  handleCaptionChange={handleCaptionChange}
                  removeFile={removeFile}
                />
              );
            })()}
          </div>
        ))}

      {/* Video Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <FaVideo className="text-red-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Property Video Tour
              <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                Optional
              </span>
            </h3>
            <p className="text-sm text-gray-600">
              Add a YouTube or Vimeo walkthrough to boost engagement by 80%
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="url"
            value={videoLink}
            onChange={handleVideoChange}
            placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
            name="videoUrl"
            className="flex-1 border-2 border-gray-300 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors"
          />
          {videoLink && (
            <button
              type="button"
              onClick={() => {
                setVideoLink("");
                setFormData((prev) => ({ ...prev, videoUrl: "" }));
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        {((videoLink &&
          !videoLink.includes("youtube") &&
          !videoLink.includes("vimeo")) ||
          errors.videoUrl) && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
            <LuCircleAlert />
            {errors.videoUrl || "Please use a valid YouTube or Vimeo URL"}
          </p>
        )}
      </div>

      {/* Enhanced Tips Section */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
        <h4 className="font-bold text-yellow-900 mb-3 flex gap-2 items-center text-lg">
          <LuInfo className="text-yellow-600" size={24} />
          Pro Photography Tips
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm text-yellow-900">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                <strong>Golden hour magic:</strong> Shoot during early morning
                or late afternoon
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-yellow-900">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                <strong>Declutter & stage:</strong> Remove personal items and
                tidy up
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-yellow-900">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                <strong>Corner angles:</strong> Capture more space in each shot
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm text-yellow-900">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                <strong>Mix wide & detail shots:</strong> Show overview and
                highlights
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-yellow-900">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                <strong>Sharp focus:</strong> Use a tripod or stabilize your
                phone
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm text-yellow-900">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                <strong>Vertical shots:</strong> Don't forget ceiling height and
                details
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MediaUploadStep);
