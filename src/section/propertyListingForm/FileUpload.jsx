import { memo, useEffect } from "react";
import {
  FiCamera,
  FiUpload,
  FiCheckCircle,
  FiMusic,
  FiVideo,
  FiFile,
  FiFileText,
} from "react-icons/fi";
import { LuFileText, LuX, LuFileArchive, LuFilePlus2 } from "react-icons/lu";
import { FaFilePdf, FaFileWord, FaStar } from "react-icons/fa";

const FileUpload = ({
  icon,
  label,
  required = false,
  description = "",
  minFiles = 1,
  maxFiles = 1,
  progress,
  accept = "*/*",
  preview = [],
  errors = {},
  uploadPlaceholder = "Click to upload files",
  name,
  id,
  isFile = null,
  loading = false,
  allowCaption = false,
  isCoverable = false,
  onSetPrimary = null,
  handleFilesChange,
  handleCaptionChange = null,
  removeFile,
}) => {
  const previewList = Array.isArray(preview)
    ? preview.filter(Boolean)
    : Object.values(preview || {});

  const isMultiple = maxFiles > 1;
  const canUpload = !loading && previewList.length < maxFiles;

  const getFileIcon = (mediaItem) => {
    const type = mediaItem.type || "";
    const url = mediaItem.url || "";
    const fileName = mediaItem.file?.name?.toLowerCase() || url.toLowerCase();

    // Use the type field from schema
    if (type === "image") return <FiCamera size={40} />;
    if (type === "video") return <FiVideo size={40} />;
    if (type === "document" || type === "application") {
      if (fileName.endsWith(".pdf"))
        return <FaFilePdf size={40} color="#E63946" />;
      if (fileName.endsWith(".doc") || fileName.endsWith(".docx"))
        return <FaFileWord size={40} color="#1E90FF" />;
      if (fileName.endsWith(".zip") || fileName.endsWith(".rar"))
        return <LuFileArchive size={40} color="#D97706" />;
      if (fileName.endsWith(".txt")) return <LuFileText size={40} />;
      return <FiFile size={40} />;
    }

    // Fallback for audio or unknown
    if (fileName.includes("audio") || fileName.endsWith(".mp3"))
      return <FiMusic size={40} />;
    return <FiFile size={40} />;
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex sm:flex-row flex-col gap-2 items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            {label}
            {required && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                Required
              </span>
            )}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
          {minFiles > 0 && required && (
            <p className="text-xs text-gray-500 mt-1">
              Minimum {minFiles} {minFiles === 1 ? "file" : "files"} required
            </p>
          )}
        </div>

        {progress === "complete" && (
          <div className="flex items-center gap-2 text-green-600">
            <FiCheckCircle size={20} />
            <span className="text-sm font-medium">Complete</span>
          </div>
        )}
      </div>

      {/* Upload Button */}
      {canUpload && (
        <label
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-yellow-500 cursor-pointer transition-colors text-sm "
          id="uploadFiles"
        >
          <FiUpload className="text-lg" />
          <span>
            {previewList.length === 0 ? uploadPlaceholder : "Add More"}
          </span>
          <input
            type="file"
            multiple={isMultiple}
            accept={accept}
            onChange={(e) => handleFilesChange(isFile || name, e, id || null)}
            className="hidden"
          />
        </label>
      )}

      {errors[name] && (
        <p className="text-red-500 text-sm mt-2">{errors[name]}</p>
      )}

      {/* File Grid */}
      {previewList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {previewList.map((mediaItem, idx) => {
            const isImage = mediaItem.type === "image";
            const fileName =
              mediaItem.file?.name ||
              mediaItem.url?.split("/").pop() ||
              `File ${idx + 1}`;

            return (
              <div
                key={idx}
                className="relative border-2 border-gray-200 rounded-lg overflow-hidden hover:border-yellow-400 transition-colors group"
              >
                {/* Preview or Icon */}
                {isImage ? (
                  <img
                    src={mediaItem.url}
                    alt={mediaItem.caption || fileName}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-50 text-gray-500">
                    {getFileIcon(mediaItem)}
                    <p className="text-xs mt-2 break-all px-2 text-center">
                      {fileName}
                    </p>
                  </div>
                )}

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFile(name, idx)}
                  className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  title="Remove file"
                >
                  <LuX size={14} />
                </button>

                {/* Cover Star - with click to set primary */}
                {isCoverable && (
                  <button
                    type="button"
                    onClick={() => onSetPrimary?.(name, idx)}
                    className={`absolute top-2 left-2 rounded-full p-2 shadow-lg transition-all ${
                      mediaItem.isPrimary
                        ? "bg-primary text-white"
                        : "bg-white text-gray-400 opacity-0 group-hover:opacity-100"
                    }`}
                    title={
                      mediaItem.isPrimary
                        ? "Primary cover image"
                        : "Set as primary"
                    }
                  >
                    <FaStar size={14} />
                  </button>
                )}

                {/* Caption Input */}
                {allowCaption && (
                  <div className="p-2 bg-white border-t">
                    <input
                      type="text"
                      placeholder="Add caption (optional)"
                      value={mediaItem.caption || ""}
                      onChange={(e) =>
                        handleCaptionChange?.(name, idx, e.target.value)
                      }
                      className="w-full text-xs p-2 border border-gray-200 rounded focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
          {isFile ? (
            <LuFilePlus2 size={40} className="mx-auto text-gray-400 mb-2" />
          ) : (
            <FiCamera size={40} className="mx-auto text-gray-400 mb-2" />
          )}
          <p className="text-gray-500 text-sm">No files uploaded yet</p>
          <p className="text-gray-400 text-xs mt-1">
            Click the button above to add files
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(FileUpload);
