import { useState } from "react" // Import useState
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { addCategoryDetails } from "../services/operations/courseDetailsAPI"
import IconBtn from "../components/common/IconBtn"

function IndexCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)

  // Handle form submission
  const onSubmit = async (data) => {
    const formData = {
      name: data.categoryName,
      description: data.categoryDescription,
    }

    setLoading(true)
    const result = await addCategoryDetails(formData, token)
    setLoading(false)

    if (result?.success) {
      toast.success("Category created successfully")
      // dispatch(setStep(2)) // Redirect or reset form step as needed
    } else {
      toast.error(result?.message || "Failed to create category")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-gray-700 bg-[#ee4949] p-6"
    >
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Category
          </h1>
      {/* Category Name */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-[#f8f9f9]" htmlFor="categoryName">
          Category Name <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="categoryName"
          placeholder="Enter Category Name"
          {...register("categoryName", { required: true })}
          className="form-style w-full"
        />
        {errors.categoryName && (
          <span className="ml-2 text-xs text-pink-200">
            Category name is required
          </span>
        )}
      </div>

      {/* Category Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-[#f8f9f9]" htmlFor="categoryDescription">
          Category Description
        </label>
        <textarea
          id="categoryDescription"
          placeholder="Enter Category Description"
          {...register("categoryDescription")}
          className="form-style resize-y min-h-[80px] w-full"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <IconBtn
          disabled={loading}
          text={loading ? "Creating..." : "Create Category"} // Change button text when loading
        />
      </div>
    </form>
  )
}
export default IndexCategory;