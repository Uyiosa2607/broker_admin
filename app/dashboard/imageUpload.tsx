import { convertImage } from "../utils/utils";
import { useState } from "react";

export default function UploadImage(props: any) {

    const {setImage} = props;

  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: any) {
    const file = event.target.files?.[0];

    try {
      const result: any = await convertImage(file);
      setImage(result);
    } catch (error) {
      setError("Failed to convert image");
      console.error(error);
    }
  }

  return (
    <div style={{
        position: "absolute",
        left: "40%",
        bottom: "4%"
    }}>
        <label htmlFor="file">📷</label>
      <input style={{ display: 'none' }} id="file" onChange={handleFileChange} type="file" />
    </div>
  );
}
