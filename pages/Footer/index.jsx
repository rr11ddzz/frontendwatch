import { styles } from "../../util/style.js";

const Footer = () => {

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "Login",
          link: "/auth",
        },
        {
          name: "Women",
          link: "/women",
        },
        {
          name: "Contact Us",
          link: "/contact",
        }
      ],
    },
    {
      title: "Follow US",
      links: [
        {
          name: "Twitter",
          link: "https://twitter.com",
          url: "/LandingPage/x.png"
        },
        {
          name: "Instagram",
          link: "https://instagram.com",
          url: "/LandingPage/instagram.png"
        },
        {
          name: "Tiktok",
          link: "https://tiktok.com",
          url: "/LandingPage/tiktok.png"
        }
      ],
    }
  ];

  return (
    <div className={`tw-bg-black ${styles.paddingX} ${styles.flexCenter} mt-5`}>
      <div className={`${styles.boxWidth}`}>
        <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
          <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
            <div className="flex-[0.5] flex flex-col justify-start align-items-center ">
              <img src={"/logo.png"} alt="Timeless Archives" className="w-[150px] " />
            </div>

            <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
              <div className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
                <h4 className=" font-medium text-[18px] leading-[27px] text-white">
                  {"Support"}
                </h4>
                <div className="mt-1">
                  <p>118 Cavendish street, London, Lakeside Parlour Apartments, 224 , Westminster, Uk</p>
                  <p>TimelessArchives@gmail.com</p>
                  <p>+44 7728015227</p>
                </div>
              </div>
              {footerLinks.map((footerlink) => (
                <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
                  <h4 className=" font-medium text-[18px] leading-[27px] text-white">
                    {footerlink.title}
                  </h4>
                  <ul className="list-none mt-4">
                    {footerlink.links.map((link, index) => (
                      <a
                        style={{ display: "flex",gap:"10px",alignItems:"center" }}
                        key={index}
                        href={link.link}
                        className={` font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                          }`}
                      >
                        {link.url &&
                          <>
                            <img src={link.url} alt={link.name} width={20} height={20} /></>
                        }
                        {link.name}
                      </a>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
            <p className=" font-normal text-center text-[18px] leading-[27px] text-white">
              Copyright Ⓒ 2024 Timeless Archives. All Rights Reserved.
            </p>

          </div>
        </section>
      </div>
    </div>)
};

export default Footer;
