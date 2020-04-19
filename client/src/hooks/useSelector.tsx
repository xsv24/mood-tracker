import { useReducer } from 'react';


type Action = {
    type: string,
    payload: any
};

type SelectorActions = {
    toggle: (index: number) => void,
    select: (index: number) => void,
    unSelect: (index: number) => void,
    selected: any[]
};

type SelectorReturn = [
    any[],
    SelectorActions
];

function reducer(state: any = {
    options: [],
    selected: {}
}, action: Action) {
    switch(action.type) {
        case 'SELECT': {
            const options = [ ...state.options ];
            
            const selected = { 
                ...state.selected,
                [action.payload]: options[action.payload]
            };
        
            options.splice(action.payload, 1, {
                ...options[action.payload],
                selected: true
            });

            return {
                selected,
                options
            };
        } 
        case 'UN_SELECT': { 
            const options = [ ...state.options ];
            const selected = { ...state.selected };
            
            delete selected[action.payload];

            options.splice(action.payload, 1, {
                ...options[action.payload],
                selected: false
            });

            return {
                selected,
                options
            };
        }

        default:
            return state;
    }
}

export const select = (payload: number) : Action => ({
    type: 'SELECT', 
    payload
});

export const unSelect = (payload: number) : Action => ({
    type: 'UN_SELECT', 
    payload 
});

const useSelector = (
    options: any[] = [], 
    defaultSelected: any[] = [] 
) : SelectorReturn => {
    
    const [{ options: opts, selected }, dispatch] = useReducer(reducer, {  
        options: options,
        selected: defaultSelected
    });

    function selectItem(index: number) : void {
        dispatch(select(index));
    }

    function unSelectItem(index: number) : void {
        dispatch(unSelect(index));
    }
    
    function toggleItem(index: number) : void {
        if(index in selected) {
            dispatch(unSelect(index));
        } else {
            dispatch(select(index));
        }
    }

    return [
        opts,
        {
            toggle: toggleItem,
            select: selectItem,
            unSelect: unSelectItem,
            selected: Object.values(selected)
        }
    ];
};


export default useSelector;