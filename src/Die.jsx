function Die(props){
    const styles = {
        backgroundColor: props.clicked ? "#59E391" : "white"
    };

    return (
        <button style={styles} onClick={props.clickfn}>{props.value}</button>
    )
}

export default Die;