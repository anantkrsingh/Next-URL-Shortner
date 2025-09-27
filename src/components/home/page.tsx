"use client"
import React from 'react'
import SubSelectToggle from '../sub-select-toggle';

function HomeComponent() {
    const tab = { label: "Home", value: "home" };
    const subTab = { label: "Home", value: "home" };
    const setTab = (tab: { label: string; value: string }) => {
        console.log(tab);
    };
    const setSubTab = (subTab: { label: string; value: string }) => {
        console.log(subTab);
    };

    return (
        <div>
            <SubSelectToggle tabs={[tab, tab]} subTabs={[subTab, subTab]} tab={tab} setTab={setTab} subTab={subTab} setSubTab={setSubTab} />
            <h1>HomeComponent</h1>
        </div>
    )
}

export default HomeComponent