"use client";
import React, { useState } from "react";
import SubSelectToggle from "../sub-select-toggle";
import { MenuItem } from "../sub-select-toggle";
function HomeComponent() {
  // Define the main tabs
  const mainTabs =  [
    { label: "Home", value: "home" } as MenuItem  ,
    { label: "About", value: "about" } as MenuItem  
  ];

  // Define the sub tabs for premium
  const subTabs = [
    { label: "Contribute", value: "contribute" } as MenuItem,
    { label: "Subscribe", value: "subscribe" } as MenuItem
  ];

  // State management for main tab
  const [currentTab, setCurrentTab] = useState(mainTabs[0]);
  
  // State management for sub tab
  const [currentSubTab, setCurrentSubTab] = useState(subTabs[0]);

  const handleTabChange = (tab: MenuItem) => {
    setCurrentTab(tab);
    console.log("Main tab changed:", tab);
  };

  const handleSubTabChange = (subTab: MenuItem) => {
    setCurrentSubTab(subTab);
    console.log("Sub tab changed:", subTab);
  };

  return (
    <div>
      <SubSelectToggle
        tabs={mainTabs as [MenuItem, MenuItem]}
        subTabs={subTabs as [MenuItem, MenuItem]}
        tab={currentTab}
        setTab={handleTabChange}
        subTab={currentSubTab}
        setSubTab={handleSubTabChange}
      />
    </div>
  );
}

export default HomeComponent;
