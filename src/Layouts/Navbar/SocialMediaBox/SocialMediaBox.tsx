import socialMediaObjectsArray from "../../Inputs/SocialMedia/socialMedia";
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
  target: "_blank";
  rel: "noreferrer";
}

const SmIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => {
    return prop !== "iconColor" && prop !== "iconSize";
  },
})<SmIconButtonProps>(({ iconSize, iconColor, theme }) => ({
  color: iconColor || theme.palette.primary.main,
  fontSize: iconSize || "24px",
}));

export interface ISocialMediaBase {
  iconColor?: string;
  iconSize?: string;
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

const SocMedItem: FC<socMedItemPropsInterface> = ({
  as: Tag = Fragment,
  children,
  ...otherProps
}) => {
  return <Tag {...otherProps}>{children}</Tag>;
};

export default function SocialMediaBox(props: ISocialMediaBoxProps) {
  // if (!socialMediaObjectsArray) return;

  const layout = props.layout;
  const hideAbove = props.hideAbove;
  const hideBelow = props.hideBelow;

  let sx = {
    display: { xs: "flex", sm: "flex", md: "flex", lg: "flex", xl: "flex" },
  };

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
      console.log(display);
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
      console.log(display);
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
      ? { sx, as: Grid }
      : {
          sx,
          as: Box,
        };

  const iconColor = props.iconColor;
  let iconSize = props.iconSize;

  if (!iconSize) {
    let numberOfIcons = socialMediaObjectsArray.length;
    const shrinkBy: number = numberOfIcons / 4;
    let calculatedIconSize: number = 30 / shrinkBy;
    if (calculatedIconSize > 24) calculatedIconSize = 24;
    iconSize = `${calculatedIconSize}px`;
  }

  return (
    <SocMedBoxContainer {...SocMedBoxContainerProps}>
      {socialMediaObjectsArray.map((item: any, index: number) => {
        return (
          <SocMedItem {...socMedItemProps} key={`${item.url}_${index}`}>
            <SmIconButton
              href={item.url}
              target="_blank"
              rel="noreferrer"
              iconColor={iconColor}
              iconSize={iconSize}
            >
              {createElement(item.icon)}
            </SmIconButton>
          </SocMedItem>
        );
      })}
    </SocMedBoxContainer>
  );
}
