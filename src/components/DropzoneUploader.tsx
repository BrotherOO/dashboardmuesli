"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { useAdmin } from "./AdminProvider";
import { UploadCloud } from "lucide-react";

export function DropzoneUploader() {
  const { setCsvData } = useAdmin();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setCsvData(results.data as Record<string, unknown>[]);
        },
      });
    }
  }, [setCsvData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'text/csv': ['.csv'] } });

  return (
    <div {...getRootProps()} className={`p-8 h-full flex flex-col justify-center border-2 border-dashed rounded-[32px] text-center cursor-pointer transition-all ${isDragActive ? 'border-primary bg-primary/5' : 'border-white/40 bg-background shadow-neu-flat hover:shadow-neu-pressed'}`}>
      <input {...getInputProps()} />
      <UploadCloud className={`mx-auto mb-4 w-12 h-12 transition-colors ${isDragActive ? 'text-primary' : 'text-muted-foreground/60'}`} />
      <div className="space-y-1">
        {isDragActive ? (
          <p className="font-bold text-primary text-lg">CSV hier ablegen ...</p>
        ) : (
          <>
            <p className="font-bold text-foreground text-lg">CSV-Metriken importieren</p>
            <p className="font-medium text-sm text-muted-foreground">Datei (Datum, Umsatz) ablegen oder klicken</p>
          </>
        )}
      </div>
    </div>
  );
}
