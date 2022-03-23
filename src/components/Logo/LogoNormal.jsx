import './LogoNormal.css'
import Info from '../../images/info-circle.svg'

function Logo () {
    
        return (
            <div className="logoNormal">
                <h1>Music</h1><img className="iconNormal" src={Info} alt="info" />
            </div>
        )
    
}

export default Logo;