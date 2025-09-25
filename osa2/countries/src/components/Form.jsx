const Form = ({onChange}) => {
    return (
        <form>
            find countries:
            <input type={"text"} onChange={onChange}/>
        </form>
    )
}

export default Form