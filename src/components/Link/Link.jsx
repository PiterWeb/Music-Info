import { Link } from "react-router-dom"
import { useState } from "react"
function StyledLink (props) {

    const {to , children , variant} = props

    const linkStyle = {
        color: '#1e2024',
        textDecoration: 'none',
        fontSize: '1.1rem',
        margin:'0.5rem',
        transition: '1.2s',
    }

    const linkStyleHover = {
        color: '#6563ff',
        textDecoration: 'underline',
        fontSize: '1.1rem',
        margin:'0.5rem',
        transition: '0.5s'
    }

    const [hover, setHover] = useState(false)

    const onMouseEnter = () => {
        setHover(true)
    }
    
    const onMouseLeave = () => {
        setHover(false)
    }

    if (variant === "white") {
    
        const linkStyle = {
            color: '#1e2024',
            textDecoration: 'none',
            fontSize: '1.1rem',
            margin:'0.5rem',
            transition: '0.5s',
        }
    
        const linkStyleHover = {
            color: '#f8f8f8',
            textDecoration: 'underline',
            fontSize: '1.1rem',
            margin:'0.5rem',
            transition: '0.5s'
        }

        return (
            <Link to={to} style={hover ? linkStyleHover : linkStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{children}</Link>
        )
    

    }

    return (
        <Link style={hover ? linkStyleHover : linkStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} to={to}>{children}</Link>
    )

}

export default StyledLink;
