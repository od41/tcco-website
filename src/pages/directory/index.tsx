import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const ArtIcon = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M46.6667 32C45.6058 32 44.5884 31.5786 43.8382 30.8284C43.0881 30.0783 42.6667 29.0609 42.6667 28C42.6667 26.9391 43.0881 25.9217 43.8382 25.1716C44.5884 24.4214 45.6058 24 46.6667 24C47.7275 24 48.7449 24.4214 49.4951 25.1716C50.2452 25.9217 50.6667 26.9391 50.6667 28C50.6667 29.0609 50.2452 30.0783 49.4951 30.8284C48.7449 31.5786 47.7275 32 46.6667 32ZM38.6667 21.3333C37.6058 21.3333 36.5884 20.9119 35.8382 20.1618C35.0881 19.4116 34.6667 18.3942 34.6667 17.3333C34.6667 16.2725 35.0881 15.2551 35.8382 14.5049C36.5884 13.7548 37.6058 13.3333 38.6667 13.3333C39.7275 13.3333 40.7449 13.7548 41.4951 14.5049C42.2452 15.2551 42.6667 16.2725 42.6667 17.3333C42.6667 18.3942 42.2452 19.4116 41.4951 20.1618C40.7449 20.9119 39.7275 21.3333 38.6667 21.3333ZM25.3333 21.3333C24.2725 21.3333 23.2551 20.9119 22.5049 20.1618C21.7548 19.4116 21.3333 18.3942 21.3333 17.3333C21.3333 16.2725 21.7548 15.2551 22.5049 14.5049C23.2551 13.7548 24.2725 13.3333 25.3333 13.3333C26.3942 13.3333 27.4116 13.7548 28.1618 14.5049C28.9119 15.2551 29.3333 16.2725 29.3333 17.3333C29.3333 18.3942 28.9119 19.4116 28.1618 20.1618C27.4116 20.9119 26.3942 21.3333 25.3333 21.3333ZM17.3333 32C16.2725 32 15.2551 31.5786 14.5049 30.8284C13.7548 30.0783 13.3333 29.0609 13.3333 28C13.3333 26.9391 13.7548 25.9217 14.5049 25.1716C15.2551 24.4214 16.2725 24 17.3333 24C18.3942 24 19.4116 24.4214 20.1618 25.1716C20.9119 25.9217 21.3333 26.9391 21.3333 28C21.3333 29.0609 20.9119 30.0783 20.1618 30.8284C19.4116 31.5786 18.3942 32 17.3333 32ZM32 8C25.6348 8 19.5303 10.5286 15.0294 15.0294C10.5286 19.5303 8 25.6348 8 32C8 38.3652 10.5286 44.4697 15.0294 48.9706C19.5303 53.4714 25.6348 56 32 56C33.0609 56 34.0783 55.5786 34.8284 54.8284C35.5786 54.0783 36 53.0609 36 52C36 50.96 35.6 50.0267 34.96 49.3333C34.3467 48.6133 33.9467 47.68 33.9467 46.6667C33.9467 45.6058 34.3681 44.5884 35.1182 43.8382C35.8684 43.0881 36.8858 42.6667 37.9467 42.6667H42.6667C46.2029 42.6667 49.5943 41.2619 52.0948 38.7614C54.5952 36.2609 56 32.8696 56 29.3333C56 17.5467 45.2533 8 32 8Z"
        fill="black"
      />
    </svg>
  );
};

