import { useState } from "react";

const faqs = [
  {
    question: "What is Feel Share, and how does it work?",
    answer:
      "Feel Share is a platform dedicated to providing mental wellness resources, professional support, and community discussions. Users can explore resources, schedule sessions with professionals, and join support groups for guidance.",
  },
  {
    question: "Is my information kept confidential?",
    answer: "Yes, all user data and interactions are kept confidential and secure.",
  },
  {
    question: "How can I book a session with a professional?",
    answer: "You can book a session through the platform by selecting a professional and scheduling an available time slot.",
  },
  {
    question: "Can I stay anonymous in support groups?",
    answer: "Yes, users have the option to remain anonymous while participating in support group discussions.",
  },
  {
    question: "How can I become a professional on Feel Share?",
    answer: "Professionals can apply through the platform by submitting their credentials and completing a verification process.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <style>
        {`
          .faq-container {
            max-width: 100vh;;
            margin: 200px auto;
            gap: 50px;
            justfy-content: center;
          }

          .section-title {
            text-align: center;
            font-size: 50px;
            font-weight: 700;
            color: #191BA2;
            margin-bottom: 40px;
          }

          .faq-item {
            border: 1px solid #191BA2; 
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
          }

          .faq-button {
            width: 100%;
            text-align: left;
            padding: 16px;
            background-color: white; 
            font-family: 'Montserrat', sans-serif;
            font-size: 20px;
            border: 1px solid #191BA2; 
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 500;
            transition: background-color 0.3s ease;
            gap: 40px;
          }

          .faq-button:hover {
            background-color: #e5e7eb; 
          }

          .faq-answer {
            padding: 16px;
            background-color: #ffffff;
            border-top: 1px solid #e5e7eb; 
            color: grey; 
          }

          .faq-toggle {
            font-size: 35px;
          }
        `}
      </style>

      <div className="faq-container">
        <h2 className="section-title">Frequently Asked Questions (FAQs)</h2>
        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-button"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
