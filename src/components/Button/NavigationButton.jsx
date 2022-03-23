import { useHistory } from 'react-router-dom'

function NavigationButton(props) {

    let history = useHistory()

    const { to, text, variant } = props;

    const handleClick = () => {
        history.push(to)
    }

    return (
        <Button variant={variant} action={handleClick} text={text}/>

    )
}

export default NavigationButton;