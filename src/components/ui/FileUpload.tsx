import * as React from "react";

import { cn } from "../../lib/utils";

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: File | null;
  onChange: (file: File | null) => void;
  label?: string;
  error?: string;
  accept?: string;
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ value, onChange, label, error, accept = ".pdf,.doc,.docx", className, ...props }, ref) => {
    const [isDragActive, setIsDragActive] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (fileList: FileList | null) => {
      const file = fileList?.[0] ?? null;
      onChange(file);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragActive(false);
      handleFileChange(event.dataTransfer.files);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragActive(true);
    };

    const handleDragLeave = () => {
      setIsDragActive(false);
    };

    const handleSelectClick = () => {
      inputRef.current?.click();
    };

    return (
      <div className={cn("space-y-3", className)} ref={ref} {...props}>
        {label ? <label className="block text-sm font-medium">{label}</label> : null}
        <div
          className={cn(
            "rounded-2xl border border-input bg-background p-6 text-center transition-all duration-300 hover:border-primary cursor-pointer",
            isDragActive && "border-primary bg-primary/5",
          )}
          onClick={handleSelectClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="sr-only"
            onChange={(event) => handleFileChange(event.target.files)}
          />
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="text-3xl text-primary">+</div>
            <p className="text-base font-semibold text-foreground">Drag & drop your CV here</p>
            <p className="text-sm text-muted-foreground">
              or click to browse. Accepted file types: PDF, DOC, DOCX.
            </p>
            {value ? (
              <p className="text-sm text-foreground">Selected: {value.name}</p>
            ) : (
              <p className="text-sm text-primary">No file selected</p>
            )}
          </div>
        </div>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";

export { FileUpload };
