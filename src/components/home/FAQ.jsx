export default function FAQ() {
  const faqs = [
    {
      question: "Ứng dụng có miễn phí không?",
      answer: "Có, tất cả công cụ đều miễn phí và không quảng cáo."
    },
    {
      question: "Có thu thập dữ liệu người dùng không?",
      answer: "Không. Chúng tôi không lưu trữ hay theo dõi bất kỳ dữ liệu cá nhân nào."
    },
    {
      question: "Có cần tài khoản để sử dụng không?",
      answer: "Không cần đăng ký hoặc đăng nhập."
    },
    {
      question: "Có hỗ trợ macOS không?",
      answer: "Hiện tại chỉ hỗ trợ Windows 10/11."
    }
  ];

  return (
    <section className="bg-slate-900 py-24 px-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          Câu hỏi thường gặp
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700"
            >
              <h3 className="font-semibold">
                {faq.question}
              </h3>
              <p className="text-slate-400 mt-2 text-sm">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}