const AutoIcon = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.9395 36H46.0195C47.0795 36 47.9395 35.14 47.9395 34.08V25.92C47.9395 25.4108 47.7372 24.9224 47.3772 24.5624C47.0171 24.2023 46.5287 24 46.0195 24H37.9395C37.6874 24 37.4377 24.0497 37.2048 24.1462C36.9718 24.2426 36.7602 24.3841 36.5819 24.5624C36.4036 24.7406 36.2622 24.9523 36.1657 25.1852C36.0692 25.4182 36.0195 25.6679 36.0195 25.92V34.08C36.0195 35.14 36.8795 36 37.9395 36Z"
        fill="black"
      />
      <path
        d="M29.96 18H29.884C27.1 18.106 24.566 19.594 23.044 21.856L22.35 22.868L22.338 22.888L14.912 34H9.76C8.11312 33.9966 6.50785 34.5172 5.17644 35.4865C3.84504 36.4559 2.85656 37.8237 2.354 39.392C2.32454 39.4842 2.30181 39.5785 2.286 39.674C2.06 40.474 2 41.314 2 42.54V49.22C1.99921 49.8479 2.12231 50.4699 2.36225 51.0502C2.60219 51.6305 2.95425 52.1577 3.39827 52.6017C3.84229 53.0458 4.36955 53.3978 4.94984 53.6378C5.53014 53.8777 6.15206 54.0008 6.78 54H10.714C11.2814 55.1976 12.1771 56.2096 13.2969 56.9182C14.4168 57.6269 15.7148 58.003 17.04 58.003C18.3652 58.003 19.6632 57.6269 20.7831 56.9182C21.9029 56.2096 22.7986 55.1976 23.366 54H40.674C41.2414 55.1976 42.1371 56.2096 43.2569 56.9182C44.3768 57.6269 45.6748 58.003 47 58.003C48.3252 58.003 49.6232 57.6269 50.7431 56.9182C51.8629 56.2096 52.7586 55.1976 53.326 54H57.22C57.848 54.0008 58.4699 53.8777 59.0502 53.6378C59.6305 53.3978 60.1577 53.0458 60.6017 52.6017C61.0458 52.1577 61.3978 51.6305 61.6378 51.0502C61.8777 50.4699 62.0008 49.8479 62 49.22V39.02C61.9986 37.8861 61.8935 36.7547 61.686 35.64C61.6705 35.552 61.6491 35.4651 61.622 35.38C61.4355 34.3878 61.1659 33.413 60.816 32.466L57.54 23.74C57.4838 23.5835 57.4211 23.4293 57.352 23.278C56.6642 21.7095 55.5347 20.3752 54.1013 19.438C52.6679 18.5007 50.9926 18.0011 49.28 18H29.96ZM58 48H53.326C52.7586 46.8024 51.8629 45.7904 50.7431 45.0818C49.6232 44.3731 48.3252 43.997 47 43.997C45.6748 43.997 44.3768 44.3731 43.2569 45.0818C42.1371 45.7904 41.2414 46.8024 40.674 48H23.366C22.7986 46.8024 21.9029 45.7904 20.7831 45.0818C19.6632 44.3731 18.3652 43.997 17.04 43.997C15.7148 43.997 14.4168 44.3731 13.2969 45.0818C12.1771 45.7904 11.2814 46.8024 10.714 48H6V46C7.09 45.99 7.98 45.094 7.98 44V42C7.98 41.044 7.3 40.238 6.398 40.044C6.71674 39.4275 7.19906 38.9106 7.7921 38.5501C8.38513 38.1895 9.06597 37.9992 9.76 38H15.96C16.2487 38.0003 16.5341 37.938 16.7965 37.8175C17.0589 37.697 17.292 37.5212 17.48 37.302L17.568 37.196C17.6204 37.1356 17.6692 37.0722 17.714 37.006L18.386 36H30.06C31.12 36 31.98 35.14 31.98 34.08V25.92C31.98 25.6679 31.9303 25.4182 31.8339 25.1852C31.7374 24.9523 31.5959 24.7406 31.4177 24.5624C31.2394 24.3841 31.0277 24.2426 30.7948 24.1462C30.5618 24.0497 30.3121 24 30.06 24H26.426C26.8312 23.4175 27.3634 22.9348 27.9826 22.5883C28.6018 22.2418 29.2916 22.0406 30 22H49.278C50.0702 22.0008 50.85 22.1969 51.5484 22.5708C52.2467 22.9448 52.8422 23.4851 53.282 24.144C52.8938 24.2984 52.5604 24.5651 52.3245 24.9099C52.0887 25.2548 51.9611 25.6622 51.958 26.08V34.08C51.958 35.14 52.818 36 53.878 36H57.666L57.716 36.272C57.7319 36.3668 57.7546 36.4604 57.784 36.552C57.924 37.36 57.998 38.192 57.998 39.02V40.164C57.3849 40.3751 56.8567 40.7792 56.4926 41.3157C56.1284 41.8522 55.9479 42.4923 55.978 43.14C56.038 44.384 56.878 45.404 57.998 45.81L58 48ZM17 54C16.2044 54 15.4413 53.6839 14.8787 53.1213C14.3161 52.5587 14 51.7957 14 51C14 50.2043 14.3161 49.4413 14.8787 48.8787C15.4413 48.3161 16.2044 48 17 48C17.7957 48 18.5587 48.3161 19.1213 48.8787C19.6839 49.4413 20 50.2043 20 51C20 51.7957 19.6839 52.5587 19.1213 53.1213C18.5587 53.6839 17.7957 54 17 54ZM47 54C46.2044 54 45.4413 53.6839 44.8787 53.1213C44.3161 52.5587 44 51.7957 44 51C44 50.2043 44.3161 49.4413 44.8787 48.8787C45.4413 48.3161 46.2044 48 47 48C47.7957 48 48.5587 48.3161 49.1213 48.8787C49.6839 49.4413 50 50.2043 50 51C50 51.7957 49.6839 52.5587 49.1213 53.1213C48.5587 53.6839 47.7957 54 47 54Z"
        fill="black"
      />
    </svg>
  );
};

