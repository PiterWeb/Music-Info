function ActionButton(props) {

    const { action, children, variant } = props

    return (
        <button className={"btn btn-"+ variant} onClick={action}>
            {children}
        </button>
    )
}

export default ActionButton;