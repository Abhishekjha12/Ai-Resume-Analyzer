import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../utils/formatSize"; // ✅ Relative import

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0] || null;
      setFile(selectedFile);
      onFileSelect?.(selectedFile);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    noKeyboard: true,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full gradient-border p-6 text-center rounded-2xl transition-all ${
        isDragActive ? "bg-gray-100" : "bg-white"
      }`}
    >
      <input {...getInputProps()} />

      {file ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/pdf.png" alt="pdf" className="size-10" />
            <div className="flex flex-col items-start">
              <p className="text-gray-700 font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
            </div>
          </div>

          <button
            type="button"
            className="p-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setFile(null);
              onFileSelect?.(null);
            }}
          >
            <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
            <img src="/icons/info.svg" alt="upload" className="size-11" />
          </div>
          <p className="text-lg text-gray-500">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                open(); // ✅ Opens file picker
              }}
              className="text-blue-600 font-semibold underline cursor-pointer"
            >
              Click to upload
            </button>{" "}
            or drag and drop
          </p>
          <p className="text-lg text-gray-500">PDF (max: 20MB)</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