const FoodIcon = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.12 46H39.44C41.12 46 42.5 44.7 42.7 43.06L46 10.1H36V2H32.06V10.1H22.12L22.72 14.78C26.14 15.72 29.34 17.42 31.26 19.3C34.14 22.14 36.12 25.08 36.12 29.88V46ZM2 44V42H32.06V44C32.06 45.08 31.16 46 30 46H4C2.9 46 2 45.08 2 44ZM32.06 30C32.06 14 2 14 2 30H32.06ZM2 34H32V38H2V34Z"
        fill="black"
      />
    </svg>
  );
};

const LifestyleIcon = () => {
  return (
    <svg
      width="63"
      height="54"
      viewBox="0 0 63 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.1658 2.15234C34.6955 3.0793 35.0928 4.07248 35.2914 5.19807C43.7665 6.32367 50.6525 12.68 52.5064 20.8902C53.4334 20.4267 54.2941 19.9632 55.1549 19.4335C52.6388 9.9653 44.2962 2.81446 34.1658 2.15234ZM37.2116 45.4547C35.7549 45.7857 34.1658 45.9843 32.5768 45.9843C21.2546 45.9843 12.1174 36.781 12.1174 25.4588C12.1174 24.8629 12.1174 24.267 12.1836 23.6711L9.73379 20.5591C9.40274 22.1482 9.2041 23.7373 9.2041 25.3926C9.2041 38.3038 19.7317 48.8314 32.5768 48.8314C34.6293 48.8314 36.6819 48.5666 38.5358 48.0369C38.5358 47.9045 38.602 47.7058 38.602 47.5734C38.2709 46.9775 37.8075 46.2492 37.2116 45.4547Z"
        fill="black"
      />
      <path
        d="M62.8346 19.6322C62.7684 18.5066 61.4441 17.9769 60.6496 18.7714C54.1609 25.3926 44.0967 25.194 43.4346 32.1462C43.3022 33.669 43.8319 35.1919 44.8251 36.4499C49.5923 31.6827 54.6906 30.0274 54.9554 29.9612C55.0216 29.9612 55.0878 29.9612 55.1541 29.895C53.8298 30.6233 46.1493 35.3905 42.7063 44.0642C40.9848 41.3496 38.2039 37.9728 35.9527 36.1188C34.4299 34.7284 33.1056 33.8677 32.7084 33.6028C32.7746 33.6028 32.7746 33.6028 32.8408 33.6028C33.0394 33.669 36.9459 34.596 40.3227 38.1714C40.9848 37.3107 41.1834 36.5823 41.1172 35.5229C40.72 30.5571 33.4367 30.4909 28.8019 25.5912C28.2722 24.9953 27.279 25.3264 27.2128 26.1871C26.8818 30.7557 27.279 38.5025 30.5234 40.7537C32.3111 42.0117 35.092 41.813 37.277 40.8861C39.1309 43.0711 40.9848 45.5871 41.7793 47.2424C41.3821 48.7652 41.1834 50.4205 41.1834 52.2082C41.1834 52.8704 41.7131 53.4 42.3752 53.4C43.0374 53.4 43.567 52.8704 43.567 52.2082C43.6333 46.9113 45.752 42.6076 48.2681 39.3632C51.3138 41.0185 55.2203 41.482 57.8687 39.6943C62.3049 36.6485 63.1656 25.9223 62.8346 19.6322Z"
        fill="black"
      />
      <path
        d="M32.5098 5.9926C32.1788 4.00625 31.0532 2.21854 29.3317 1.09295C26.286 -0.893397 22.0484 -0.0988582 19.6648 2.88066L18.8703 3.87383C18.8041 3.94004 18.7379 4.00625 18.6054 4.00625C18.473 4.00625 18.4068 3.94004 18.3406 3.87383L17.3474 2.68202C16.0894 1.09295 14.2355 0.165988 12.2491 0.0335645C10.1966 -0.0988584 8.27644 0.629468 6.81978 2.01991C4.89965 3.74141 4.30375 6.45608 4.96586 8.97211H1.05938C0.46348 8.97211 0 9.43559 0 10.0315C0 10.6274 0.46348 11.0909 1.05938 11.0909H10.3952L12.4478 7.64788C12.6464 7.25062 13.0437 7.05198 13.5071 7.05198C13.9044 7.05198 14.3017 7.25062 14.5665 7.64788L18.3406 14.0042L19.731 11.6868C19.9297 11.3557 20.3269 11.0909 20.7904 11.0909H23.8361C24.4982 11.0909 25.0279 11.6206 25.0279 12.2827C25.0279 12.9448 24.4982 13.4745 23.8361 13.4745H21.4525L19.4 16.9175C19.2013 17.2486 18.8041 17.5134 18.3406 17.5134C17.9433 17.5134 17.546 17.3148 17.2812 16.9175L13.5071 10.5612L12.1167 12.8786C11.9181 13.2097 11.5208 13.4745 11.0573 13.4745H7.74674L16.4204 24.3332C16.9501 24.9953 17.7447 25.3926 18.5392 25.3926C19.4 25.3926 20.1945 24.9953 20.658 24.3332L30.9208 11.4882C32.3112 9.96529 32.8409 7.97894 32.5098 5.9926Z"
        fill="black"
      />
    </svg>
  );
};

