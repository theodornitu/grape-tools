import React, { useState } from 'react';

export default function Faq() {
  const [active, setActive] = useState({
    activeIndex: 0,
    status: false
  });

  const QA = [
    { question: 'What is grape-tools?', answer: 'Grape-tools is a tool that generates images based on input text. It also offers the possibility to mint the images as non-fungible tokens (NFTs) on the MultiversX (formerly Elrond) blockchain.' },
    { question: 'How does it work?', answer: 'Grape-tools generates images from your provided caption text using the DALL-E API and presents the result to you. The generated image can be saved and you can pay for this service using credits or cryptocurrency like EGLD without the need for a credit card or bank statement.' },
    { question: 'How much does it cost? ', answer: 'Each new valid MultiversX wallet holder is entitled to 15 free image generations, which can be used without incurring any cost. After using the 15 credits, each subsequent image generation will cost 0.2$ worth of EGLD. Additionally, an option to purchase bulk credits will be available in the future.' },
    { question: 'Is there a roadmap?', answer: "Once the beta phase of Grape-tools is complete (on February 1st), a roadmap for the tool's future developments will be shared. Some planned features include the option to purchase bulk credits, the ability to generate a collection of NFTs using only text input, integration of other AI models, premium AI-assisted image generation, image and NFT transformation, and more." },
  ]

  return (
    <>
      <div className="mx-auto text-center px-4 mt-12 text-4xl text-violet-600 font-semibold">
        Frequently Asked Questions
      </div>
      <div className="container mb-28 ">
        <div className="mt-8 mx-auto max-w-screen-sm lg:max-w-screen-lg flex flex-col lg:flex-row lg:flex-wrap">
          <div className="lg:w-9/12 px-4 mx-auto">
            {QA.map((data:any , i: any) => {
              return (
                <div 
                  key={i}
                  className={`cursor-pointer transition-all duration-150 flex flex-col items-center ease-linear ${i + 1 === QA.length ? "" : "border-b"}  px-6 py-6`} 
                  onClick={() => {
                    setActive({
                      activeIndex: i,
                      status: i === active.activeIndex ? !active.status : true
                    });
                  }}
                  >
                  <div className="flex items-center justify-between w-full">
                    <div className="text-slate-700 font-semibold text-lg">
                      {data.question}
                    </div>
                    <div>
                      <svg
                        fill="currentColor"
                        className={`${active.status && i === active.activeIndex ? 'hidden' : ''} question-chevron group-hover:bg-gray-500 h-5 block text-violet-600 bg-gray-100 rounded-full p-1`}
                        viewBox="0 0 20 20"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <g
                          stroke="currentColor"
                          strokeWidth={1}
                          fill="currentColor"
                          fillRule="evenodd"
                        >
                          <g>
                            <polygon points="9.29289322 12.9497475 10 13.6568542 15.6568542 8 14.2426407 6.58578644 10 10.8284271 5.75735931 6.58578644 4.34314575 8" />
                          </g>
                        </g>
                      </svg>
                      <svg
                        fill="currentColor"
                        className={`${active.status && i === active.activeIndex ? '' : 'hidden'} question-chevron group-hover:bg-gray-500 h-5 block text-violet-800 bg-violet-200 rounded-full p-1`}
                        viewBox="0 0 20 20"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <g
                          stroke="currentColor"
                          strokeWidth={1}
                          fill="currentColor"
                          fillRule="evenodd"
                        >
                          <g>
                            <polygon points="10.7071068 7.05025253 10 6.34314575 4.34314575 12 5.75735931 13.4142136 10 9.17157288 14.2426407 13.4142136 15.6568542 12" />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className={`${active.status && i === active.activeIndex ? 'opacity-1 mt-4' : 'opacity-0 h-0'} duration-150 ease-linear text-slate-600 w-full`}>
                    {data.answer}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}