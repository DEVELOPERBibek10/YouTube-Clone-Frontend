import { CircleUserRound } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";

interface AvatarUploaderProps {
  fieldChange: (file: File[]) => void;
  mediaUrl?: string;
}

const UploadAvatar = ({ fieldChange, mediaUrl }: AvatarUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".svg", ".jpg", ".jpeg", ".webp"],
    },
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="flex items-center flex-col justify-center gap-3 flex-1 w-full cursor-pointer">
        {file && fileUrl ? (
          <img
            src={fileUrl}
            alt="user avatar"
            className="h-24 w-24 rounded-full object-cover object-top"
          />
        ) : (
          <CircleUserRound color="#0000ff" size={96} />
        )}
        <span className="text-primary text-base font-normal leading-[140%] md:text-xl md:font-semibold md:tracking-tighter">
          Upload Avatar
        </span>
      </div>
    </div>
  );
};

export default UploadAvatar;
