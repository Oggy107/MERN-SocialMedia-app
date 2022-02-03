import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const MenuCustom = () => {
    const [state, setState] = React.useState({activeItem: 'home'});
    const navigate = useNavigate();

    const handleItemClick = (e, {name}) => {
        setState({activeItem: name});
        navigate(`/${name}`);
    }

    return (
        <Menu pointing secondary>
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
