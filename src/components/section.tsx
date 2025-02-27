import { Button, Typography } from "@mui/material";
import { IC_RIGHT } from "assets/icon";
import React, { PropsWithChildren } from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { forTitle, selectSubject } from "state";
import { Box, Text } from "zmp-ui";
import { BoxProps } from "zmp-ui/box";

export interface SectionProps extends BoxProps {
  title: string;
  padding?: "all" | "none" | "title-only";
  url?:string;
  select?:string;
}

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  children,
  title,
  padding = "all",
  url="",
  select="-1",
  ...props
}) => {
  const keyTitle = useSetRecoilState(forTitle);
  const keySubject = useSetRecoilState(selectSubject);
  const setTitle = async () =>{
    await keyTitle(title);
  };  
  const setSubject = async () =>{
    await keySubject(select);
  };
  const navigate = useNavigate();
  return (
    <Box
      className={`main-template ${padding === "all" ? "p-4 space-y-4" : ""} ${
        padding === "title-only" ? "py-4 space-y-4" : ""
      }`}
      {...props}
    >
      <Text.Title className={`${padding === "title-only" ? "px-4" : ""}`}>
        <Box className="flex flex-row justify-between">
          <Typography
          sx={{
            color: 'var(--text-color-header)',
            display:'flex',
            justifyContent:'center',
            fontFamily:'Averta_Semi',
            fontSize:'20px',
            textAlign:'center',
            // lineHeight:'24px'
          }}>
            {title} 
          </Typography>
          <Button sx={{
            color: 'var(--text-color-header)',
            fontFamily:"Averta_Semi",
            fontSize:'16px',
            display:"flex",
            textWrap:'nowrap',
            zIndex:'3',
            textAlign:'left',
            lineHeight:'19px'
          }}
          onClick={()=> {
            setTitle();
            setSubject();
            navigate(url);
          }}
          >
            Tất cả <img loading="lazy" src={IC_RIGHT} width={"20px"} height={"20px"}/>
          </Button>
        </Box>
      </Text.Title>
      {children}
    </Box>
  );
};
