const ClickableRegion = ({ SVG, id, width, onClick, style }) => {
    const handleOnClick = (event) => {
        if (event.target.tagName === 'rect') {
            onClick(event);
        }
    };

    return (
        <svg
            id={id}
            width={width}
            onClick={handleOnClick}
            style={style}
        >
            <SVG />
        </svg>
    )
}

export default ClickableRegion