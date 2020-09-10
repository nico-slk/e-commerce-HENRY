import React from 'react';
const {useState} = React;

const Checkbox = ({ initialState, category, onChange }) => {

    const [checked, setChecked] = useState(initialState);

    const onClick=(checked)=>{
        setChecked(checked);
        onChange(category, checked);
    }

    return (
        <div className="form-group">
            <input
                type="checkbox"
                className="form-check-input"
                onClick={e => onClick(e.target.checked)}
                defaultChecked={checked}
            />
            <label className="form-check-label mr-3" >
                {category.name}
            </label>
        </div>
    )
};

export default Checkbox
