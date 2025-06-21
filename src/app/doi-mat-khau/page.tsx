"use client";

export default function ChangePasswordPage() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center pt-16">
      <form
        className="w-[500px] bg-white rounded-md shadow-lg p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center gap-4 mb-4">
          <label className="w-[120px]">Mật khẩu cũ: </label>
          <input
            type="password"
            className="grow bg-slate-100 py-2 px-4 rounded-md "
            name="password"
            id=""
          />
        </div>
        <div className="flex justify-between items-center gap-4 mb-4">
          <label className="w-[120px]">Mật khẩu mới: </label>
          <input
            type="password"
            className="grow bg-slate-100 py-2 px-4 rounded-md "
            name="newPassword"
            id=""
          />
        </div>

        <div className="flex justify-center">
          <button className="py-2 px-4 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
}
