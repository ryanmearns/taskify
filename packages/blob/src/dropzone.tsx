/* <Dropzone
  onDrop={(acceptedFiles) =>
    acceptedFiles.length === 1 && setFile(acceptedFiles[0])
  }
  maxFiles={1}
>
  {({ getRootProps, getInputProps }) => (
    <section className="flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed bg-muted/50">
      <div
        {...getRootProps()}
        className="flex w-full flex-col items-center justify-center space-y-1 p-12"
      >
        <input {...getInputProps()} />
        {currentFile ? (
          <InnerDropzoneFile file={currentFile} />
        ) : (
          <InnerDropzoneUpload />
        )}
      </div>
    </section>
  )}
</Dropzone>; */
