import { useState } from "react";
import { Upload, X } from "lucide-react";

const ImageUploader = ({ onChange, multiple = false, initialImages = [] }) => {
  const [images, setImages] = useState(initialImages);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = multiple ? [...images, ...files] : files;
    setImages(newImages);
    onChange(newImages);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB {multiple ? "(multiple allowed)" : ""}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple={multiple}
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={typeof image === 'string' ? `http://localhost:5000/uploads/${image}` : URL.createObjectURL(image)}
                alt={`Upload ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
