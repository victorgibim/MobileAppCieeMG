import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Signup from './pages/SignUp';


const Routes = createAppContainer(
    createSwitchNavigator({
        Signup,
        Home,
        Cadastro,
    })

);

export default Routes;