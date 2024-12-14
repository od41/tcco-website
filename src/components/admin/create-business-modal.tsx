import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Business, Social } from "@/api/directory";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  storage,
  firestore,
  BUSINESS_MEDIA_COLLECTION,
  BUSINESS_COLLECTION,
  CATEGORIES_COLLECTION,
  LOCATIONS_COLLECTION,
} from "@/lib/firebase";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_FILE_SIZE = 500000; // 500KB in bytes
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface CreateBusinessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBusinessCreated?: (business: Business) => void;
  onBusinessUpdated?: (business: Business) => void;
  editBusiness?: Business | null;
  mode?: "create" | "edit";
}

export interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

export interface Location {
  id: string;
  name: string;
  isActive: boolean;
}

export function CreateBusinessModal({
  open,
  onOpenChange,
  onBusinessCreated,
  onBusinessUpdated,
  editBusiness,
  mode = "create",
}: CreateBusinessModalProps) {
  // define schema
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
    imageFile:
      mode === "edit"
        ? yup.mixed<FileList>().nullable()
        : yup
            .mixed<FileList>()
            .required("Image is required")
            .test("fileSize", "File size must be less than 500KB", (value) => {
              if (!value || value.length === 0) return true;
              return value[0].size <= MAX_FILE_SIZE;
            })
            .test("fileType", "Unsupported file type", (value) => {
              if (!value || value.length === 0) return true;
              return ALLOWED_FILE_TYPES.includes(value[0].type);
            }),
    socials: yup.array().of(
      yup.object({
        name: yup.string().required("Social media name is required"),
        url: yup.string().url("Invalid URL").required("URL is required"),
      })
    ),
    verified: yup.boolean().default(false),
    featured: yup.boolean().default(false),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socials, setSocials] = useState<Social[]>(editBusiness?.socials || []);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(businessSchema),
  });

  useEffect(() => {
    if (mode === "edit" && editBusiness) {
      setValue("name", editBusiness.name);
      setValue(
        "category",
        editBusiness.categoryId
          ? typeof editBusiness.categoryId === "string"
            ? editBusiness.categoryId
            : editBusiness.categoryId.id
          : ""
      );
      setValue("description", editBusiness.description);
      setValue(
        "location",
        editBusiness.locationId
          ? typeof editBusiness.locationId === "string"
            ? editBusiness.locationId
            : editBusiness.locationId.id
          : ""
      );
      setValue("email", editBusiness.email);
      setValue("phone", editBusiness.phone);
      setValue("website", editBusiness.website);
      setValue("verified", editBusiness.verified);
      setValue("featured", editBusiness.featured);
    }
  }, [mode, editBusiness, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        setIsLoadingCategories(true);
        const categoriesRef = collection(firestore, CATEGORIES_COLLECTION);
        const categoriesSnapshot = await getDocs(categoriesRef);
        const fetchedCategories = categoriesSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as Category))
          .filter((category) => category.isActive);
        setCategories(fetchedCategories);
        setIsLoadingCategories(false);

        // Fetch locations
        setIsLoadingLocations(true);
        const locationsRef = collection(firestore, "locations");
        const locationsSnapshot = await getDocs(locationsRef);
        const fetchedLocations = locationsSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as Location))
          .filter((location) => location.isActive);
        setLocations(fetchedLocations);
        setIsLoadingLocations(false);
      } catch (error) {
        // do stuff
      }
    };

    fetchData();
  }, []);

  const addSocialField = () => {
    setSocials([...socials, { name: "", url: "" }]);
  };

  const removeSocialField = (index: number) => {
    setSocials(socials.filter((_, i) => i !== index));
  };

  const updateSocialField = (
    index: number,
    field: keyof Social,
    value: string
  ) => {
    const updatedSocials = [...socials];
    updatedSocials[index] = { ...updatedSocials[index], [field]: value };
    setSocials(updatedSocials);
  };

  async function onSubmit(values: yup.InferType<typeof businessSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      let imageUrl = editBusiness?.image;
      let slug = editBusiness?.slug;

      if (values.imageFile?.[0]) {
        const imageFile = values.imageFile[0];
        const imageRef = ref(
          storage,
          `${BUSINESS_MEDIA_COLLECTION}/${Date.now()}_${imageFile.name}`
        );
        const uploadResult = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      if (mode === "create") {
        slug = values.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        const slugQuery = query(
          collection(firestore, BUSINESS_COLLECTION),
          where("slug", "==", slug)
        );
        const slugSnapshot = await getDocs(slugQuery);

        if (!slugSnapshot.empty) {
          slug = `${slug}-${Date.now()}`;
        }
      }

      const businessData = {
        name: values.name,
        description: values.description,
        categoryId: doc(firestore, CATEGORIES_COLLECTION, values.category),
        category: "",
        locationId: doc(firestore, LOCATIONS_COLLECTION, values.location),
        location: "",
        email: values.email,
        phone: values.phone,
        website: values.website,
        image: imageUrl!,
        verified: values.verified ?? false,
        featured: values.featured ?? false,
        views: editBusiness?.views ?? 0,
        socials,
        ...(mode === "create" && { slug }),
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
          slug: editBusiness.slug,
          name_lower: editBusiness.name.toLowerCase(),
          ...businessData,
        });
      } else {
        const docRef = await addDoc(
          collection(firestore, BUSINESS_COLLECTION),
          businessData
        );
        onBusinessCreated!({
          id: docRef.id,
          slug: slug!,
          name_lower: businessData.name.toLowerCase(),
          ...businessData,
        });
      }

      reset();
      onOpenChange(false);
    } catch (error: any) {
      setError(error.message || "Failed to save business. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

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
              <Select
                value={watch("location")}
                disabled={isLoading || isLoadingLocations}
                onValueChange={(value: string) => setValue("location", value)}
              >
                <SelectTrigger className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none">
                  <SelectValue
                    placeholder={
                      isLoadingLocations
                        ? "Loading locations..."
                        : "Select a location"
                    }
                  >
                    {locations &&
                      watch("location") &&
                      locations.find((loc) => loc.id === watch("location"))
                        ?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.location && (
                <span className="text-sm text-red-500">
                  {errors.location.message}
                </span>
              )}
            </div>

            {/* Category Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={watch("category")}
                disabled={isLoading || isLoadingCategories}
                onValueChange={(value: string) => setValue("category", value)}
              >
                <SelectTrigger className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none">
                  <SelectValue
                    placeholder={
                      isLoadingCategories
                        ? "Loading categories..."
                        : "Select a category"
                    }
                  >
                    {categories &&
                      watch("category") &&
                      categories.find((cat) => cat.id === watch("category"))
                        ?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <div className="mb-2 relative h-20 w-20">
                  <Image
                    src={editBusiness.image}
                    alt={`${editBusiness.name} image`}
                    fill
                    sizes="80px"
                    className="object-cover rounded-md"
                    priority
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

          {/* Social Media Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Social Media</label>
              <button
                type="button"
                onClick={addSocialField}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                + Add Social Media
              </button>
            </div>

            {socials.map((social, index) => (
              <div key={index} className="flex gap-2">
                <select
                  value={social.name}
                  onChange={(e) =>
                    updateSocialField(index, "name", e.target.value)
                  }
                  className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Platform</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                </select>

                <input
                  type="url"
                  value={social.url}
                  onChange={(e) =>
                    updateSocialField(index, "url", e.target.value)
                  }
                  placeholder="Enter URL"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => removeSocialField(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add Verified Checkbox */}
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("verified")}
                id="verified"
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="verified"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Verified Business
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("featured")}
                id="featured"
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Featured Business
              </label>
            </div>
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
