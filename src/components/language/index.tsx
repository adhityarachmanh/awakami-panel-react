import { useRootDispatch, useRootSelector } from "@/stores";
import { setLanguage } from "@/stores/reducers/languageReducer";
import { LanguageModel } from "@/types/LanguageModel";
import {
  MenuItem,
  Button,
  Menu,
  SxProps,
  Theme,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {

  sx?: SxProps<Theme>;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ sx }) => {
  const { i18n } = useTranslation();
  const { currentLanguage, availableLanguages } = useRootSelector(
    (state) => state.language
  );
  const dispatch = useRootDispatch();
  const handleChange = (language: LanguageModel) => {
    i18n.changeLanguage(language.value);
    dispatch(setLanguage(language));
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          minWidth: "auto",
          paddingRight: 0.5,
          paddingLeft: 0.5,
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: "#cccccc",
          "&:hover": {
            backgroundColor: "#cccccc",
          },
          ...sx,
        }}
      >
        <img
          src={currentLanguage.image}
          alt={currentLanguage.label}
          style={{ height: 30, width: 30 }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {availableLanguages.map((language) => (
          <MenuItem
            key={language.value}
            onClick={() => {
              handleChange(language);
              handleClose();
            }}
          >
            <img
              src={language.image}
              alt={language.label}
              style={{ marginRight: 8, height: 20, width: 20 }}
            />
            {language.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
