import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Signup from './pages/SignUp';
import Endereco from './pages/Endereco';
import Academico from './pages/Academicos'; 



const Routes = createAppContainer(
    createSwitchNavigator({
        Endereco,
        Academico,
        Home,
        Signup,
        Cadastro,
    })

);

export default Routes;