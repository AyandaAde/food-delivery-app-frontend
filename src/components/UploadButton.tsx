import { UploadDropzone } from "@bytescale/upload-widget-react";

const REACT_UPLOAD_API_KEY = import.meta.env.VITE_REACT_UPLOAD_API_KEY;

// -----
// Configuration:
// https://www.bytescale.com/docs/upload-widget#configuration
// -----
const options = {
    apiKey: REACT_UPLOAD_API_KEY, // This is your API key.
    maxFileCount: 1,
    showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
    styles: {
        colors: {
            primary: "#8F00FF"
        }
    }
};

const UploadDropzoneComp = () => (
    <UploadDropzone options={options}
        onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map(x => x.fileUrl).join("\n"))}
        onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}
        width="600px"
        height="375px" />
);

export default UploadDropzoneComp;