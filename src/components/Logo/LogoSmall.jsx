import './LogoSmall.css'
import Info from '../../images/info-circle.svg'

function Logo () {

    return (
        <div className="logoSmall">
            <h1>M</h1><img className="iconSmall" src={Info} alt="info" />
         </div>
    )

}

export default Logo;