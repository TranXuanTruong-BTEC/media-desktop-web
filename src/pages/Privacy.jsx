import SEO from "../components/shared/SEO";

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy - MediaTools"
        description="Chính sách bảo mật của MediaTools."
      />

      <section className="bg-slate-950 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-8">

          <h1 className="text-4xl font-bold">
            Chính sách bảo mật
          </h1>

          <p className="text-slate-400">
            MediaTools cam kết bảo vệ quyền riêng tư của người dùng.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              1. Thu thập dữ liệu
            </h2>
            <p className="text-slate-400">
              Chúng tôi không thu thập, lưu trữ hoặc chia sẻ dữ liệu cá nhân.
              Ứng dụng hoạt động hoàn toàn offline trên máy người dùng.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              2. Cookies
            </h2>
            <p className="text-slate-400">
              Website có thể sử dụng cookies cơ bản để cải thiện trải nghiệm,
              nhưng không theo dõi thông tin cá nhân.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Liên hệ
            </h2>
            <p className="text-slate-400">
              Nếu có câu hỏi về chính sách bảo mật, vui lòng liên hệ:
              support@mediatools.dev
            </p>
          </div>

        </div>
      </section>
    </>
  );
}