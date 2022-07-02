// Add (Internal/External) Pages Link as per the interface here.
//Then include it in the array->pageObjectsArray at the bottom.

interface internalLink {
  label: string;
  to: string;
  href?: never;
}

interface externalLink {
  label: string;
  href: string;
  to?: never;
}

type pageLinkObjectInterface = internalLink | externalLink;

const Home: pageLinkObjectInterface = {
  label: "Home",
  to: "/",
};

const Inventory: pageLinkObjectInterface = {
  label: "Inventory",
  to: "/inventory",
};

const pageObjectsArray: pageLinkObjectInterface[] = [Home, Inventory];

export default pageObjectsArray;
