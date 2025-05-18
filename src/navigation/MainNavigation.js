import AuthNavigation from './AuthNavigation';
import {useAuthentication} from '../common/context/LoginProvider';
import AppNavigation from './AppNavigation';

const MainNavigator = () => {
  const {isAuthenticated} = useAuthentication();

  return isAuthenticated ? <AppNavigation /> : <AuthNavigation />;
};

export default MainNavigator;
