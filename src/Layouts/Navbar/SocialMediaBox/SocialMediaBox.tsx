import socialMediaObjectsArray from "../NavbarInputs/SocialMedia/socialMedia";
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
  iconColor?: string;
  iconSize?: string;
  maxWidth?: string;
}

interface smContainerPropsInterface extends HTMLAttributes<HTMLOrSVGElement> {
  as: ComponentType;
  container?: boolean;
}

const SmContainer: FC<smContainerPropsInterface> = ({
  as: Tag = Box,
  children,
  ...otherProps
}) => {
  return <Tag {...otherProps}>{children}</Tag>;
};

interface smItemPropsInterface extends HTMLAttributes<HTMLOrSVGElement> {
  as: ComponentType | ElementType;
  item?: boolean;
  xs?: number;
}

const SmItem: FC<smItemPropsInterface> = ({
  as: Tag = Fragment,
  children,
  ...otherProps
}) => {
  return <Tag {...otherProps}>{children}</Tag>;
};

export default function SocialMediaBox(props: ISocialMediaBoxProps) {
  const theme = useTheme();
  const isSmallerThanMd = useMediaQuery(theme.breakpoints.down("md"));

  let smItemProps = isSmallerThanMd
    ? {
        as: Grid,
        item: true,
        xs: 6,
      }
    : {
        as: Fragment,
      };

  const iconColor = props.iconColor;
  const maxWidth = props.maxWidth;
  let iconSize = props.iconSize;

  if (!iconSize && !isSmallerThanMd) {
    let numberOfIcons = socialMediaObjectsArray.length;
    const shrinkBy: number = numberOfIcons / 4;
    let calculatedIconSize: number = 30 / shrinkBy;
    if (calculatedIconSize > 24) calculatedIconSize = 24;
    iconSize = `${calculatedIconSize}px`;
  }

  return (
    <SmContainer as={isSmallerThanMd ? Grid : Box} container={isSmallerThanMd}>
      {socialMediaObjectsArray.map((item: any, index: number) => {
        return (
          <SmItem {...smItemProps} key={`${item.url}_${index}`}>
            <SmIconButton
              href={item.url}
              target={targetEnum.blank}
              rel={relEnum.noopener}
              iconColor={iconColor}
              iconSize={iconSize}
            >
              {item.icon}
            </SmIconButton>
          </SmItem>
        );
      })}
    </SmContainer>
  );
}
