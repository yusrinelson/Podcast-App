import React from "react";

export default function Modal(item) {
    const [fullDescription, setFullDescription] = React.useState(false)

    const descriptionText = item.text.length > item.limit ? `${item.text.slice(0, item.limit)}...` : item.text;

    function handleDescription() {
        setFullDescription(prevState => !prevState)
    }
    return (
        <div className="popup">
            <div className="popup-content">
                <div className="overlay-preview">
                   <h5 className="seasons">SEASONS: {item.seasons}</h5>
                   <img className="information-button" onClick={item.showSeasons} src="/src/images/information-button.png" width="40px"/>
                   <img className="play-button" src="/src/images/play.png" width="80px"/>
                   
                    <img className="overlay-blur" src={item.image} width="150px" />
                    <img className="overlay-image" src={item.image} width="150px" />
                    
                </div>
                    <h3>{item.title}</h3>
              
                    <p>{fullDescription ? item.text : descriptionText}</p>

                    <p className="updated-date">updated: {item.updated}</p>

                {!item.fullDescription && (<button onClick={handleDescription}>full description</button>)}
                <br />
                <button onClick={item.onClose}>X</button>
 
            </div>
        </div>
    );
}
