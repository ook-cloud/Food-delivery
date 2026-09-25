"use client";
import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import { Plus, X, Pencil } from "lucide-react";

export const DishGrid = () => {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [editingDish, setEditingDish] = useState(null);
  const [plus, setPlus] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [uploading, setUploading] = useState(false);

  // Authorization Header авах туслах функц
  const getAuthHeaders = () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const foodCategoryGet = async () => {
    try {
      const response = await server.get("/foodCategory/get", {
        headers: getAuthHeaders(),
      });
      setCategory(response.data.category);
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const takeFoodName = (e) => setFoodName(e.target.value);
  const takePrice = (e) => setPrice(e.target.value);
  const takeIngredients = (e) => setIngredients(e.target.value);

  const handleUploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (!res.ok) {
        console.error("Cloudinary Error Message:", data?.error?.message);
        return;
      }

      if (data.secure_url) {
        setImage(data.secure_url);
      }
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const dishesPost = async () => {
    if (!foodName || !price || !selectedCat) {
      alert("Please fill in Food Name, Price, and select a category!");
      return;
    }

    try {
      await server.post(
        "/dishes/post",
        {
          foodName: foodName,
          price: Number(price),
          image: image,
          ingredients: ingredients,
          category: selectedCat._id,
        },
        {
          headers: getAuthHeaders(), // Токен дамжуулах
        },
      );
      await foodCategoryGet();
      await dishesGet();
      plusCloser();
    } catch (err) {
      console.error("Axios Status:", err.response?.status);
      console.error("Axios Error Body:", err.response?.data);
    }
  };

  const dishesPut = async () => {
    if (!editingDish?._id) return;

    try {
      await server.put(
        `/dishes/${editingDish._id}`,
        {
          foodName: foodName,
          price: Number(price),
          image: image,
          ingredients: ingredients,
          category: selectedCat?._id || editingDish.category,
        },
        {
          headers: getAuthHeaders(), // Токен дамжуулах
        },
      );
      await dishesGet();
      plusCloser();
    } catch (err) {
      console.error("Update Status:", err.response?.status);
      console.error("Update Error:", err.response?.data);
    }
  };

  const dishDelete = async (id) => {
    const isConfirmed = confirm("Are you sure you want to delete this dish?");
    if (!isConfirmed) return;

    try {
      await server.delete(`/dishes/${id}`, {
        headers: getAuthHeaders(), // Токен дамжуулах
      });
      await dishesGet();
    } catch (err) {
      console.error("Delete Error Status:", err.response?.status);
      console.error("Delete Error Body:", err.response?.data);
    }
  };

  const dishesGet = async () => {
    try {
      const response = await server.get("/dishes/get", {
        headers: getAuthHeaders(),
      });
      setData(response.data.dishes);
    } catch (err) {
      console.error("Failed to load dishes:", err);
    }
  };

  useEffect(() => {
    dishesGet();
    foodCategoryGet();
  }, []);

  const plusHandler = (cat) => {
    setEditingDish(null);
    setSelectedCat(cat);
    setPreview("");
    setImage("");
    setFoodName("");
    setPrice("");
    setIngredients("");
    setPlus(true);
  };

  const editHandler = (dish, cat) => {
    setEditingDish(dish);
    setSelectedCat(cat);
    setFoodName(dish.foodName || "");
    setPrice(dish.price || "");
    setImage(dish.image || "");
    setPreview(dish.image || "");
    setIngredients(dish.ingredients || "");
    setPlus(true);
  };

  const plusCloser = () => {
    setPlus(false);
    setEditingDish(null);
    setSelectedCat(null);
    setPreview("");
    setImage("");
    setFoodName("");
    setPrice("");
    setIngredients("");
    setUploading(false);
  };

  if (loading) {
    return <div className="p-6">Loading Dishes...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col shrink-0 gap-4">
      {category.map((cat) => {
        const categoryDishes = data.filter(
          (dish) => dish.category === cat._id || dish.category?._id === cat._id,
        );

        return (
          <div
            key={cat._id}
            className="w-full flex flex-col rounded-xl p-5 gap-4 bg-[#FFFFFF]"
          >
            <p className="font-inter font-semibold text-[20px] text-[#09090B] leading-7">
              {cat.categoryName}
            </p>

            <div className="flex flex-wrap gap-4 w-full">
              <div className="w-67.5 h-60.25 flex flex-col gap-6 justify-center items-center border-dashed border border-[#EF4444] [stroke-dasharray:12_12] rounded-[20px]">
                <div
                  className="w-9 h-9 rounded-full bg-[#EF4444] flex items-center justify-center cursor-pointer"
                  onClick={() => plusHandler(cat)}
                >
                  <Plus className="w-4 h-4 text-[white]" />
                </div>
                <p className="font-inter font-medium text-[#18181B] text-[14px] leading-5">
                  Add new Dish to {cat.categoryName}
                </p>
              </div>

              {categoryDishes.map((dish) => {
                return (
                  <div
                    key={dish._id}
                    className="w-67.5 h-60.25 rounded-[20px] border border-solid border-[#E4E4E7] p-4 flex flex-col justify-between relative"
                  >
                    <img
                      src={dish.image}
                      alt={dish.foodName}
                      className="w-full h-32.25 rounded-xl object-cover"
                    />

                    <div
                      onClick={() => editHandler(dish, cat)}
                      className="w-11 h-11 flex justify-center items-center rounded-full bg-[#FFFFFF] absolute bottom-26 right-8 cursor-pointer shadow-md hover:bg-zinc-100 transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-[black]" />
                    </div>

                    <div
                      onClick={() => dishDelete(dish._id)}
                      className="w-5 h-5 flex justify-center items-center rounded-full bg-[#FFFFFF] absolute bottom-26 left-8 cursor-pointer shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3 text-red-500" />
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <div className="w-full flex justify-between items-center">
                        <p className="font-inter font-medium leading-5 text-[14px] text-[#EF4444] truncate">
                          {dish.foodName}
                        </p>
                        <p className="font-inter font-medium leading-4 text-[12px] text-[#09090B]">
                          ${dish.price}
                        </p>
                      </div>
                      <p className="font-inter font-normal text-[12px] text-[#09090B] leading-4 line-clamp-2">
                        {dish.ingredients}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {plus && (
        <div className="w-115 h-148 flex flex-col rounded-xl bg-[#FFFFFF] p-6 gap-6 fixed inset-0 m-auto z-100 shadow-2xl border border-[#E4E4E7]">
          <div className="h-13 w-103 flex pb-4 justify-between bg-[#FFFFFF]">
            <p className="font-inter font-semibold text-[#09090B] text-[18px] leading-7">
              {editingDish
                ? `Edit ${editingDish.foodName}`
                : `Add new Dish to ${selectedCat?.categoryName}`}
            </p>
            <div
              className="w-9 h-9 rounded-full bg-[#F4F4F5] flex justify-center items-center cursor-pointer"
              onClick={plusCloser}
            >
              <X className="w-4 h-4 text-[#18181B]" />
            </div>
          </div>
          <div className="w-103 h-15 flex gap-6">
            <div className="w-48.5 h-15 flex flex-col gap-2">
              <p className="font-inter font-medium text-[#09090B] text-[14px] leading-3.5">
                Food name
              </p>
              <input
                value={foodName}
                onChange={takeFoodName}
                type="text"
                placeholder="Type food name"
                className="w-full h-9.5 border border-[#E4E4E7] border-solid rounded-md py-2 px-3 text-[#71717A] text-[14px] leading-5 font-inter font-normal"
              />
            </div>
            <div className="w-48.5 h-15 flex flex-col gap-2">
              <p className="font-inter font-medium text-[#09090B] text-[14px] leading-3.5">
                Food price
              </p>
              <input
                value={price}
                onChange={takePrice}
                type="number"
                placeholder="Enter price..."
                className="w-full h-9.5 border border-[#E4E4E7] border-solid rounded-md py-2 px-3 text-[#71717A] text-[14px] leading-5 font-inter font-normal"
              />
            </div>
          </div>
          <div className="w-103 h-28 flex flex-col gap-2">
            <p className="font-inter font-medium text-[#09090B] text-[14px] leading-3.5">
              Ingredients
            </p>
            <textarea
              value={ingredients}
              onChange={takeIngredients}
              placeholder="List ingredients..."
              className="w-full h-22.5 border border-[#E4E4E7] border-solid rounded-md py-2 px-3 text-[#71717A] text-[14px] leading-5 font-inter font-normal flex items-start"
            />
          </div>
          <div className="w-103 h-40 flex flex-col gap-2">
            <p className="font-inter font-medium text-[#09090B] text-[14px] leading-3.5">
              Food image
            </p>
            {preview ? (
              <div className="w-full h-34.5 border border-[#E4E4E7] border-solid rounded-md relative overflow-hidden flex items-center justify-center">
                <img
                  src={preview}
                  alt="Local Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview("");
                    setImage("");
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <input
                onChange={handleUploadImage}
                type="file"
                accept="image/*"
                className="bg-[#2563EB0D] w-full h-34.5 border border-[#2563EB33] border-solid rounded-md py-2 px-3 text-[#71717A] text-[14px] leading-5 font-inter font-normal"
              />
            )}
          </div>
          <div className="flex items-end justify-end w-103 h-16">
            <button
              type="button"
              onClick={editingDish ? dishesPut : dishesPost}
              disabled={uploading}
              className="w-30.75 h-10 bg-[#18181B] disabled:opacity-50 rounded-md flex justify-center items-center font-inter font-medium text-[14px] leading-5 text-[#FAFAFA] cursor-pointer hover:bg-black transition-colors"
            >
              {uploading
                ? "Uploading..."
                : editingDish
                  ? "Save Changes"
                  : "Add Dish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