const TravelIcon = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.8502 42.25L14.9002 33.05L5.7002 28.1L9.2502 24.6L16.5002 25.85L21.6002 20.75L5.7502 14L9.9502 9.7L29.2002 13.1L35.4002 6.9C36.1669 6.13333 37.1169 5.75 38.2502 5.75C39.3835 5.75 40.3335 6.13333 41.1002 6.9C41.8669 7.66667 42.2502 8.608 42.2502 9.724C42.2502 10.84 41.8669 11.782 41.1002 12.55L34.8502 18.8L38.2502 38L34.0002 42.25L27.2002 26.4L22.1002 31.5L23.4002 38.7L19.8502 42.25Z"
        fill="black"
      />
    </svg>
  );
};

const BeautyIcon = () => {
  return (
    <svg
      width="65"
      height="40"
      viewBox="0 0 65 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M64.5461 24.034C64.4421 23.6407 64.2384 23.2808 63.9548 22.9892C63.6712 22.6975 63.3172 22.4839 62.9269 22.3689L46.288 17.5231C45.7509 17.3665 45.1938 17.2891 44.6344 17.2934H18.5908C18.3146 16.8709 2.75285 21.9054 1.96335 22.0589C1.5038 22.1944 1.09776 22.4694 0.801492 22.8459C0.505221 23.2224 0.333382 23.6818 0.309784 24.1603C0.274497 27.0929 4.60893 27.3105 6.71721 27.8581C12.2709 28.6151 15.6847 27.2114 18.7057 26.2502C32.4884 21.8273 44.0792 36.4923 57.6448 30.5908C59.9999 29.5583 62.1359 28.085 63.9375 26.2502C64.2224 25.9652 64.4282 25.6111 64.5349 25.2226C64.6416 24.834 64.6455 24.4244 64.5461 24.034Z"
        fill="black"
      />
      <path
        d="M20.875 16.1452C21.2882 16.2111 43.4 16.1218 43.784 16.1568C44.1318 16.1595 44.4757 16.0834 44.7899 15.9342C45.104 15.785 45.3804 15.5666 45.5981 15.2954C45.8176 15.0281 45.9748 14.7152 46.0582 14.3795C46.1416 14.0438 46.1492 13.6938 46.0804 13.3548L44.691 6.60276C44.299 4.74077 43.2803 3.06951 41.8049 1.86789C40.3296 0.666262 38.4867 0.00695827 36.5839 0H28.339C26.4362 0.00695615 24.5934 0.666257 23.118 1.86788C21.6426 3.06951 20.6239 4.74077 20.232 6.60276L18.8425 13.3548C18.7812 13.6727 18.7859 13.9999 18.8564 14.3159C18.9269 14.6319 19.0617 14.93 19.2523 15.1917C19.4429 15.4535 19.6854 15.6732 19.9645 15.8372C20.2437 16.0012 20.5536 16.106 20.875 16.1452Z"
        fill="black"
      />
      <path
        d="M37.6631 30.7396C35.9522 30.3166 34.5356 28.7768 33.7474 30.4294L31.1866 30.4295C29.724 28.2169 26.4755 28.2942 24.0901 28.0064C20.6424 27.7502 16.2545 28.0872 16.8213 32.6803L17.4414 35.7922C18.7334 41.8859 27.2792 40.4968 30.0957 36.6418C31.0007 35.5136 31.5805 34.1597 31.7723 32.7261H33.1502C33.534 39.3388 45.4382 43.6104 47.4927 35.7806L47.8944 33.7137C44.3815 33.1166 40.9487 32.1187 37.6631 30.7396Z"
        fill="black"
      />
    </svg>
  );
};

