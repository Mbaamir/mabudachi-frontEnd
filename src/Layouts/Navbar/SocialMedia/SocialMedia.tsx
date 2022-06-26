import socialMediaObjectsArray from "../../Inputs/SocialMediaList/socialMediaList";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled, useTheme } from "@mui/material/styles";
import {
  FC,
  createElement,
  ComponentType,
  HTMLAttributes,
  ElementType,
  Fragment,
} from "react";

type gridItemWidth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0 | 11 | 12;

type breakpointsType = "xs" | "sm" | "md" | "lg" | "xl";

interface SmIconButtonProps extends IconButtonProps {
  href: string;
  iconColor?: string;
  iconSize?: string;
  iconColorOnHover?: string;
  target: "_blank";
  rel: "noreferrer";
}

const SmIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => {
    return (
      prop !== "iconColor" && prop !== "iconSize" && prop !== "iconColorOnHover"
    );
  },
})<SmIconButtonProps>(({ iconSize, iconColor, theme, iconColorOnHover }) => ({
  color: iconColor || theme.palette.primary.main,
  fontSize: iconSize || "24px",
  "&:hover": {
    color:
      iconColorOnHover ||
      theme.palette.primaryHighlight?.main ||
      theme.palette.primary.light,
  },
}));

export interface ISocialMediaBase {
  iconColor?: string;
  iconSize?: string;
  iconColorOnHover?: string;
  containerWidth?: string;
  marginLeft?: string;
  marginRight?: string;

}

export interface ISocialMediaBoxBase extends ISocialMediaBase {
  layout: "Box";
}

export interface ISocialMediaGridBase extends ISocialMediaBase {
  layout: "Grid";
  xsWidth?: gridItemWidth;
  smWidth?: gridItemWidth;
  mdWidth?: gridItemWidth;
  lgWidth?: gridItemWidth;
  xlWidth?: gridItemWidth;
}

export interface gridObjectInterface {
  sx: Object;
}

type ISocialMediaBoxFixed = ISocialMediaBoxBase | ISocialMediaGridBase;

type ISocialMediaBoxHideBelow = ISocialMediaBoxFixed & {
  hideBelow?: breakpointsType;
  hideAbove?: never;
};

type ISocialMediaBoxHideAbove = ISocialMediaBoxFixed & {
  hideBelow?: never;
  hideAbove?: breakpointsType;
};

type ISocialMediaBoxProps = ISocialMediaBoxHideBelow | ISocialMediaBoxHideAbove;

interface socMedContainerPropsInterface
  extends HTMLAttributes<HTMLOrSVGElement> {
  as: ComponentType;
}

const SocMedBoxContainer: FC<socMedContainerPropsInterface> = ({
  as: Tag = Box,
  children,
  ...otherProps
}) => {
  return <Tag {...otherProps}>{children}</Tag>;
};

interface socMedItemPropsInterface extends HTMLAttributes<HTMLOrSVGElement> {
  as: ComponentType | ElementType;
  item?: boolean;
  xs?: number;
}

type justifyContentType = "space-between" | "space-around";


const sxDefaultDisplay = {
  xs: "flex",
  sm: "flex",
  md: "flex",
  lg: "flex",
  xl: "flex",
};

interface sxInterface {
  width?: string;
  marginLeft?: string;
  marginRight?: string;
  display: typeof sxDefaultDisplay;
  justifyContent?: justifyContentType;
}


const SocMedItem: FC<socMedItemPropsInterface> = ({
  as: Tag = Fragment,
  children,
  ...otherProps
}) => {
  return <Tag {...otherProps}>{children}</Tag>;
};


export default function SocialMedia(props: ISocialMediaBoxProps) {
  const layout = props.layout;
  const hideAbove = props.hideAbove;
  const hideBelow = props.hideBelow;
  const iconColor = props.iconColor;
  const iconColorOnHover = props.iconColorOnHover;
  let iconSize = props.iconSize;
  const containerWidth = props.containerWidth;
  const marginLeft = props.marginLeft;
  const marginRight = props.marginRight;


  let sx: sxInterface = {
    display: sxDefaultDisplay,
    
    width: containerWidth,
    marginLeft: marginLeft,
    marginRight: marginRight,
  };

  if (layout === "Box") {
    sx.justifyContent = "space-around";
  }

  type displayType = keyof typeof sx.display;

  if (hideBelow) {
    let areAllSetToHide = false;
    let hideBelowVal: displayType = hideBelow;
    let display = sx.display;
    for (let key in display) {
      if (key === hideBelowVal) {
        areAllSetToHide = true;
      }
      if (areAllSetToHide) break;
      display[key as keyof typeof display] = "none";
    }
  }

  if (hideAbove) {
    let areAllSkipped = false;
    let hideAboveVal: displayType = hideAbove;
    let display = sx.display;
    for (let key in display) {
      if (key === hideAboveVal) {
        areAllSkipped = true;
      }
      if (areAllSkipped) {
        display[key as keyof typeof display] = "none";
      }
    }
  }

  const socMedItemProps =
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

  const SocMedBoxContainerProps =
    layout === "Grid"
      ? { sx, as: Grid, container: true }
      : {
          sx,
          as: Box,
        };

  if (!iconSize) {
    let numberOfIcons = socialMediaObjectsArray.length;
    const shrinkBy: number = numberOfIcons / 4;
    let calculatedIconSize: number = 30 / shrinkBy;
    if (calculatedIconSize > 24) calculatedIconSize = 24;
    iconSize = `${calculatedIconSize}px`;
  }

  return (
    <SocMedBoxContainer {...SocMedBoxContainerProps}>
      {socialMediaObjectsArray.map((item, index: number) => {
        return (
          <SocMedItem {...socMedItemProps} key={`${item.url}_${index}`}>
            <SmIconButton
              href={item.url}
              target="_blank"
              rel="noreferrer"
              iconColor={iconColor}
              iconSize={iconSize}
              iconColorOnHover={iconColorOnHover}
            >
              {createElement(item.icon)}
            </SmIconButton>
          </SocMedItem>
        );
      })}
    </SocMedBoxContainer>
  );
}
