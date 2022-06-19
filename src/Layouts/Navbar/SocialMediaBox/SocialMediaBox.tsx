import socialMediaObjectsArray from "../../Inputs/SocialMedia/socialMedia";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import {
  FC,
  useState,
  ComponentType,
  HTMLAttributes,
  ElementType,
  Fragment,
} from "react";

const enum targetEnum {
  blank = "_blank",
}

const enum relEnum {
  noopener = "noopener",
  noreferrer = "noreferrer",
}

export const enum containerTypeEnum {
  Box = "Box",
  Grid = "Grid",
}

interface SmIconButtonProps extends IconButtonProps {
  href: string;
  target: targetEnum.blank;
  rel: relEnum;
  iconColor?: string;
  iconSize?: string;
}

const SmIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => {
    return prop !== "iconColor" && prop !== "iconSize";
  },
})<SmIconButtonProps>(({ iconSize, iconColor, theme }) => ({
  color: iconColor || theme.palette.primary.main,
  fontSize: iconSize || "24px",
}));

export interface ISocialMediaBoxProps {
  layout: containerTypeEnum;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  iconColor?: string;
  iconSize?: string;
}

interface socMedContainerPropsInterface
  extends HTMLAttributes<HTMLOrSVGElement> {
  as: ComponentType;
  container?: boolean;
}

const SocMedContainer: FC<socMedContainerPropsInterface> = ({
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
  const layout = props.layout;
  const xs = props.xs;

  const socMedItemProps =
    layout === "Grid"
      ? {
          as: Grid,
          item: true,
          xs: props.xs,
        }
      : {
          as: Fragment,
        };

  const SocMedContainerProps =
    layout === "Grid"
      ? {
          as: Grid,
          container: true,
        }
      : {
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
    <SocMedContainer {...SocMedContainerProps}>
      {socialMediaObjectsArray.map((item: any, index: number) => {
        return (
          <SocMedItem {...socMedItemProps} key={`${item.url}_${index}`}>
            <SmIconButton
              href={item.url}
              target={targetEnum.blank}
              rel={relEnum.noopener}
              iconColor={iconColor}
              iconSize={iconSize}
            >
              {item.icon}
            </SmIconButton>
          </SocMedItem>
        );
      })}
    </SocMedContainer>
  );
}
