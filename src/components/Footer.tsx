import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <section className="mt-10">
      <footer className="footer bg-base-200 text-base-content p-10">
        <nav>
          <h6 className="footer-title">Membership</h6>
          <Link href="/join/1" className="link link-hover">
            Join
          </Link>
          <Link href="/login" className="link link-hover">
            Login
          </Link>
          <a
            href="https://www.ieee.org/membership/renew.html?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=renew"
            target="_blank"
            className="link link-hover"
          >
            Renew
          </a>
          <a
            href="https://www.ieee.org/membership/benefits/index.html"
            target="_blank"
            className="link link-hover"
          >
            Benefit
          </a>
          <a
            href="https://ieee-collabratec.ieee.org/?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=collabratec-membership-list"
            target="_blank"
            className="link link-hover"
          >
            IEEE Collabratee
          </a>
          <a
            href="mailto:security@ieee.org"
            target="_blank"
            className="link link-hover"
          >
            Report cybersecurity <br />
            concerns to <br />
            security@ieee.org
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Get Involved</h6>
          <a
            href="https://www.ieee.org/conferences/index.html?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=conferences"
            target="_blank"
            className="link link-hover"
          >
            Conferences
          </a>
          <a
            href="https://www.ieee.org/communities/geographic-activities.html?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=local-activities"
            target="_blank"
            className="link link-hover"
          >
            Local Activities
          </a>
          <a
            href="https://www.ieee.org/publications/authors/publishing-benefits/index.html?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=publishing"
            target="_blank"
            className="link link-hover"
          >
            Publishing
          </a>
          <a
            target="_blank"
            href="https://www.ieee.org/communities/societies/index.html?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=societies"
            className="link link-hover"
          >
            Societies
          </a>
          <a
            target="_blank"
            href="https://www.ieee.org/communities/societies/about-technical-councils.html?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=councils"
            className="link link-hover"
          >
            Councils
          </a>
          <a
            target="_blank"
            href="https://standards.ieee.org/?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=standards&_ga=2.138828091.983862010.1583757310-1875752245.1558373461&_gl=1*1sb33kd*_gcl_au*NTUxMDc3NjMzLjE3MjgwNTY0MzM."
            className="link link-hover"
          >
            Standards
          </a>
          <a
            target="_blank"
            href="https://jobs.ieee.org/?msessid=FdZjUkViRs2FRhh&utm_campaign=technical-careers&utm_medium=hp&utm_source=dhtml_footer"
            className="link link-hover"
          >
            Technical Careers
          </a>
          <a
            target="_blank"
            href="https://www.ieee.org/about/volunteers/index.html?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=volunteer"
            className="link link-hover"
          >
            Volunteer
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Contact With IEEE</h6>
          <a
            target="_blank"
            href="https://www.ieee.org/about/contact.html?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=contact-support-button"
            className="link link-hover"
          >
            Contact & Support
          </a>
          <a
            href="https://ieee-collabratec.ieee.org/?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=collabratec"
            target="_blank"
            className="link link-hover"
          >
            IEEE Collaborate
          </a>
          <a
            href="https://ieee.taleo.net/careersection/2/jobsearch.ftl?utm_source=mf&utm_campaign=taleo-jobs&utm_medium=footer&utm_term=taleo-jobs%20at%20ieee"
            target="_blank"
            className="link link-hover"
          >
            Careers at IEEE
          </a>
          <a
            target="_blank"
            href="https://www.ieee.org/about/news/index.html?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=newsroom"
            className="link link-hover"
          >
            IEEE Newsroom
          </a>
          <a
            target="_blank"
            href="https://www.ieee.org/about/news/media-kit-index.html?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=media-kit"
            className="link link-hover"
          >
            IEEE Media Kit
          </a>
          <a
            target="_blank"
            href="https://iln.ieee.org/public/TrainingCatalog.aspx"
            className="link link-hover"
          >
            IEEE Learning Network
          </a>
          <h6 className="mt-2 footer-title mb-1">Locations</h6>
          <a
            target="_blank"
            href="https://www.ieee.org/about/contact.html?utm_source=dhtml_footer&utm_medium=hp&utm_campaign=office-locations"
            className="link link-hover"
          >
            IEEE Office Locations
          </a>
        </nav>
      </footer>
      <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
        <aside className="flex flex-wrap items-center">
          <Image
            src="/logo.png"
            alt="IEEE RUSB Logo"
            width={150}
            height={150}
          />
          <p>
            Copyright © 2025 IEEE RUSB All rights reserved. <br />A
            not-for-profit organization, IEEE is the world&apos; largest
            technical professional organization dedicated to advancing
            technology for the benefit of humanity.
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4 items-center">
            <a href="https://www.facebook.com/ieeerusb" target="_blank">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="mailto:ieeerusb@gmail.com">
              <IoIosMail className="w-7 h-7" />
            </a>
            <a href="tel:+8801798-672640">
              <FaPhone className="w-5 h-5" />
            </a>
          </div>
        </nav>
      </footer>
    </section>
  );
};

export default Footer;
