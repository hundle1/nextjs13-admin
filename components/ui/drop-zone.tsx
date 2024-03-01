import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";

// import "./style.css";

interface FileWithPreview extends File {
  preview: string;
}

const thumbsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb: React.CSSProperties = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner: React.CSSProperties = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img: React.CSSProperties = {
  display: "block",
  width: "auto",
  height: "100%"
};

function Dropzone() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*" as unknown as Accept,
    onDrop: (acceptedFiles: File[]) => {
      const filesWithPreview: FileWithPreview[] = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      setFiles(filesWithPreview);
    }
  });

  const removeFile = (file: FileWithPreview) => () => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <Image src={file.preview} style={img} width={100} height={100} alt={file.name} />
      </div>
      <button onClick={removeFile(file)}>Remove File</button>
    </div>
  ));

  useEffect(() => {
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <section className="container">
      <div
        {...getRootProps({ className: "dropzone" })}
        onClick={(e) => e.stopPropagation()}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <div>
          <button type="button" onClick={open}>
            Open File Dialog
          </button>
          <button type="button" onClick={() => console.log("HIT!")}>
            Open Chainels files
          </button>
        </div>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

export default Dropzone;