import { useState } from "react";

export default function Player({ isActive, name, symbol, onNameChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputName, setInputName] = useState(name);

    function handleEditClick() {
        setIsEditing(isEditing => !isEditing);

        if (isEditing) {
            onNameChange(symbol, inputName);
        }
    }

    function handleOnChangeName(e) {
        setInputName(e.target.value);
    }

    return <li className={isActive}>
        <span className="player">
            {isEditing === false ?
                <span className="player-name">{inputName}</span> :
                <input
                    type="text"
                    value={inputName}
                    required
                    onChange={(e) => handleOnChangeName(e)}
                />}
            <span className="player-symbol">{symbol}</span>
        </span>
        {
            <button onClick={handleEditClick}>
                {isEditing ? "Save" : "Edit"}
            </button>}
    </li>;
}