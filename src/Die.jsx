function Die(props) {
    const styles = {
        backgroundColor: props.clicked ? "#59E391" : "white",
        width: '50px',
        height: '50px',
        borderRadius: '5px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        justifyItems: 'center',
        alignItems: 'center',
        fontSize: '10px',
        // border: '1px solid black',
        gap: '1px',
    };
    
    const transparent = 'rgba(255,255,255,0.0)' // Can you belive it! this makes the dot Transparent

    // Function to generate the dots for each dice value with its color
    const renderDots = (value) => {
        const dotPatterns = {
            1: [transparent,transparent,transparent,transparent,'black',transparent,transparent,transparent,transparent],
            2: ['black',transparent,transparent,transparent,transparent,transparent,transparent,transparent,'black'],
            3: ['black',transparent,transparent,transparent,'black',transparent,transparent,transparent,'black'],
            4: ['black',transparent,'black',transparent,transparent,transparent,'black',transparent,'black'],
            5: ['black',transparent,'black',transparent,'black',transparent,'black',transparent,'black'],
            6: ['black',transparent,'black','black',transparent,'black','black',transparent,'black']
        };
        
        return dotPatterns[value] || [];
    };

    return (
        <button style={styles} onClick={props.clickfn}>
            {renderDots(props.value).map((dot, index) => (
                <div
                    key={index}
                    style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: dot,
                        borderRadius: '70%',
                        // marginTop: '2x',
                        marginBottom: '0px',  // Adjust for spacing
                        // marginTop: index === 0 ? 0 : '0px',  // Adjust for positioning
                    }}
                />
            ))}
        </button>
    );
}

export default Die;