const Form = () => {
    return (
        <form onSubmit={() => console.log("Tähän tulee submitin tapahtumankasittelija")}>
            <input type={"text"}/>
            <button>Find countries</button>
        </form>
    )
}

export default Form