import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ClickableRegion from "./ClickableRegion";
import ShopInterior from '../../public/assets/ShopInterior.png';
import HigsbyOutline from '../assets/HigsbyOutline'
import ChipTrader from '../assets/ChipTrader'
import { useNavigate } from "react-router-dom";

const Map = () => {
    const navigate = useNavigate();

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
                                onClick={() => navigate('/folders/chip-trader')}
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
        </div>
    )
}

export default Map
