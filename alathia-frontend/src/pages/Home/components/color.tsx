

const colors = {
    blue10: "#106EBE",
    blue20: '#2C3E50',
    blue30: "#5DADE2",
    red10: '#C0392B',
    red20: "#DA1E28",
    gold10: "#F4D03F", // Updated to avoid duplicate key
    gold20: '#D35400',
    green10: '#27AE60',
    green15: "#107C10",
    yellow: "#7A6958",
    black10: "#231F20",
    black20: "#1C1C1C",
    black30: "#BDC3C7",
    gray10: '#7F8C8D',
    purple10: '#8E44AD'
};

const ColorBoxes = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {Object.entries(colors).map(([colorName, colorValue]) => (
                <div
                    key={colorName}
                    style={{
                        backgroundColor: colorValue,
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '14px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {colorName}
                </div>
            ))}
        </div>
    );
};

export default ColorBoxes;
