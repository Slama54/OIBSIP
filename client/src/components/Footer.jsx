import { Footer } from "flowbite-react";
import {  BsFacebook, BsGithub, BsInstagram, BsTwitter ,BsLinkedin } from "react-icons/bs";


export default function FooterCom() {
  return (
    <Footer container>
    <div className="w-full">
      <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
        <div>
          <Footer.Brand
            href="/"
            src="\logo\pizza-hut-logo-DDD88793B2-seeklogo 2.png"
            alt="Flowbite Logo"
            name="Pizza Hot"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
          <div>
            <Footer.Title title="about" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Pizza Hot</Footer.Link>
              <Footer.Link href="#">Tailwind CSS</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Follow us" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Github</Footer.Link>
              <Footer.Link href="#">Discord</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Legal" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
      <Footer.Divider />
      <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright href="#" by="Wael Slama" year={new Date().getFullYear()} />
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <Footer.Icon href="https://www.facebook.com/rejghyi/" icon={BsFacebook} />
          <Footer.Icon href="https://www.instagram.com/slama.wael/" icon={BsInstagram} />
          <Footer.Icon href="#" icon={BsTwitter} />
          <Footer.Icon href="https://github.com/Slama54" icon={BsGithub} />
          <Footer.Icon href="https://www.linkedin.com/in/wael-slama-657461222/" icon={BsLinkedin} />
        </div>
      </div>
    </div>
  </Footer>
  )
}
