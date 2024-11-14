import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Business } from "@/api/directory";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import {
  storage,
  firestore,
  BUSINESS_MEDIA_COLLECTION,
  BUSINESS_COLLECTION,
} from "@/lib/firebase";
import { Button } from "../ui/button";

const MAX_FILE_SIZE = 500000; // 500KB in bytes
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const businessSchema = yup.object({
  name: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  website: yup
    .string()
    .url("Invalid website URL")
    .required("Website is required"),
  imageFile: yup
    .mixed<FileList>()
    .test("required", "Image is required", (value) => value != null)
    .test("fileSize", "File size must be less than 500KB", (value) => {
      if (!value || value.length == 0) return true;
      console.log("validate", value, value[0].size);
      return value[0].size <= MAX_FILE_SIZE;
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value || value.length == 0) return true;
      return ALLOWED_FILE_TYPES.includes(value[0].type);
    }),
});

interface CreateBusinessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBusinessCreated?: (business: Business) => void;
  onBusinessUpdated?: (business: Business) => void;
  editBusiness?: Business | null;
  mode?: "create" | "edit";
}

export function CreateBusinessModal({
  open,
  onOpenChange,
  onBusinessCreated,
  onBusinessUpdated,
  editBusiness,
  mode = "create",
}: CreateBusinessModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(businessSchema),
  });

  useEffect(() => {
    if (mode === "edit" && editBusiness) {
      setValue("name", editBusiness.name);
      setValue("category", editBusiness.category);
      setValue("description", editBusiness.description);
      setValue("location", editBusiness.location);
      setValue("email", editBusiness.email);
      setValue("phone", editBusiness.phone);
      setValue("website", editBusiness.website);
    }
  }, [mode, editBusiness, setValue]);

  async function onSubmit(values: yup.InferType<typeof businessSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      let imageUrl = editBusiness?.image;

      if (values.imageFile?.[0]) {
        const imageFile = values.imageFile[0];
        const imageRef = ref(
          storage,
          `${BUSINESS_MEDIA_COLLECTION}/${Date.now()}_${imageFile.name}`
        );
        const uploadResult = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      const businessData = {
        name: values.name,
        category: values.category,
        description: values.description,
        location: values.location,
        email: values.email,
        phone: values.phone,
        website: values.website,
        image: imageUrl!,
        verified: editBusiness?.verified ?? false,
        views: editBusiness?.views ?? 0,
        slug: values.name.toLowerCase().replace(/\s+/g, "-"),
        updatedAt: new Date().toISOString(),
        ...(mode === "create" && { createdAt: new Date().toISOString() }),
      };

      if (mode === "edit" && editBusiness?.id) {
        await updateDoc(
          doc(firestore, BUSINESS_COLLECTION, editBusiness.id),
          businessData
        );
        onBusinessUpdated?.({
          id: editBusiness.id,
          ...businessData,
        });
      } else {
        const docRef = await addDoc(
          collection(firestore, BUSINESS_COLLECTION),
          businessData
        );
        onBusinessCreated!({
          id: docRef.id,
          ...businessData,
        });
      }

      reset();
      onOpenChange(false);
    } catch (error: any) {
      console.error("Failed to save business:", error);
      setError(error.message || "Failed to save business. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  console.log("errors", errors);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative z-50 w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-lg bg-background border border-gray-600 p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {mode === "edit" ? "Edit Business" : "Add New Business"}
          </h2>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Business Name</label>
              <input
                {...register("name")}
                className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter business name"
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Location Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Location</label>
              <input
                {...register("location")}
                className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter location"
              />
              {errors.location && (
                <span className="text-sm text-red-500">
                  {errors.location.message}
                </span>
              )}
            </div>

            {/* Category Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Category</label>
              <input
                {...register("category")}
                className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter category"
              />
              {errors.category && (
                <span className="text-sm text-red-500">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Email</label>
              <input
                {...register("email")}
                type="email"
                className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter email"
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Phone</label>
              <input
                {...register("phone")}
                className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter phone"
              />
              {errors.phone && (
                <span className="text-sm text-red-500">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Website Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Website</label>
              <input
                {...register("website")}
                className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter website URL"
              />
              {errors.website && (
                <span className="text-sm text-red-500">
                  {errors.website.message}
                </span>
              )}
            </div>

            {/* Replace image URL field with file upload */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Business Image</label>
              {mode === "edit" && editBusiness?.image && (
                <div className="mb-2">
                  {/* // @ts-ignore */}
                  <img
                    src={editBusiness.image}
                    alt="Current"
                    className="h-20 w-20 object-cover rounded-md"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                {...register("imageFile")}
                className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
              {mode === "edit" && (
                <span className="text-xs text-gray-500">
                  Leave empty to keep the current image
                </span>
              )}
              {errors.imageFile && (
                <span className="text-sm text-red-500">
                  {errors.imageFile.message}
                </span>
              )}
              <span className="mt-1 text-xs text-gray-500">
                Max size: 500KB. Supported formats: JPEG, PNG, WebP
              </span>
            </div>
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              className="h-24 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter description"
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? mode === "edit"
                  ? "Updating..."
                  : "Creating..."
                : mode === "edit"
                ? "Update Business"
                : "Create Business"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
