import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ClickableRegion from "./ClickableRegion";
import acdcTownMap from '../assets/ACDCTownMap.png';
import LansHouse from '../assets/LansHouse.jsx';
import YaisHouse from '../assets/YaisHouse.jsx'
import MaylsHouse from '../assets/MaylsHouse.jsx'
import DexsHouse from '../assets/DexsHouse.jsx'
import HigsbysShop from '../assets/HigsbysShop.jsx'

const Map = () => {
    return (
        <TransformWrapper
            initialScale={1}
            centerOnInit={true}
        >
            {({ centerView, zoomToElement }) => (
                <React.Fragment>
                    <div className="tools">
                        <button onClick={() => centerView(1)}>Reset</button>
                        <button onClick={() => zoomToElement("Lan", 3)}>Lan&apos;s House</button>
                        <button onClick={() => zoomToElement("Mayl", 3)}>Mayl&apos;s House</button>
                        <button onClick={() => zoomToElement("Yai", 3)}>Yai&apos;s House</button>
                        <button onClick={() => zoomToElement("Dex", 3)}>Dex&apos;s House</button>
                        <button onClick={() => zoomToElement("Higsby", 3)}>Higsby&apos;s Shop</button>
                    </div>
                    <TransformComponent
                        wrapperStyle={{ maxWidth: "100%", maxHeight: "100%" }}
                    >
                        <ClickableRegion
                            id="Yai"
                            SVG={YaisHouse}
                            width='163px'
                            onClick={() => console.log("CLICK")}
                            style={{
                                position: 'absolute',
                                left: '536px',
                                top: '107px',
                            }}
                        />
                        <ClickableRegion
                            id="Lan"
                            SVG={LansHouse}
                            width='120px'
                            onClick={() => console.log("CLICK")}
                            style={{
                                position: 'absolute',
                                left: '392px',
                                top: '295px',
                            }}
                        />
                        <ClickableRegion
                            id="Mayl"
                            SVG={MaylsHouse}
                            width='133px'
                            onClick={() => console.log("CLICK")}
                            style={{
                                position: 'absolute',
                                left: '253px',
                                top: '357px',
                            }}
                        />
                        <ClickableRegion
                            id="Dex"
                            SVG={DexsHouse}
                            width='139px'
                            onClick={() => console.log("CLICK")}
                            style={{
                                position: 'absolute',
                                left: '722px',
                                top: '469px',
                            }}
                        />
                        <ClickableRegion
                            id="Higsby"
                            SVG={HigsbysShop}
                            width='108px'
                            onClick={() => console.log("CLICK")}
                            style={{
                                position: 'absolute',
                                left: '732px',
                                top: '146px'
                            }}
                        />
                        <img
                            src={acdcTownMap}
                            alt="ACDC Town"
                            style={{ width: '1480px' }}
                        />
                    </TransformComponent>
                </React.Fragment>
            )}
        </TransformWrapper>
    )
}

export default Map
