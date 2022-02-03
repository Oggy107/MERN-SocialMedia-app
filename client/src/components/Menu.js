import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const MenuCustom = () => {
    const path = window.location.pathname === '/' ? 'home' : window.location.pathname.slice(1);
    const [state, setState] = React.useState({activeItem: path});
    const navigate = useNavigate();

    const handleItemClick = (e, {name}) => {
        setState({activeItem: name});
        navigate(`/${name}`);
    }

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
            </Menu.Menu>
        </Menu>
    )
};

export default MenuCustom;
