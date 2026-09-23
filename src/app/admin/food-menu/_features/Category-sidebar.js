"use client";
import { server } from "@/app/_api/api";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";

export const CategorySideBar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plus, setPlus] = useState(false);
  const [plusEvent, setPlusEvent] = useState("");
  const [deleteCategory, setDeleteCategory] = useState(false);

  function showToast() {
    const id = toast.add({
      type: "info",
      title: `${plusEvent} is being added to the menu`,
      actionProps: {
        onClick() {
          toast.close(id);
        },
      },
    });
  }

  const handlerDeleteCategoryTrue = () => setDeleteCategory(true);
  const handlerDeleteCategoryFalse = () => setDeleteCategory(false);

  const eventTakerPlus = (e) => {
    setPlusEvent(e.target.value);
  };

  const handlerPlus = () => setPlus(true);
  const handlerPlusCloser = () => {
    setPlus(false);
    setPlusEvent("");
  };

  const foodCategoryGet = async () => {
    try {
      const response = await server.get("/foodCategory/get");
      setData(response.data.category);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    foodCategoryGet();
  }, []);

  const foodCategoryPost = async () => {
    try {
      await server.post("/foodCategory/post", {
        categoryName: plusEvent,
      });
      await foodCategoryGet();
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmitCategory = async () => {
    if (!plusEvent.trim()) return;
    showToast();
    await foodCategoryPost();
    handlerPlusCloser();
  };

  const foodCategoryPostDelete = async (id) => {
    try {
      await server.delete("/foodCategory/delete", {
        data: { id: id },
      });
      await foodCategoryGet();
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);
  if (loading) {
    return <div className="p-6">Loading categories...</div>;
  }

  return (
    <div className="w-full mt-15 flex-col gap-4 py-6 px-6 min-h-59 flex bg-[#FFFFFF] rounded-xl">
      <p className="font-inter font-semibold text-[#09090B] text-[20px] leading-7">
        Dishes category
      </p>

      <div className="w-full flex flex-wrap gap-3">
        <div className="h-9 flex rounded-full py-2 px-4 gap-2 border border-solid border-[#E4E4E7] cursor-pointer">
          <p className="font-inter font-medium text-[#18181B] text-[14px] leading-5">
            All Dishes
          </p>
          <div className="h-5 rounded-full bg-[#18181B] py-0.5 px-2.5 font-inter font-semibold text-[12px] leading-4 text-[#FAFAFA]">
            {data.length}
          </div>
        </div>

        {data.map((cat) => (
          <div
            key={cat._id}
            className="h-9 flex rounded-full py-2 px-4 gap-2 border border-solid border-[#E4E4E7] cursor-pointer"
          >
            <div
              className="w-5 h-5 rounded-full bg-[#F4F4F5] flex justify-center items-center cursor-pointer"
              onClick={handlerDeleteCategoryTrue}
            >
              <X className="w-2 h-2" />
            </div>

            {deleteCategory && (
              <div className="w-115 h-30 flex flex-col rounded-xl bg-[#FFFFFF] p-6 gap-3 fixed inset-0 m-auto z-50 items-center">
                <p className="font-inter font-semibold text-[18px] leading-7 text-[#09090B]">
                  Are you sure of delete this category
                </p>
                <div className="flex gap-2">
                  <Button
                    className="text-[red]"
                    onClick={(e) => {
                      e.preventDefault();
                      foodCategoryPostDelete(cat._id);
                      handlerDeleteCategoryFalse();
                    }}
                  >
                    Yes
                  </Button>
                  <Button onClick={handlerDeleteCategoryFalse}>No</Button>
                </div>
              </div>
            )}

            <p className="font-inter font-medium text-[#18181B] text-[14px] leading-5">
              {cat.categoryName}
            </p>
            <div className="h-5 rounded-full bg-[#18181B] py-0.5 px-2.5 font-inter font-semibold text-[12px] leading-4 text-[#FAFAFA]">
              {cat.dishesCount}
            </div>
          </div>
        ))}

        <div
          className="w-9 h-9 bg-[#EF4444] rounded-full flex justify-center items-center cursor-pointer"
          onClick={handlerPlus}
        >
          <Plus className="w-4 h-4 text-[white]" />
        </div>

        {plus && (
          <div className="w-115 h-68 flex flex-col rounded-xl bg-[#FFFFFF] p-6 gap-6 fixed inset-0 m-auto z-50">
            <div className="h-13 w-103 flex pb-4 justify-between bg-[#FFFFFF]">
              <p className="font-inter font-semibold text-[#09090B] text-[18px] leading-7">
                Add new category
              </p>
              <div
                className="w-9 h-9 rounded-full bg-[#F4F4F5] flex justify-center items-center cursor-pointer"
                onClick={handlerPlusCloser}
              >
                <X className="w-4 h-4" />
              </div>
            </div>

            <div className="flex flex-col gap-6 w-103 h-15">
              <p className="font-inter font-medium leading-3.5 text-[14px] text-[#09090B]">
                Category name
              </p>
              <input
                autoFocus
                value={plusEvent}
                onChange={eventTakerPlus}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmitCategory();
                  }
                }}
                className="w-103 h-9.5 flex border border-solid border-[#E4E4E7] px-3 py-2 font-inter font-normal text-[#71717A] text-[14px] leading-5"
                placeholder="Type category name..."
              />
            </div>

            <div className="flex items-end justify-end w-103 h-16">
              <button
                type="button"
                onClick={handleSubmitCategory}
                className="w-30.75 h-10 bg-[#18181B] rounded-md flex justify-center items-center font-inter font-medium text-[14px] leading-5 text-[#FAFAFA] cursor-pointer hover:bg-black transition-colors"
              >
                Add category
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
