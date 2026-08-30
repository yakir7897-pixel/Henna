"use client";

import { useRef, useState } from "react";
import { uploadCoverImage } from "@/app/admin/actions";

export function CoverImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError(null);
    setIsUploading(true);
    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadCoverImage(formData);
    setIsUploading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    onChange(result.url);
  }

  return (
    <div className="space-y-2">
      {value && (
        <div
          className="h-32 w-full rounded-lg border border-neutral-200 bg-neutral-100 bg-cover bg-center"
          style={{ backgroundImage: `url(${value})` }}
        />
      )}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="rounded border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-50 disabled:opacity-60"
        >
          {isUploading ? "מעלה..." : value ? "החלף תמונה" : "העלאת תמונה"}
        </button>
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-sm text-red-600 hover:underline">
            הסר תמונה
          </button>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
