import SEO from "../components/shared/SEO";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service - MediaTools"
        description="Điều khoản sử dụng MediaTools."
      />

      <section className="bg-slate-950 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-8">

          <h1 className="text-4xl font-bold">
            Điều khoản sử dụng
          </h1>

          <p className="text-slate-400">
            Khi sử dụng MediaTools, bạn đồng ý với các điều khoản sau:
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              1. Sử dụng hợp pháp
            </h2>
            <p className="text-slate-400">
              Người dùng phải tuân thủ luật pháp địa phương khi sử dụng công cụ.
              Chúng tôi không chịu trách nhiệm cho hành vi vi phạm pháp luật.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              2. Miễn trừ trách nhiệm
            </h2>
            <p className="text-slate-400">
              Phần mềm được cung cấp "nguyên trạng" mà không có bảo đảm dưới bất kỳ hình thức nào.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Thay đổi điều khoản
            </h2>
            <p className="text-slate-400">
              Chúng tôi có thể cập nhật điều khoản theo thời gian.
              Người dùng nên kiểm tra định kỳ.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}