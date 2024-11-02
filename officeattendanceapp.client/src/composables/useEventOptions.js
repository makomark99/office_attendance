
export const useEventOptions = () => {
    const eventOptions = [
        { name: 'Office day', code: 'O', bgColor: '#ffffff', textColor: 'black' },
        { name: 'Home office', code: 'HO', bgColor: '#203765', textColor: 'white' },
        { name: 'Day off (employer)', code: 'D1', bgColor: 'green', textColor: 'black' },
        { name: 'Day off (employee)', code: 'D2', bgColor: '#ff0000', textColor: 'white' },
        { name: 'Day off (prev. year)', code: 'D0', bgColor: '#fea8b4', textColor: 'black' },
        { name: 'Paid leave', code: 'PL', bgColor: '#4472c4', textColor: 'black' },
        { name: 'Out of office', code: 'OO', bgColor: '#9bc2e6', textColor: 'black' }
    ];

    const eventOptions2 = [
        { name: 'Mission', code: 'M', bgColor: '#00df00', textColor: 'black' },
        { name: 'Mission (domestic)', code: 'MD', bgColor: '#cab9f2', textColor: 'black' },
        { name: 'Training', code: 'T', bgColor: '#788aa3', textColor: 'black' },
        { name: 'Half day training', code: 'T4', bgColor: '#8497b0', textColor: 'black' },
        { name: 'Spread-over ', code: 'SO', bgColor: '#ffff00', textColor: 'black' },
        { name: 'Flexi terminal', code: 'FT', bgColor: 'brown', textColor: 'white' },
        { name: 'Flexi home office', code: 'FH', bgColor: 'orange', textColor: 'black' }
    ];

    const thirdLevelOptions = [
        { name: 'RC-update', code: 'RC', bgColor: '#5e5e5e', textColor: 'white' },
        { name: 'Installation', code: 'I', bgColor: '#f8cbad', textColor: 'black' }   
    ];

    const standbyOptions = [
        { name: 'Standby', code: 'S', bgColor: '#ff00ff', textColor: 'white' }
    ]

    const mergedOptions = [
        ...eventOptions,
        ...eventOptions2,
        ...thirdLevelOptions,
        ...standbyOptions
    ];

    return {
        eventOptions,
        eventOptions2,
        thirdLevelOptions,
        standbyOptions,
        mergedOptions
    };

}