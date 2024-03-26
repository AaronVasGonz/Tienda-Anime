
import React from "react";

const PasswordStrengthMeter = ({ password }) => {

    const calculatePasswordStrength = () => {
        let strength = 0
        if (password.length > 5) strength += 1;
        if (password.match(/[a-z]+/)) strength += 1;
        if (password.match(/[A-Z]+/)) strength += 1;
        if (password.match(/[0-9]+/)) strength += 1;
        if (password.match(/[^a-zA-Z0-9]+/)) strength += 1;
        return strength

    }

    function getStrengthBarColor(strength){
        switch(strength){
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return 'lightblue';
            case 5: return 'lightgreen';
           default: return 'grey'
        }
    }

    const strength = calculatePasswordStrength()
    const strengthBarColor = getStrengthBarColor(strength)
    const strengthBarStyle  = {
        width: `${(strength/5) *100}%`,
        backgroundColor : strengthBarColor,
        filter: strength > 0 ? `drop-shadow(0 0 5px ${strengthBarColor})`: 'none'
    }

    return (
        <div className="passwordStrengthMeter">
            <div className="passwordStrengthContainer" >
                <div className="strengthBar" style={strengthBarStyle}></div>
            </div>
        </div>
    );
}

export default PasswordStrengthMeter;