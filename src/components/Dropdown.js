function Dropdown({ title, arr, action}) {
    return (
        <div className="flex">
            <h3 className="p2 m2">{title}</h3>
            <select
                className='btn p2 m2'
                onChange={e => action(e.target.value)}
            >
                {arr.map(el => (
                    <option key={el} value={el.toLowerCase()}>
                        {el}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;
