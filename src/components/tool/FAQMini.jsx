import { useState } from "react";

export default function FAQMini({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-slate-950 py-24 px-6 text-white">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold mb-16 text-center">
          Câu hỏi thường gặp
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full text-left px-6 py-4 font-medium flex justify-between items-center"
              >
                {faq.question}
                <span>
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-slate-400 text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}