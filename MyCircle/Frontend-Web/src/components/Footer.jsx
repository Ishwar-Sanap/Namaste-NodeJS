import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal  bg-base-300 text-neutral-content items-center p-6 mt-5">
      <p className="mx-auto">
        Copyright © {new Date().getFullYear()} - All right reserved
      </p>
    </footer>
  );
};

export default Footer;