const TechIcon = () => {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.50033 45.5C5.30866 45.5 4.28888 45.076 3.44099 44.2281C2.5931 43.3803 2.16844 42.3598 2.16699 41.1666V13H6.50033V41.1666H43.3337V45.5H6.50033ZM15.167 36.8333C13.9753 36.8333 12.9555 36.4094 12.1077 35.5615C11.2598 34.7136 10.8351 33.6931 10.8337 32.5V8.66665C10.8337 7.47498 11.2583 6.4552 12.1077 5.60731C12.957 4.75942 13.9768 4.33476 15.167 4.33331H26.0003L30.3337 8.66665H45.5003C46.692 8.66665 47.7125 9.09131 48.5618 9.94065C49.4112 10.79 49.8351 11.8098 49.8337 13V32.5C49.8337 33.6916 49.4097 34.7121 48.5618 35.5615C47.7139 36.4108 46.6934 36.8348 45.5003 36.8333H15.167ZM19.5003 28.1666H41.167L33.692 18.4166L28.7087 24.9166L25.3503 20.5833L19.5003 28.1666Z"
        fill="black"
      />
    </svg>
  );
};

const HealthIcon = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.924 36.938C12.038 32.428 4 24.978 4 17.934C4 6.16601 15 1.77201 24 10.86C33 1.77201 44 6.16601 44 17.934C44 24.978 35.96 32.428 30.076 36.938C27.412 38.978 26.08 40 24 40C21.92 40 20.588 38.98 17.924 36.938ZM33 12.5C33.3978 12.5 33.7794 12.658 34.0607 12.9394C34.342 13.2207 34.5 13.6022 34.5 14V16.5H37C37.3978 16.5 37.7794 16.658 38.0607 16.9394C38.342 17.2207 38.5 17.6022 38.5 18C38.5 18.3978 38.342 18.7794 38.0607 19.0607C37.7794 19.342 37.3978 19.5 37 19.5H34.5V22C34.5 22.3978 34.342 22.7794 34.0607 23.0607C33.7794 23.342 33.3978 23.5 33 23.5C32.6022 23.5 32.2206 23.342 31.9393 23.0607C31.658 22.7794 31.5 22.3978 31.5 22V19.5H29C28.6022 19.5 28.2206 19.342 27.9393 19.0607C27.658 18.7794 27.5 18.3978 27.5 18C27.5 17.6022 27.658 17.2207 27.9393 16.9394C28.2206 16.658 28.6022 16.5 29 16.5H31.5V14C31.5 13.6022 31.658 13.2207 31.9393 12.9394C32.2206 12.658 32.6022 12.5 33 12.5Z"
        fill="black"
      />
    </svg>
  );
};

const EventsIcon = () => {
  return (
    <svg
      width="65"
      height="64"
      viewBox="0 0 65 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.5 8C16.1289 8.00001 15.7651 8.10328 15.4493 8.29825C15.1336 8.49323 14.8783 8.77221 14.712 9.104L8.712 21.104C8.57261 21.3821 8.50002 21.6889 8.5 22V30C8.5 30.5304 8.71071 31.0391 9.08579 31.4142C9.46086 31.7893 9.96957 32 10.5 32H12.5V54C12.5 54.5304 12.7107 55.0391 13.0858 55.4142C13.4609 55.7893 13.9696 56 14.5 56H50.5C51.0304 56 51.5391 55.7893 51.9142 55.4142C52.2893 55.0391 52.5 54.5304 52.5 54V32H54.5C55.0304 32 55.5391 31.7893 55.9142 31.4142C56.2893 31.0391 56.5 30.5304 56.5 30V22C56.5 21.6889 56.4274 21.3821 56.288 21.104L50.288 9.104C50.1217 8.77221 49.8664 8.49323 49.5507 8.29825C49.2349 8.10328 48.8711 8.00001 48.5 8H16.5ZM52.5 22.472V28H44.5V24H40.5V28H34.5V24H30.5V28H24.5V24H20.5V28H12.5V22.472L17.736 12H47.264L52.5 22.472ZM26.5 40H30.5V36H26.5V40ZM34.5 40H38.5V36H34.5V40ZM30.5 46H26.5V42H30.5V46ZM34.5 46H38.5V42H34.5V46Z"
        fill="black"
      />
    </svg>
  );
};

