import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Cadastro from './pages/Cadastro';
import Home from './pages/Home';


const Routes = createAppContainer(
    createSwitchNavigator({
        Cadastro,
        Home,
    })

);

export default Routes;