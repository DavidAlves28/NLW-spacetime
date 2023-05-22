"use client";

import React, { ChangeEvent, useState } from "react";

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);
  function onFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files) {
      return;
    }
    const previewURL = URL.createObjectURL(files[0]);
    setPreview(previewURL);
  }
  return (
    <React.Fragment>
      <input
        onChange={onFileSelect}
        type="file"
        name='CoverURL'
        id="midia"
        accept="image/*"
        className="invisible w-0 h-0"
      />
      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="w-full aspect-video rounded-lg object-cover"
        />
      )}
    </React.Fragment>
  );
}
