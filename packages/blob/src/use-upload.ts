import * as React from "react";

export function useUpload() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File | undefined>(undefined);

  const onUpload = async () => {
    setLoading(true);
    try {
      if (file) {
        const response = await uploadFile(file, "/api/storage/put");
        if (!response) {
          throw new Error();
        }
        setLoading(false);

        return { file };
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
    return;
  };

  return { onUpload, loading, setFile, currentFile: file };
}

async function uploadFile(file: File, url: string) {
  try {
    const response = await fetch(url, {
      body: file,
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="${file.name}"`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    return;
  }
}