const ViewBusinessIcon = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6667 3.35669V5.02336H14.6583L6.46667 13.215L7.64167 14.39L15.8333 6.19836V9.19002H17.5V3.35669M15.8333 16.69H4.16667V5.02336H10V3.35669H4.16667C3.72464 3.35669 3.30072 3.53228 2.98816 3.84484C2.67559 4.15741 2.5 4.58133 2.5 5.02336V16.69C2.5 17.132 2.67559 17.556 2.98816 17.8685C3.30072 18.1811 3.72464 18.3567 4.16667 18.3567H15.8333C16.2754 18.3567 16.6993 18.1811 17.0118 17.8685C17.3244 17.556 17.5 17.132 17.5 16.69V10.8567H15.8333V16.69Z"
      fill="#CCFF00"
    />
  </svg>
);

const GridViewIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3H11V11H3V3ZM3 13H11V21H3V13ZM13 3H21V11H13V3ZM13 13H21V21H13V13Z"
      fill="currentColor"
    />
  </svg>
);

const ListViewIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 4H21V8H3V4ZM3 10H21V14H3V10ZM3 16H21V20H3V16Z"
      fill="currentColor"
    />
  </svg>
);

const VerifiedIcon = () => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1859_885)">
      <path
        d="M24 12.8558C24 11.584 22.4781 10.2006 20.9681 9.14327C21.2857 7.32583 21.3853 5.27023 20.485 4.36996C19.9074 3.7906 18.85 3.62508 17.6846 3.6673C17.0393 3.68757 16.3603 3.7754 15.7117 3.88688C14.6544 2.37854 13.2727 0.856689 11.9992 0.856689C10.7256 0.856689 9.34394 2.37854 8.28489 3.88857C6.46914 3.56934 4.41185 3.46799 3.51496 4.37164C2.61468 5.27192 2.71434 7.32583 3.03188 9.14496C1.52185 10.2023 0 11.584 0 12.8558C0 14.1277 1.52185 15.5111 3.03188 16.5684C3.01161 16.6816 2.99472 16.7931 2.97614 16.9062C2.70589 18.6342 2.66873 20.4955 3.51327 21.3417C4.41016 22.242 6.46576 22.144 8.2832 21.8248C9.34394 23.3348 10.7256 24.8567 11.9975 24.8567C13.2693 24.8567 14.6527 23.3348 15.71 21.8248C17.5275 22.144 19.5848 22.2454 20.4817 21.3417C21.3819 20.4415 21.2823 18.3876 20.9647 16.5684C22.4748 15.5111 23.9966 14.1277 23.9966 12.8558H24Z"
        fill="#CCFF00"
      />
      <path
        d="M8.1633 12.0096C8.63117 11.5468 9.38111 11.5468 9.84899 12.0096L11.4012 13.5602L15.3537 9.60943C15.8266 9.14493 16.5867 9.15169 17.0478 9.62463C17.5072 10.0891 17.5072 10.8391 17.0478 11.3053L12.2475 16.1056C11.7796 16.5752 11.0195 16.5752 10.5516 16.1073L8.15147 13.7054C7.6836 13.2359 7.68867 12.4758 8.16161 12.0096H8.1633Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_1859_885">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0 0.856689)"
        />
      </clipPath>
    </defs>
  </svg>
);

