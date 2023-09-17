import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const useDebounce = (children, delay) => {
    const [value, setValue] = useState(children);
    useEffect(() => {
        const debounce = setTimeout(() => {
            setValue(children);
        }, delay);

        return () => clearTimeout(debounce);
    }, [children, delay]);
    return value;
};

useDebounce.propTypes = {
    delay: PropTypes.number.isRequired,
};

export default useDebounce;
