import React, { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ClickableRegion from "./ClickableRegion";
import ShopInterior from '../assets/ShopInterior.png'
import HigsbyOutline from '../assets/HigsbyOutline'
import ChipTrader from '../assets/ChipTrader'
import { useNavigate } from "react-router-dom";
import SuperGif from 'libgif'

const Map = () => {
    const navigate = useNavigate();
    const [gifVisible, setGifVisible] = useState(false)
    const gifRef = useRef(null)

    useEffect(() => {
        if (gifVisible && gifRef.current) {
            let gif = new SuperGif({ 
                gif: gifRef.current,
                auto_play: 0,
                progressbar_height: '100%'
            });
            gif.load(() => {
                let speed = "fast"
                let final = Math.floor(Math.random() * 10) + 50
                const moveToRandomFrame = (count = 0) => {
                    if (count === final) return; 
                    if (count === 30) speed = "medium"
                    if (count === 45) speed = "slow"
                    if (count === final - 2) speed = "slowest"
    
                    const totalFrames = gif.get_length(); 
                    const randomFrame = Math.floor(Math.random() * totalFrames); 
                    gif.move_to(randomFrame);
                    setTimeout(() => moveToRandomFrame(count + 1), speed === "fast" ? 100 : speed === "medium" ? 200 : speed === "slow" ? 500 : 1000);
                };
    
                moveToRandomFrame();
            });
        }
    }, [gifVisible]);

    const spinChip = () => {setGifVisible(true)}

    return (
        <div className="shop-container">
            <TransformWrapper
                initialScale={1}
                centerOnInit={true}
            >
                {({ centerView, zoomToElement }) => (
                    <React.Fragment>
                        <div className="tools">
                            <button onClick={() => centerView(1)}>Reset</button>
                            <button onClick={() => zoomToElement("Higsby", 3)}>Higsby</button>
                            <button onClick={() => zoomToElement("ChipTrader", 3)}>Chip Trader</button>
                        </div>
                        <TransformComponent
                            wrapperStyle={{ maxWidth: "100%", maxHeight: "100%" }}
                        >
                            <ClickableRegion
                                id="Higsby"
                                SVG={HigsbyOutline}
                                width='22px'
                                onClick={() => navigate('/character/Higsby')}
                                style={{
                                    position: 'absolute',
                                    left: '263px',
                                    top: '88px'
                                }}
                            />
                            <ClickableRegion
                                id="ChipTrader"
                                SVG={ChipTrader}
                                width='20px'
                                onClick={() => spinChip()}
                                style={{
                                    position: 'absolute',
                                    left: '195px',
                                    top: '201px'
                                }}
                            />
                            <img
                                src={ShopInterior}
                                alt="Higsby's Shop"
                                style={{ width: '386px' }}
                            />
                        </TransformComponent>
                    </React.Fragment>
                )}
            </TransformWrapper>
            {gifVisible && (
                <img
                    className="chip-trader-roulette"
                    ref={gifRef}
                    id="chipGif"
                    src="/assets/BattleChips/ChipTrader/chipTraderSpin.gif"
                    alt="Spinning Chip"
                />
            )}
        </div>
    )
}

export default Map
