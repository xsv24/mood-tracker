import React, { FunctionComponent } from 'react';
import { Link } from '@reach/router';
import { classes } from '../../utils';
import Row from '../Row';
import './button.scss';


type ButtonProps = {
    type?: "button" | "submit" | "reset" | undefined,
    color?: "primary" | "secondary" | "danger" | "warn",
    style?: object,
    className?: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    children: React.ReactNode,
    disabled?: boolean
};

export const Button: FunctionComponent<ButtonProps> = ({
    type = 'button',
    color = 'primary',
    className,
    style,
    onClick,
    children,
    ...props
}) => (
    <button 
        type={type} 
        style={style} 
        className={classes(className, color)} onClick={onClick}
        {...props}
    >
        {children}
    </button>
);

interface ButtonImgProps extends ButtonProps {
    img: string,
    alt?: string
};

export const ButtonImg: FunctionComponent<ButtonImgProps> = ({
    img,
    alt,
    children,
    ...props
}) => (
    <Button {...props}> 
        <Row justify='flex-start'>
            <img width="24" height="24" src={img} alt={alt} />
            <span style={{  paddingLeft: 5, paddingRight: 5 }}> 
                {children}
            </span>
        </Row>
    </Button>
);

interface RouteButtonProps extends ButtonProps {
    route: string,
    Tag: any,
    img?: string
}

export const RouteButton: FunctionComponent<RouteButtonProps> = ({
    route,
    Tag,
    children,
    ...props
}) => (
    <Link to={route}>
        <Tag {...props}>
            {children}
        </Tag>
    </Link>
);

export default Button;