import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  onUpload: (files: File | null) => void;
}

export const FileUpload: React.FC<Props> = ({ onUpload, className }) => {
  return (
    <div className={className}>
      <input
        data-testid="file-upload-input"
        type="file"
        id="file-upload-input"
        accept=".txt"
        onChange={(e) => onUpload(e.currentTarget.files?.[0] ?? null)}
      />
    </div>
  );
};
