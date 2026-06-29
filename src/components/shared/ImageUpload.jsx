import React, { useRef, useState } from "react";
<<<<<<< HEAD
import { supabase } from "@/lib/supabase";
import { Upload, Loader2, X } from "lucide-react";
import { toast } from "sonner";

=======
import { Upload, Loader2, X } from "lucide-react";
import { toast } from "sonner";

const CLOUD_NAME = "dsj0axedi";
const UPLOAD_PRESET = "profit_pursuit";

>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
export default function ImageUpload({ value, onChange, previewClass = "w-10 h-14", label = "Upload Image" }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    setUploading(true);
    try {
<<<<<<< HEAD
      const ext = file.name.split(".").pop();
      const filename = `${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("covers").upload(filename, file, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from("covers").getPublicUrl(filename);
      onChange(data.publicUrl);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Upload failed: " + (err.message || "unknown error"));
=======
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
        toast.success("Image uploaded!");
      } else {
        throw new Error("No URL returned");
      }
    } catch {
      toast.error("Upload failed");
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <label className="text-gold/50 text-[10px] tracking-wider uppercase block mb-1">{label}</label>}
      <div className="flex items-center gap-3">
        <label className="cursor-pointer flex items-center gap-1.5 bg-gold/10 border border-gold/20 text-gold px-4 py-2 text-xs hover:bg-gold/20 transition-colors whitespace-nowrap flex-1 justify-center">
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          {uploading ? "Uploading..." : "Upload from Device"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
          />
        </label>
        {value && (
          <>
            <img src={value} alt="" className={`${previewClass} object-cover rounded-sm border border-gold/15`} />
<<<<<<< HEAD
            <button type="button" onClick={() => onChange("")} className="text-white/30 hover:text-red-400 p1">
=======
            <button type="button" onClick={() => onChange("")} className="text-white/30 hover:text-red-400 p-1">
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
              <X size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> e2a1f6240e3b81968a9ce0fc0ce2bda6929101d4
