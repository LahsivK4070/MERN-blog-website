import React from 'react'
import Settings from '../settings/Settings';
import Sidebar from "../sidebar/Sidebar";
import "./settingsPage.css";

const SettingsPage = () => {
  return (
    <div className='settings-page'>
          <Settings />
          <Sidebar />
    </div>
  )
}

export default SettingsPage
