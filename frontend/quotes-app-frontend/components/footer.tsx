"use client";

import React from "react";
import Image from "next/image";
import logoQuotes from "../public/logoQuote.png";
import AddQuoteForm from "./AddQuoteForm";

const Footer: React.FC = () => {
  return (
    <footer className=" py-6 mt-5 flex flex-col  items-center bg-[#f4f1eb] text-gray-800">
      <div className="flex gap-4  items-center justify-between w-full max-w-6xl px-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col justify-center items-center space-y-4 text-center">
          <svg
            className="animate-bounce mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 512 512"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <path
              fill="#000"
              d="M256 16C123.452 16 16 123.452 16 256s107.452 240 240 240s240-107.452 240-240S388.548 16 256 16m147.078 387.078a207.253 207.253 0 1 1 44.589-66.125a207.3 207.3 0 0 1-44.589 66.125"
            />
            <path
              fill="#000"
              d="m142.319 241.027l22.628 22.627L240 188.602V376h32V188.602l75.053 75.052l22.628-22.627L256 127.347z"
            />
          </svg>
          <Image
            width={129}
            height={70}
            src={logoQuotes.src}
            alt="Quotes App Logo"
            className="h-20 w-auto"
          />
          <div>
            <div className="pb-4">
              <p className="font-sans font-bold pt-2">Stay in touch</p>
              <div className="flex space-x-4 justify-center mt-4">
                <a
                  href="https://github.com/Preeyapornn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.facebook.com/Benz.peeyapornpetcharat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/preeyaporn-petcharat-038908292"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <AddQuoteForm />
      </div>
      <div>
        <p className="text-gray-600 text-sm my-4">
          &copy; {new Date().getFullYear()} Quotes App. All rights reserved.
        </p>
        <p className="text-gray-600 text-sm">Made by Preeyaporn Petcharat</p>
      </div>
    </footer>
  );
};

export default Footer;
