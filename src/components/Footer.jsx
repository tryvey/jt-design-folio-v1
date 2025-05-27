import React, { useEffect, useState } from "react";
import { ThemeSwitcher } from "../utils.jsx";

export default function Footer() {
  const [footerLinks, setFooterLinks] = useState([]);
  const currentYear = new Date().getFullYear();
  const copyrightText = `Copyright © ${currentYear}. All rights reserved.`;

  useEffect(() => {
    const fetchFooterLinks = async () => {
      try {
        const l = await fetch("/content/footer.md?t=" + Date.now()).then(
          (res) => res.text()
        );
        const linkRegex = /-\s*\[(.+)\]\(([^)]+)\)/g;
        const parsedLinks = [];
        let match;
        while ((match = linkRegex.exec(l)) !== null) {
          parsedLinks.push({
            text: match[1].trim(),
            href: match[2].trim(),
          });
        }
        setFooterLinks(parsedLinks);
      } catch (err) {
        setFooterLinks([]);
      }
    };
    fetchFooterLinks();
    const interval = setInterval(fetchFooterLinks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      id="contact"
      className="bg-neutral-950 dark:bg-black py-10 mt-10 scroll-mt-8 target:ring-2 target:ring-blue-500/50 text-white/90 text-center"
    >
      {/* Row 0: ThemeSwitcher */}
      <div className="max-w-6xl mx-auto px-4 grid grid-rows-3 gap-4 items-center justify-items-center">
        <div className="flex-1 flex">
          <ThemeSwitcher className="ml-auto scale-90" />
        </div>

        {/* Row 1: Logo */}
        <div className="flex justify-center items-center w-full row-span-1">
          <a href="/">
            <img
              src="/images/JT-logo.svg"
              alt="JT Logo"
              className="h-10 max-w-48 mx-auto"
              style={{ display: "inline-block" }}
            />
          </a>
        </div>
        {/* Row 2: Links */}
        <div className="mb-0 w-full flex justify-center items-center row-span-1">
          {footerLinks &&
            footerLinks.map((link, index) => (
              <span key={index} className="inline-block">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-white/90 dark:text-white/80 hover:text-white dark:hover:text-white"
                >
                  {link.text}
                </a>
                {index < footerLinks.length - 1 && (
                  <span className="mx-2 text-white/70 dark:text-white/60">
                    •
                  </span>
                )}
              </span>
            ))}
        </div>
        {/* Row 3: Copyright and Theme Switcher */}
        <div className="w-full row-span-1 flex justify-center items-center">
          <span className="text-center text-sm  text-white/80 dark:text-white/70">
            {copyrightText}
          </span>
        </div>
      </div>
    </footer>
  );
}
