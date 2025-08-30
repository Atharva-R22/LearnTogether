import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 rounded-lg bg-[#7685d7] p-6 text-richblack-5">
        <p className="text-xl font-semibold text-richblack-5">{modalData?.text1}</p>
        <p className="mt-3 mb-5 ">{modalData?.text2}</p>
        <div className="flex gap-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="rounded bg-richblack-200 px-4 py-2 font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
