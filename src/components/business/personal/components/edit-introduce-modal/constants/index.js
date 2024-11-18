import {
  faGithub,
  faInstagram,
  faLinkedin,
  faPinterest,
  faTwitch,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faFutbol, faPlane, faUtensils, faMusic, faBook, faGamepad, faPalette, faMicrochip } from "@fortawesome/free-solid-svg-icons";

export const SocialMediaPlatformList = [
  { icon: faLinkedin, label: "linkedin" },
  { icon: faGithub, label: "github" },
  { icon: faInstagram, label: "insta" },
  { icon: faPinterest, label: "pinterest" },
  { icon: faYoutube, label: "youtube" },
  { icon: faTwitter, label: "twitter" },
  { icon: faTwitch, label: "twitch" },
];

export const HobbiesList = [
  { label: "Sports", icon: faFutbol, value: "Sports"},
  { label: "Traveling", icon: faPlane, value: "Traveling"},
  { label: "Food", icon: faUtensils, value: "Food"},
  { label: "Music", icon: faMusic, value: "Music"},
  { label: "Reading", icon: faBook, value: "Reading"},
  { label: "Gaming", icon: faGamepad, value: "Gaming"},
  { label: "Art", icon: faPalette, value: "Art"},
  { label: "Tech", icon: faMicrochip, value: "Tech"},
];
