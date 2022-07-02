import pageObjectsArray from "../../../Inputs/PagesList/PagesList";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link, { LinkProps } from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import {
  FC,
  createElement,
  ComponentType,
  HTMLAttributes,
  ElementType,
  Fragment,
  useState,
  useLayoutEffect
} from "react";

type gridItemWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0 | 11 | 12;

type breakpointsType = "xs" | "sm" | "md" | "lg" | "xl";

interface PageLinkBase extends LinkProps {
  linkColor?: string;
  linkColorOnHover?: string;
}

interface InternalPageLink extends PageLinkBase {
  to: string;
  href: never;
  component: typeof RouterLink;
}

type PageLinkProps = InternalPageLink | PageLinkBase;

const PageLink = styled(Link, {
  shouldForwardProp: (prop) => {
    return prop !== "linkColor" && prop !== "linkColorOnHover";
  },
})<PageLinkProps>(({ linkColor, theme, linkColorOnHover }) => ({
  color: linkColor || theme.palette.primary.main,
  "&:hover": {
    color:
      linkColorOnHover ||
      theme.palette.primaryHighlight?.main ||
      theme.palette.primary.light,
  },
}));

interface PagesBaseInterface {
  linkColor?: string;
  linkColorOnHover?: string;
  containerWidth?: string;
  marginLeft?: string;
  marginRight?: string;
}

interface PagesBoxBaseInterface extends PagesBaseInterface {
  layout: "Box";
}

interface PagesGridBaseInterface extends PagesBaseInterface {
  layout: "Grid";
  xsWidth?: gridItemWidth;
  smWidth?: gridItemWidth;
  mdWidth?: gridItemWidth;
  lgWidth?: gridItemWidth;
  xlWidth?: gridItemWidth;
}

type PagesContainerFixedInterface =
  | PagesBoxBaseInterface
  | PagesGridBaseInterface;

type PagesContainerInterfaceHideBelow = PagesContainerFixedInterface & {
  hideBelow?: breakpointsType;
  hideAbove?: never;
};

type PagesContainerInterfaceHideAbove = PagesContainerFixedInterface & {
  hideBelow?: never;
  hideAbove?: breakpointsType;
};

type PagesProps =
  | PagesContainerInterfaceHideBelow
  | PagesContainerInterfaceHideAbove;

interface PagesContainerPropsInterface
  extends HTMLAttributes<HTMLOrSVGElement> {
  as: ComponentType;
}

const PagesBoxContainer: FC<PagesContainerPropsInterface> = ({
  as: Tag = Box,
  children,
  ...otherProps
}) => {
  return <Tag {...otherProps}>{children}</Tag>;
};

interface pageLinkGridItemPropsInterface
  extends HTMLAttributes<HTMLOrSVGElement> {
  as: typeof Fragment | typeof Grid;
  item?: boolean;
}

// interface pageLinkInterface;

const PageLinkGridItem: FC<pageLinkGridItemPropsInterface> = ({
  as: Tag = Fragment,
  children,
  ...otherProps
}) => {
  return <Tag {...otherProps}>{children}</Tag>;
};

type justifyContentType = "space-between" | "space-around";

interface sxInterface {
  width?: string;
  marginLeft?: string;
  marginRight?: string;
  display: any;
  justifyContent?: justifyContentType;
}

export default function Pages(props: PagesProps) {
  const layout = props.layout;
  const hideAbove = props.hideAbove;
  const hideBelow = props.hideBelow;
  const linkColor = props.linkColor;
  const linkColorOnHover = props.linkColorOnHover;
  const containerWidth = props.containerWidth;
  const marginLeft = props.marginLeft;
  const marginRight = props.marginRight;

  const [sxState, setSxState] = useState<sxInterface>({
    display: {
      xs: "flex",
      sm: "flex",
      md: "flex",
      lg: "flex",
      xl: "flex",
    },
    width: containerWidth,
    marginLeft: marginLeft,
    marginRight: marginRight,
  });


  type displayType = keyof typeof sxState.display;


  const linkItemProps =
    layout === "Grid"
      ? {
          as: Grid,
          item: true,
          xs: props.xsWidth,
          sm: props.smWidth,
          md: props.mdWidth,
          lg: props.lgWidth,
          xl: props.xlWidth,
        }
      : {
          as: Fragment,
        };

  const PagesBoxContainerProps =
    layout === "Grid"
        ? { sx: sxState, as: Grid, container: true }
        : {
            sx: sxState,
            as: Box,
          };


        useLayoutEffect(() => {
          let sxClone = structuredClone(sxState);
      
          if (layout === "Box") sxClone.justifyContent = "space-around";
      
          if (hideBelow) {
            let areAllSetToHide = false;
            let hideBelowVal: displayType = hideBelow;
            let display = sxClone.display;
            for (let key in display) {
              if (key === hideBelowVal) {
                areAllSetToHide = true;
              }
              if (areAllSetToHide) break;
              sxClone.display[key] = "none";
            }
          } else if (hideAbove) {
            let areAllSkipped = false;
            let hideAboveVal: displayType = hideAbove;
            let display = sxClone.display;
            for (let key in display) {
              if (key === hideAboveVal) {
                areAllSkipped = true;
              }
      
              if (areAllSkipped) {
                sxClone.display[key] = "none";
              }
            }
          }
      
          setSxState(sxClone);
        }, []);
      

  // const pageLinkProps =
  return (
    <PagesBoxContainer {...PagesBoxContainerProps}>
      {pageObjectsArray.map((item, index: number) => {
        let pageLinkPropsObject: PageLinkProps = item.href
          ? {
              underline: "none",
              linkColor: linkColor,
              linkColorOnHover: linkColorOnHover,
              href: item.href,
              target: "_blank",
              rel: "noreferrer",
            }
          : {
              underline: "none",
              linkColor: linkColor,
              linkColorOnHover: linkColorOnHover,
              to: item.to,
              component: RouterLink,
            };

        return (
          <PageLinkGridItem {...linkItemProps} key={`${item.label}_${index}`}>
            <PageLink {...pageLinkPropsObject}>{item.label}</PageLink>
          </PageLinkGridItem>
        );
      })}
    </PagesBoxContainer>
  );
}