const ViewsIcon = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.4999 8.85668L14.9149 8.64868V8.64668L14.9119 8.64368L14.9059 8.63168L14.8849 8.59168L14.8049 8.44768C14.7073 8.27929 14.6035 8.11451 14.4939 7.95368C14.128 7.41663 13.7074 6.91897 13.2389 6.46868C12.1129 5.38868 10.3799 4.28668 7.99989 4.28668C5.62189 4.28668 3.88789 5.38768 2.76189 6.46868C2.29335 6.91897 1.87277 7.41663 1.50689 7.95368C1.35843 8.17273 1.22092 8.39901 1.09489 8.63168L1.08889 8.64368L1.08689 8.64668V8.64768C1.08689 8.64768 1.08589 8.64868 1.50089 8.85668L1.08589 8.64768C1.0538 8.7125 1.03711 8.78385 1.03711 8.85618C1.03711 8.92851 1.0538 8.99986 1.08589 9.06468L1.08489 9.06668L1.08789 9.06968L1.09389 9.08168C1.12507 9.14416 1.15842 9.20553 1.19389 9.26568C1.62449 9.99309 2.15124 10.6591 2.75989 11.2457C3.88689 12.3257 5.61989 13.4257 7.99989 13.4257C10.3789 13.4257 12.1129 12.3257 13.2399 11.2447C13.7076 10.7939 14.1278 10.2963 14.4939 9.75968C14.6341 9.55323 14.7646 9.34033 14.8849 9.12168L14.9059 9.08168L14.9119 9.06968L14.9139 9.06668V9.06568C14.9139 9.06568 14.9149 9.06468 14.4999 8.85668ZM14.4999 8.85668L14.9149 9.06568C14.947 9.00086 14.9637 8.92951 14.9637 8.85718C14.9637 8.78485 14.947 8.7135 14.9149 8.64868L14.4999 8.85668ZM7.93989 7.32068C7.53252 7.32068 7.14183 7.48251 6.85377 7.77057C6.56572 8.05862 6.40389 8.44931 6.40389 8.85668C6.40389 9.26405 6.56572 9.65474 6.85377 9.9428C7.14183 10.2309 7.53252 10.3927 7.93989 10.3927C8.34726 10.3927 8.73795 10.2309 9.026 9.9428C9.31406 9.65474 9.47589 9.26405 9.47589 8.85668C9.47589 8.44931 9.31406 8.05862 9.026 7.77057C8.73795 7.48251 8.34726 7.32068 7.93989 7.32068ZM5.47789 8.85668C5.47789 8.20319 5.73749 7.57646 6.19958 7.11437C6.66167 6.65228 7.28839 6.39268 7.94189 6.39268C8.59538 6.39268 9.22211 6.65228 9.6842 7.11437C10.1463 7.57646 10.4059 8.20319 10.4059 8.85668C10.4059 9.51018 10.1463 10.1369 9.6842 10.599C9.22211 11.0611 8.59538 11.3207 7.94189 11.3207C7.28839 11.3207 6.66167 11.0611 6.19958 10.599C5.73749 10.1369 5.47789 9.51018 5.47789 8.85668Z"
      fill="#CCFF00"
    />
  </svg>
);

const DirectoryPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    { title: "Art & Design", listings: 3, icon: <ArtIcon /> },
    { title: "Auto Services", listings: 8, icon: <AutoIcon /> },
    { title: "Food & Beverages", listings: 11, icon: <FoodIcon /> },
    { title: "Lifestyle Products", listings: 4, icon: <LifestyleIcon /> },
    { title: "Travel Logistics", listings: 10, icon: <TravelIcon /> },
    { title: "Beauty & Fashion", listings: 9, icon: <BeautyIcon /> },
    { title: "Media & Tech", listings: 35, icon: <TechIcon /> },
    { title: "Health & Environment", listings: 28, icon: <HealthIcon /> },
    { title: "Events & Entertainment", listings: 401, icon: <EventsIcon /> },
  ];

  const searchResults = [
    {
      id: 1,
      name: "The Coffee House",
      category: "Food & Beverages",
      rating: 4.5,
      reviews: 128,
      views: 20,
      image:
        "https://images.unsplash.com/photo-1720048170970-3848514c3d60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "123 Main St, City",
      description: "Artisanal coffee shop serving specialty brews and pastries",
      verified: true,
      featured: true,
    },
    {
      id: 1,
      name: "The Coffee House",
      category: "Food & Beverages",
      rating: 4.5,
      reviews: 128,
      views: 20,
      image:
        "https://images.unsplash.com/photo-1720048170970-3848514c3d60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "123 Main St, City",
      description: "Artisanal coffee shop serving specialty brews and pastries",
      verified: true,
      featured: true,
    },
    {
      id: 1,
      name: "The Coffee House",
      category: "Food & Beverages",
      rating: 4.5,
      reviews: 128,
      views: 20,
      image:
        "https://images.unsplash.com/photo-1720048170970-3848514c3d60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "123 Main St, City",
      description: "Artisanal coffee shop serving specialty brews and pastries",
      verified: true,
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[650px] md:h-[500px] bg-black/50 pt-[240px]">
        <Image
          src="/directory-hero.jpg"
          alt="Directory background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
          <h1 className="mb-8 text-center text-5xl font-display">
            <span className="text-primary">DISCOVER</span> COMMUNITY,
            <br />
            TRUST SIMPLIFIED
          </h1>

          <div className="flex w-full max-w-4xl flex-col gap-4 px-4 md:flex-row">
            <input
              type="text"
              placeholder="Enter your Location"
              className="w-full rounded-md p-3 text-black md:flex-1"
            />
            <input
              type="text"
              placeholder="Search by Business or Service"
              className="w-full rounded-md p-3 text-black md:flex-1"
            />
            <Button className=" md:w-auto">Explore Now →</Button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mx-auto lg:px-20 px-4 py-16">
        <h2 className="mb-8 text-center text-4xl font-display">
          Browse by Category
        </h2>
        <p className="mb-12 text-center">
          Find the best businesses near you in just a few clicks. Whether
          you&apos;re searching for restaurants, services, or shops, our curated
          listings connect you to trusted local providers. Explore reviews,
          special offers, and essential details to make informed choices. Your
          next favorite spot is just a search away
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="flex items-center border border-primary gap-4 rounded-lg bg-black text-white hover:bg-black/90"
            >
              <div className="flex h-full w-[80px] items-center justify-center rounded-l-lg bg-primary text-2xl text-black">
                <div className="flex items-center justify-center w-[30px] h-[30px]">
                  {category.icon}
                </div>
              </div>
              <div className="p-4 pl-0">
                <h3 className="text-xl font-display">{category.title}</h3>
                <p className="text-sm text-gray-400">
                  {category.listings} Listings
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Search Results Section */}
        <div className="mt-12 md:mt-28">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between w-full">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold">Search Results</h2>
              <p className="text-gray-600">
                {searchResults.length} businesses found
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <select className="rounded-md border p-2">
                <option>Sort by: Featured</option>
                <option>Highest Rated</option>
                <option>Most Reviews</option>
              </select>

              <div className="flex rounded-full border">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <GridViewIcon />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <ListViewIcon />
                </Button>
              </div>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((result) => (
                <Card
                  key={result.id}
                  className="flex flex-col md:flex-row h-full w-full overflow-hidden border-primary bg-background shadow-custom-rem rounded-sm"
                >
                  {/* Image Section */}
                  <div className="w-full h-full md:mb-0 md:w-2/5 relative">
                    <Image
                      src={result.image}
                      alt={result.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-l-sm"
                    />
                    {/* {result.featured && (
                      <span className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-sm font-medium">
                        Featured
                      </span>
                    )} */}
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-3/5 p-6 flex flex-col">
                    {/* Title and Verified Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-display">{result.name}</h2>
                      {result.verified && (
                        <span className="flex items-center gap-1 text-primary">
                          <VerifiedIcon />
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      {result.location}
                    </div>

                    {/* Views Count */}
                    <div className="flex items-center gap-2 text-primary mb-4">
                      <ViewsIcon />
                      {result.views} views
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-auto">
                      <Button variant="outline" size="lg" className="flex-1">
                        Contact
                      </Button>
                      <Button
                        size="icon"
                        className="aspect-square bg-black border border-black hover:border-primary hover:bg-black"
                        asChild
                      >
                        <Link href={`/directory/${result.id}`}>
                          <ViewBusinessIcon />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8 md:space-y-12">
              {searchResults.map((result) => (
                <Card
                  key={result.id}
                  className="flex flex-col md:flex-row md:items-center h-full w-full overflow-hidden bg-background border-background shadow-custom-rem rounded-sm"
                >
                  {/* Image Section */}
                  <div className="flex items-center justify-start gap-4 mb-6 md:mb-0 w-full">
                    <div className="min-w-[60px] md:min-w-[100px] h-[60px] md:h-[100px] relative">
                      <Image
                        src={result.image}
                        alt={result.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                      {/* {result.featured && (
                      <span className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-sm font-medium">
                        Featured
                      </span>
                        )} */}
                    </div>
                    <div className="flex flex-col">
                      {/* Title and Verified Badge */}
                      <div className="flex items-center justify-between mb-2 md:mb-4">
                        <h2 className="text-xl font-display">{result.name}</h2>
                        {result.verified && (
                          <span className="flex items-center gap-1 ml-3 text-primary">
                            <VerifiedIcon />
                          </span>
                        )}
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-gray-600 mb-2 md:mb-4">
                        {result.location}
                      </div>

                      {/* Views Count */}
                      <div className="flex items-center gap-2 text-primary">
                        <ViewsIcon />
                        {result.views} views
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:ml-6 flex justify-between items-center gap-4">
                    {/* Buttons */}
                    <Button variant="outline" size="lg" className="flex-1">
                      Contact
                    </Button>
                    <Button
                      size="icon"
                      className="aspect-square bg-black border border-black hover:border-primary hover:bg-black"
                      asChild
                    >
                      <Link href={`/directory/${result.id}`}>
                        <ViewBusinessIcon />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer isMini={true} />
    </div>
  );
};

export default DirectoryPage;
