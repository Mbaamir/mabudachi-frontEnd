import { FaGithub, FaDiscord, FaTwitter, FaInstagram } from "react-icons/fa";

// Add Social Media Objects as per the interface here. Then include it in the array->socialMediaObjectsArray at the bottom.

export interface socialMediaObject {
  name: string;
  url: string;
  icon: JSX.Element;
}

const Github: socialMediaObject = {
  url: "https://github.com/Mbaamir/mabudachi-frontEnd",
  name: "Github",
  icon: <FaGithub />,
};

const Discord: socialMediaObject = {
  url: "https://discord.gg/fJaPE6wEDE",
  name: "Discord",
  icon: <FaDiscord />,
};

const Twitter: socialMediaObject = {
  url: "https://twitter.com/webAurVoltaire",
  name: "Twitter",
  icon: <FaTwitter />,
};

const Instagram: socialMediaObject = {
  url: "https://instagram.com",
  name: "Instagram",
  icon: <FaInstagram />,
};
const socialMediaObjectsArray: socialMediaObject[] = [
  Github,
  Discord,
  Twitter,
  Instagram,
];

export default socialMediaObjectsArray;
