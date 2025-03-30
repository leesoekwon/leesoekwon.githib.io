"use client";

import React from "react";
import Link from "next/link";

interface IndexBlockProps {
  title: string;  
  number: string; 
  href: string; 
}
export function IndexBlock({ title, number, href }: IndexBlockProps) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        backgroundColor: "#F3F3F3",
        border: "1px solid #EFEDED",
        borderRadius: "1.5px",
        padding:"6px 12px 0 13px", // 순서: top, right, bottom, left
        flexDirection: "row",         
        alignItems: "flex-start",    
        justifyContent: "space-between", 
        height: "92px",
        width: "100%",
      }}
    >
      <span style={{ fontSize: "19px", letterSpacing:"0.04rem",fontWeight: "500" }}>{title}</span>
      <span className="text-right" style={{ fontSize: "14px", letterSpacing: "0",fontWeight: "500",color: "#CECECE", marginTop: "2.5px",   fontVariant: "stylistic-alternates(3)"}}>{number}</span>
    </Link>
  );
}
