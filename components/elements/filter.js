import Link from 'next/link';
import Switch from "./switcher";


const Filter = () => {
    const data = [
        [
            {
                "value": "",
                "data": "sub-categories"
            },
            {
                "value": "1",
                "data": "data 1"
            },
            {
                "value": "2",
                "data": "data 2"
            },
            {
                "value": "3",
                "data": "data 3"
            },
        ],
        [
            {
                "value": "",
                "data": "location"
            },
            {
                "value": "1",
                "data": "data 1"
            },
            {
                "value": "2",
                "data": "data 2"
            },
            {
                "value": "3",
                "data": "data 3"
            },
        ],
        [
            {
                "value": "",
                "data": "reviews"
            },
            {
                "value": "1",
                "data": "data 1"
            },
            {
                "value": "2",
                "data": "data 2"
            },
            {
                "value": "3",
                "data": "data 3"
            },
        ],
        [
            {
                "value": "",
                "data": "price range"
            },
            {
                "value": "1",
                "data": "data 1"
            },
            {
                "value": "2",
                "data": "data 2"
            },
            {
                "value": "3",
                "data": "data 3"
            },
        ],
        [
            {
                "value": "",
                "data": "gender"
            },
            {
                "value": "1",
                "data": "data 1"
            },
            {
                "value": "2",
                "data": "data 2"
            },
            {
                "value": "3",
                "data": "data 3"
            },
        ],

    ]
    return (
        <div className="flex justify-between items-center pb-6">
            <div className="flex gap-6 items-end">
                {data.map((selectOptions, index) => (
                    <select
                        key={index}
                        className="shadow-sm border bg-DS_white border-[#E6E6E6] rounded-md py-2 px-3 focus:outline-none focus:ring-primary focus:ring-width-2 text-DS_black opacity-50"
                        required
                    >
                        {selectOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.data}</option>
                        ))}
                    </select>
                ))}
            </div>
            <div className="flex items-center justify-end gap-2">
                <Switch defaultValue={() => { }} onSwitchChange={() => { }} />
                <span className="opacity-70 mr-6">instant project</span>
                <Switch defaultValue={() => { }} onSwitchChange={() => { }} />
                <span className="opacity-70">price is inclusive</span>
            </div>
            
        </div>
    );
}
export default Filter;
