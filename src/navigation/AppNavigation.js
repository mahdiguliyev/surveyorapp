import React from 'react';
import {useAuthentication} from '../common/context/LoginProvider';
import SurveyorTabs from './tabs/SurveyorTabs';
import ManagerTabs from './tabs/ManagerTabs';
import ViewerTabs from './tabs/ViewerTabs';

const AppNavigation = () => {
  const {user} = useAuthentication(); // Make sure you store `user.role`

  switch (user?.role) {
    case 'surveyor':
      return <SurveyorTabs />;
    case 'manager':
      return <ManagerTabs />;
    case 'viewer':
      return <ViewerTabs />;
    default:
      return null; // or fallback to login
  }
};

export default AppNavigation;
