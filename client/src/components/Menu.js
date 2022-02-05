import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/user';

const MenuCustom = () => {
    const { state: userState, logout } = React.useContext(UserContext);
    const navigate = useNavigate();      

    let path = window.location.pathname;
    path = path === '/' ? 'home' : path.slice(1);
    path = path.includes('/') ? path.slice(0, path.indexOf('/')) : path;
    const [state, setState] = React.useState({activeItem: path});

    const handleItemClick = (e, {name}) => {
        setState({activeItem: name});
        navigate(`/${name}`);
    }

    React.useEffect(() => {
        setState({activeItem: path})
    }, [path])

    return (
        <Menu pointing secondary size='huge' color='teal'>
            <Menu.Item
                name='home'
                active={state.activeItem === 'home'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='messages'
                active={state.activeItem === 'messages'}
                onClick={handleItemClick}
            />
            <Menu.Menu position='right'>
                {
                    !userState.user ? (
                        <React.Fragment>
                            <Menu.Item
                                name='login'
                                active={state.activeItem === 'login'}
                                onClick={handleItemClick}
                            />
                            <Menu.Item
                                name='register'
                                active={state.activeItem === 'register'}
                                onClick={handleItemClick}
                            />
                        </React.Fragment>
                    ) :
                    (
                        <div>
                            <Menu.Item
                                name='logout'
                                active={state.activeItem === 'logout'}
                                onClick={logout}
                            />
                        </div>
                    )
                }
            </Menu.Menu>
        </Menu>
    )
};

export default MenuCustom;
