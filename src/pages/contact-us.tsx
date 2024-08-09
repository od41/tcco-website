import Image from "next/image";
import ContactForm from "../components/containers/contact-form";
import Footer from "@/components/ui/footer";
import Head from "next/head";
import { FadeIn } from "@/components/ui/fade-in";

const visionCollage = require("@/assets/contact-us-photo.png");

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>Contact Us | TC Co. - Connecting African Communities</title>
      </Head>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="container lg:px-40 flex flex-col lg:flex-row items-start justify-center mt-32 pb-20">
          <div className="">
            <FadeIn direction="down" initialDelay={0.7} once>
              <div className="lg:p-5 mb-10">
                <h1 className="text-3xl font-display mb-8">Connect</h1>
                <p className="text-lg mb-8">Be part of a thriving community</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary text-background rounded-full p-2">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 14.2767V17.8127C18.0001 18.0659 17.9042 18.3097 17.7316 18.4949C17.559 18.6801 17.3226 18.793 17.07 18.8107C16.633 18.8407 16.276 18.8567 16 18.8567C7.163 18.8567 0 11.6937 0 2.85669C0 2.58069 0.015 2.22369 0.046 1.78669C0.0637224 1.53413 0.176581 1.2977 0.361804 1.1251C0.547026 0.952496 0.790823 0.856575 1.044 0.85669H4.58C4.70404 0.856564 4.8237 0.902548 4.91573 0.98571C5.00776 1.06887 5.0656 1.18327 5.078 1.30669C5.101 1.53669 5.122 1.71969 5.142 1.85869C5.34073 3.24561 5.748 4.59452 6.35 5.85969C6.445 6.05969 6.383 6.29869 6.203 6.42669L4.045 7.96869C5.36445 11.0431 7.81455 13.4932 10.889 14.8127L12.429 12.6587C12.4919 12.5707 12.5838 12.5076 12.6885 12.4803C12.7932 12.4531 12.9042 12.4635 13.002 12.5097C14.267 13.1106 15.6156 13.5168 17.002 13.7147C17.141 13.7347 17.324 13.7567 17.552 13.7787C17.6752 13.7913 17.7894 13.8493 17.8724 13.9413C17.9553 14.0333 18.0012 14.1528 18.001 14.2767H18Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  080 000 000
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary text-background rounded-full p-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 0.856689H19C19.2652 0.856689 19.5196 0.962046 19.7071 1.14958C19.8946 1.33712 20 1.59147 20 1.85669V17.8567C20 18.1219 19.8946 18.3763 19.7071 18.5638C19.5196 18.7513 19.2652 18.8567 19 18.8567H1C0.734784 18.8567 0.48043 18.7513 0.292893 18.5638C0.105357 18.3763 0 18.1219 0 17.8567V1.85669C0 1.59147 0.105357 1.33712 0.292893 1.14958C0.48043 0.962046 0.734784 0.856689 1 0.856689ZM10.06 9.53969L3.648 4.09469L2.353 5.61869L10.073 12.1737L17.654 5.61369L16.346 4.10069L10.061 9.53969H10.06Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  info@jointcco.com
                </div>
              </div>
            </FadeIn>
            <FadeIn initialDelay={0.9} once>
              <div className="w-full h-[350px] aspect-square relative hidden lg:block">
                <Image
                  src={visionCollage.default.src}
                  alt="TC Co. - connecting people photo"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </FadeIn>
          </div>
          <FadeIn className=" w-full" initialDelay={1} once>
            <ContactForm />
          </FadeIn>
        </section>
        <div className="w-full h-[100vw] lg:h-[350px] aspect-square relative block lg:hidden">
          <Image
            src={visionCollage.default.src}
            alt="TC Co. - connecting people photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </main>
      <Footer isMini />
    </>
  );
}
