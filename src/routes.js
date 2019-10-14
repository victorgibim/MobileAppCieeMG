import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Endereco from './pages/Endereco';

const Routes = createAppContainer(
    createSwitchNavigator({
        Endereco,
        Signup,
        Home,
        Cadastro,
    })

);

export default Routes;